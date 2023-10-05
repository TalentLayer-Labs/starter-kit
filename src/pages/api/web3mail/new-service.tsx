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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const chainId = process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID as string;
  const platformId = process.env.NEXT_PUBLIC_PLATFORM_ID as string;
  const mongoUri = process.env.NEXT_MONGO_URI as string;
  const cronSecurityKey = req.headers.authorization as string;
  const privateKey = process.env.NEXT_PUBLIC_WEB3MAIL_PLATFORM_PRIVATE_KEY as string;

  const RETRY_FACTOR = 5;
  let sentEmails = 0,
    nonSentEmails = 0;

  prepareCronApi(chainId, platformId, mongoUri, cronSecurityKey, privateKey, res);

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
    console.log('allContacts', allContacts);

    if (!allContacts || allContacts.length === 0) {
      return res.status(200).json(`No contacts granted access to their email`);
    }

    const allContactsAddresses = allContacts.map(contact => contact.owner);
    // const allContactsAddresses = [
    //   '0x1ab1655fb5bb0212ec2e5d05628415fc2c1ad9c7',
    //   '0x812c44b6661aa519aa590b7de43d8f1cf5f6d038',
    //   '0x3d0c6a35dcd9aeb46b493cd6cc9ace84583b7ae8',
    // ];

    // Get all users that opted for the feature
    const response = await getWeb3mailUsersForNewServices(
      Number(chainId),
      allContactsAddresses,
      'activeOnNewService',
    );

    let validContacts: IUserDetails[] = [];

    if (response?.data?.data?.userDescriptions && response.data.data.userDescriptions.length > 0) {
      validContacts = response.data.data.userDescriptions;
      // Only select the latest version of each user metaData
      validContacts = validContacts.filter(contact => contact.user?.description?.id === contact.id);
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
    for (const contact of validContacts) {
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
          //TODO remove logs for prod
          console.log('userSkills', userSkills);
          console.log('serviceSkills', serviceSkills);
          console.log('matchingSkills', matchingSkills);
          if (matchingSkills && matchingSkills.length > 0) {
            console.log(
              `The skills ${
                contact.user.handle
              } has which are required by this service are: ${matchingSkills.join(', ')}`,
            );
          }
          if (matchingSkills && matchingSkills?.length > 0) {
            try {
              await sendMailToAddresses(
                `A new service matching your skills is available on TalentLayer !`,
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
    }
  }
  return res
    .status(200)
    .json(
      `Web3 Emails sent - ${sentEmails} email successfully sent | ${nonSentEmails} non sent emails`,
    );
}
