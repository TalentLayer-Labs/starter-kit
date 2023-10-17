import mongoose from 'mongoose';
import { getAcceptedProposals } from '../../../queries/proposals';
import { EmailType, IProposal, NotificationApiUri } from '../../../types';
import { NextApiRequest, NextApiResponse } from 'next';
import { sendMailToAddresses } from '../../../scripts/iexec/sendMailToAddresses';
import { getUsersWeb3MailPreference } from '../../../queries/users';
import { calculateCronData } from '../../../modules/Web3mail/utils/cron';
import {
  hasEmailBeenSent,
  persistCronProbe,
  persistEmail,
} from '../../../modules/Web3mail/utils/database';
import { generateWeb3mailProviders, getValidUsers, prepareCronApi } from '../utils/web3mail';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const chainId = process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID as string;
  const platformId = process.env.NEXT_PUBLIC_PLATFORM_ID as string;
  const mongoUri = process.env.NEXT_MONGO_URI as string;
  const cronSecurityKey = req.headers.authorization as string;
  const privateKey = process.env.NEXT_PRIVATE_WEB3MAIL_PLATFORM_PRIVATE_KEY as string;
  const isWeb3mailActive = process.env.NEXT_PUBLIC_ACTIVE_WEB3MAIL as string;

  let sentEmails = 0,
    nonSentEmails = 0;
  const RETRY_FACTOR = 5;

  prepareCronApi(isWeb3mailActive, chainId, platformId, mongoUri, cronSecurityKey, privateKey, res);

  await mongoose.connect(mongoUri as string);

  // Check whether the user provided a timestamp or if it will come from the cron config
  const { sinceTimestamp, cronDuration } = calculateCronData(
    req,
    RETRY_FACTOR,
    NotificationApiUri.ProposalValidated,
  );

  try {
    const response = await getAcceptedProposals(Number(chainId), platformId, sinceTimestamp);

    if (!response?.data?.data?.proposals || response.data.data.proposals.length === 0) {
      return res.status(200).json(`No new proposals validated available`);
    }

    const proposals: IProposal[] = response.data.data.proposals;
    const nonSentProposalEmails: IProposal[] = [];

    // Check if a notification email has already been sent for these proposals
    if (proposals.length > 0) {
      for (const proposal of proposals) {
        const hasBeenSent = await hasEmailBeenSent(proposal.id, EmailType.ProposalValidated);
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
    const allSellerAddresses = nonSentProposalEmails.map(proposal => proposal.seller.address);
    const notificationResponse = await getUsersWeb3MailPreference(
      Number(chainId),
      allSellerAddresses,
      'activeOnProposalValidated',
    );

    if (
      !notificationResponse?.data?.data?.userDescriptions ||
      notificationResponse.data.data.userDescriptions.length === 0
    ) {
      return res.status(200).json(`No User opted for this feature`);
    }

    const validUserAddresses = getValidUsers(notificationResponse.data.data.userDescriptions);

    const proposalEmailsToBeSent = nonSentProposalEmails.filter(proposal =>
      validUserAddresses.includes(proposal.seller.address),
    );

    if (proposalEmailsToBeSent.length === 0) {
      return res
        .status(200)
        .json(
          `New proposals validated detected, but no concerned users opted for the ${EmailType.ProposalValidated} feature`,
        );
    }

    const { dataProtector, web3mail } = generateWeb3mailProviders(privateKey);

    for (const proposal of proposalEmailsToBeSent) {
      try {
        // @dev: This function needs to be throwable to avoid persisting the proposal in the DB if the email is not sent
        await sendMailToAddresses(
          `
          Hi ${proposal.seller.handle} !
          
          Your proposal got accepted ! - ${proposal.description?.title}`,
          `The proposal you made for the service ${proposal.service.id} you posted on TalentLayer got accepted by ${proposal.service.buyer} !
              The following amount was agreed: ${proposal.rateAmount} : ${proposal.rateToken.symbol}. 
              For the following work to be provided: ${proposal.description?.about}.
              
              This Proposal can be viewed at ${proposal.service.platform.description?.website}${proposal.id}`,
          [proposal.seller.address],
          true,
          dataProtector,
          web3mail,
        );
        await persistEmail(proposal.id, EmailType.ProposalValidated);
        console.log('Notification recorded in Database');
        sentEmails++;
      } catch (e: any) {
        nonSentEmails++;
        console.error(e.message);
      }
    }
  } catch (e: any) {
    console.error(e.message);
    return res.status(500).json(`Error while sending email - ${e.message}`);
  } finally {
    if (!req.query.sinceTimestamp) {
      // Update cron probe in db
      await persistCronProbe(EmailType.ProposalValidated, sentEmails, nonSentEmails, cronDuration);
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
