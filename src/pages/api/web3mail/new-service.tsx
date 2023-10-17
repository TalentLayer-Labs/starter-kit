import mongoose from 'mongoose';
import { EmailType, IService, IUserDetails, NotificationApiUri } from '../../../types';
import { NextApiRequest, NextApiResponse } from 'next';
import { sendMailToAddresses } from '../../../scripts/iexec/sendMailToAddresses';
import { getWeb3mailUsersForNewServices } from '../../../queries/users';
import { calculateCronData } from '../../../modules/Web3mail/utils/cron';
import {
  hasEmailBeenSent,
  persistCronProbe,
  persistEmail,
} from '../../../modules/Web3mail/utils/database';
import { getNewServicesForPlatform } from '../../../queries/services';
import { generateWeb3mailProviders, prepareCronApi } from '../utils/web3mail';

export const maxDuration = 300;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const chainId = process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID as string;
  const platformId = process.env.NEXT_PUBLIC_PLATFORM_ID as string;
  const mongoUri = process.env.NEXT_MONGO_URI as string;
  const cronSecurityKey = req.headers.authorization as string;
  const privateKey = process.env.NEXT_PUBLIC_WEB3MAIL_PLATFORM_PRIVATE_KEY as string;
  const isWeb3mailActive = process.env.NEXT_PUBLIC_ACTIVE_WEB3MAIL as string;

  const RETRY_FACTOR = 5;
  let sentEmails = 0,
    nonSentEmails = 0;

  prepareCronApi(isWeb3mailActive, chainId, platformId, mongoUri, cronSecurityKey, privateKey, res);

  const { dataProtector, web3mail } = generateWeb3mailProviders(privateKey);

  await mongoose.disconnect();
  await mongoose.connect(mongoUri as string);

  // Check whether the user provided a timestamp or if it will come from the cron config
  const { sinceTimestamp, cronDuration } = calculateCronData(
    req,
    RETRY_FACTOR,
    NotificationApiUri.NewService,
  );

  try {
    // Fetch all contacts who protected their email and granted access to the platform
    const allContacts = await web3mail.fetchMyContacts();

    if (!allContacts || allContacts.length === 0) {
      return res.status(200).json(`No contacts granted access to their email`);
    }

    const allContactsAddresses = allContacts.map(contact => contact.owner);

    // Get all users that opted for the feature
    const response = await getWeb3mailUsersForNewServices(
      Number(chainId),
      allContactsAddresses,
      'activeOnNewService',
    );

    let validUsers: IUserDetails[] = [];

    if (response?.data?.data?.userDescriptions && response.data.data.userDescriptions.length > 0) {
      validUsers = response.data.data.userDescriptions;
      // Only select the latest version of each user metaData
      validUsers = validUsers.filter(contact => contact.user?.description?.id === contact.id);
    } else {
      return res.status(200).json(`No User opted for this feature`);
    }

    // Check if new services are available & get their keywords
    const serviceResponse = await getNewServicesForPlatform(
      Number(chainId),
      platformId,
      sinceTimestamp,
    );

    if (!serviceResponse?.data?.data?.services) {
      return res.status(200).json(`No new services available`);
    }

    const services: IService[] = serviceResponse.data.data.services;

    // For each contact, check if an email was already sent for each new service. If not, check if skills match
    for (const contact of validUsers) {
      console.log(
        '*************************************Contact*************************************',
        contact.user.address,
      );
      for (const service of services) {
        // Check if a notification email has already been sent for these services
        const emailHasBeenSent = await hasEmailBeenSent(
          `${contact.user.id}-${service.id}`,
          EmailType.NewService,
        );
        if (!emailHasBeenSent) {
          const userSkills = contact.skills_raw?.split(',');
          const serviceSkills = service.description?.keywords_raw?.split(',');
          // Check if the service keywords match the user keywords
          const matchingSkills = userSkills?.filter((skill: string) =>
            serviceSkills?.includes(skill),
          );

          if (matchingSkills && matchingSkills?.length > 0) {
            console.log(
              `The skills ${
                contact.user.handle
              } has which are required by this service are: ${matchingSkills.join(', ')}`,
            );
            try {
              await sendMailToAddresses(
                `
                Hi ${contact.user.handle} !
                
                A new service matching your skills is available on TalentLayer !`,
                `Good news, the following service: "${
                  service.description?.title
                }" was recently posted by ${service.buyer.handle} and you are a good match for it.
                  Here is what is proposed: ${service.description?.about}.
                  
                  The skills you have which are required by this service are: ${matchingSkills.join(
                    ', ',
                  )}.
                  
                  Be the first one to send a proposal !

                  You can find details on this service here: ${
                    service.platform.description?.website
                  }/dashboard/services/${service.id}`,
                [contact.user.address],
                true,
                dataProtector,
                web3mail,
              );
              await persistEmail(`${contact.user.id}-${service.id}`, EmailType.NewService);
              console.log('Notification recorded in Database');
              sentEmails++;
            } catch (e: any) {
              console.error(e.message);
              nonSentEmails++;
            }
          }
        }
      }
    }
  } catch (e: any) {
    console.error(e);
    return res.status(500).json(`Error while sending email - ${e.message}`);
  } finally {
    if (!req.query.sinceTimestamp) {
      // Update cron probe in db
      await persistCronProbe(EmailType.NewService, sentEmails, nonSentEmails, cronDuration);
      console.log(`Cron probe updated in DB`);
    }
    console.log(
      `Web3 Emails sent - ${sentEmails} email successfully sent | ${nonSentEmails} non sent emails`,
    );
  }
  return res
    .status(200)
    .json(
      `Web3 Emails sent - ${sentEmails} email successfully sent | ${nonSentEmails} non sent emails`,
    );
}
