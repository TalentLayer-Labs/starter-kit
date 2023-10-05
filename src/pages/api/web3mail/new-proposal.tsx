import mongoose from 'mongoose';
import { getProposalsFromPlatformServices } from '../../../queries/proposals';
import { EmailType, IProposal, IUserDetails, NotificationApiUri } from '../../../types';
import { NextApiRequest, NextApiResponse } from 'next';
import { sendMailToAddresses } from '../../../scripts/iexec/sendMailToAddresses';
import { getUsersWeb3MailPreference } from '../../../queries/users';
import { calculateCronData } from '../../../modules/Web3mail/utils/cron';
import {
  hasEmailBeenSent,
  persistCronProbe,
  persistEmail,
} from '../../../modules/Web3mail/utils/database';
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

  await mongoose.connect(mongoUri as string);

  // Check whether the user provided a timestamp or if it will come from the cron config
  const { sinceTimestamp, cronDuration } = calculateCronData(
    req,
    RETRY_FACTOR,
    NotificationApiUri.NewProposal,
  );

  try {
    const response = await getProposalsFromPlatformServices(
      Number(chainId),
      platformId,
      sinceTimestamp,
    );

    if (!response?.data?.data?.proposals || response.data.data.proposals.length === 0) {
      return res.status(200).json(`No new proposals available`);
    }

    const proposals: IProposal[] = response.data.data.proposals;
    const nonSentProposalEmails: IProposal[] = [];

    // Check if a notification email has already been sent for these proposals
    if (proposals.length > 0) {
      for (const proposal of proposals) {
        const hasBeenSent = await hasEmailBeenSent(proposal.id, EmailType.NewProposal);
        if (!hasBeenSent) {
          nonSentProposalEmails.push(proposal);
        }
      }
    }

    // If some emails have not been sent yet, send a web3mail & persist in the DB that the email was sent
    if (nonSentProposalEmails.length == 0) {
      return res.status(200).json(`All new proposals notifications already sent`);
    }

    // Filter out users which have not opted for the feature
    const allBuyerAddresses = nonSentProposalEmails.map(proposal => proposal.service.buyer.address);
    const notificationResponse = await getUsersWeb3MailPreference(
      Number(chainId),
      allBuyerAddresses,
      'activeOnNewProposal',
    );

    let validUsers: IUserDetails[] = [];

    if (
      notificationResponse?.data?.data?.userDescriptions &&
      notificationResponse.data.data.userDescriptions.length > 0
    ) {
      validUsers = notificationResponse.data.data.userDescriptions;
      // Only select the latest version of each user metaData
      validUsers = validUsers.filter(
        userDetails => userDetails.user?.description?.id === userDetails.id,
      );
    } else {
      return res.status(200).json(`No User opted for this feature`);
    }

    const validUserAddresses: string[] = validUsers.map(userDetails => userDetails.user.address);

    const proposalEmailsToBeSent = nonSentProposalEmails.filter(proposal => {
      validUserAddresses.includes(proposal.service.buyer.address);
    });

    if (proposalEmailsToBeSent.length === 0) {
      return res
        .status(200)
        .json(
          `New proposals detected, but no concerned users opted for the ${EmailType.NewProposal} feature`,
        );
    }

    const { dataProtector, web3mail } = generateWeb3mailProviders(privateKey);

    for (const proposal of proposalEmailsToBeSent) {
      try {
        // @dev: This function needs to be throwable to avoid persisting the entity in the DB if the email is not sent
        await sendMailToAddresses(
          `You got a new proposal ! - ${proposal.description?.title}`,
          `You just received a new proposal for the service ${proposal.service.id} you posted on TalentLayer !
              ${proposal.seller.handle} can complete your service for the following amount: ${proposal.rateAmount} : ${proposal.rateToken.symbol}.
              Here is what is proposed: ${proposal.description?.about}.
              
              This Proposal can be viewed at: ${proposal.service.platform.description?.website}/dashboard/services/${proposal.service.id}`,
          [proposal.service.buyer.address],
          true,
          dataProtector,
          web3mail,
        );
        await persistEmail(proposal.id, EmailType.NewProposal);
        console.log('Notification recorded in Database');
        sentEmails++;
      } catch (e: any) {
        nonSentEmails++;
        console.error(e.message);
      }
    }
  } catch (e: any) {
    console.error(e);
    return res.status(500).json(`Error while sending email - ${e.message}`);
  } finally {
    if (!req.query.sinceTimestamp) {
      // Update cron probe in db
      await persistCronProbe(EmailType.NewProposal, sentEmails, nonSentEmails, cronDuration);
    }
  }
  return res
    .status(200)
    .json(
      `Web3 Emails sent - ${sentEmails} email successfully sent | ${nonSentEmails} non sent emails`,
    );
}
