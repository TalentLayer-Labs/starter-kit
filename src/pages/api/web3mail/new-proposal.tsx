import mongoose from 'mongoose';
import { getProposalsFromPlatformServices } from '../../../queries/proposals';
import { EmailType, IProposal, NotificationApiUri } from '../../../types';
import { NextApiRequest, NextApiResponse } from 'next';
import { sendMailToAddresses } from '../../../scripts/iexec/sendMailToAddresses';
import { getUsersWeb3MailPreference } from '../../../queries/users';
import { calculateCronData } from '../../../modules/Web3mail/utils/cron';
import {
  getDomain,
  hasEmailBeenSent,
  persistCronProbe,
  persistEmail,
} from '../../../modules/Web3mail/utils/database';
import {
  EmptyError,
  generateWeb3mailProviders,
  getValidUsers,
  prepareCronApi,
} from '../utils/web3mail';
import { renderTokenAmount } from '../../../utils/conversion';
import { renderWeb3mail } from '../utils/generateWeb3Mail';

export const config = {
  maxDuration: 300, // 5 minutes.
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const chainId = process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID as string;
  const platformId = process.env.NEXT_PUBLIC_PLATFORM_ID as string;
  const mongoUri = process.env.NEXT_MONGO_URI as string;
  const cronSecurityKey = req.headers.authorization as string;
  const privateKey = process.env.NEXT_WEB3MAIL_PLATFORM_PRIVATE_KEY as string;
  const isWeb3mailActive = process.env.NEXT_PUBLIC_ACTIVE_WEB3MAIL as string;
  const RETRY_FACTOR = process.env.NEXT_WEB3MAIL_RETRY_FACTOR
    ? process.env.NEXT_WEB3MAIL_RETRY_FACTOR
    : '0';

  let sentEmails = 0,
    nonSentEmails = 0;

  prepareCronApi(isWeb3mailActive, chainId, platformId, mongoUri, cronSecurityKey, privateKey, res);

  await mongoose.connect(mongoUri as string);

  // Check whether the user provided a timestamp or if it will come from the cron config
  const { sinceTimestamp, cronDuration } = calculateCronData(
    req,
    Number(RETRY_FACTOR),
    NotificationApiUri.NewProposal,
  );

  let status = 200;
  try {
    const response = await getProposalsFromPlatformServices(
      Number(chainId),
      platformId,
      sinceTimestamp,
    );

    if (!response?.data?.data?.proposals || response.data.data.proposals.length === 0) {
      throw new EmptyError(`No new proposals available`);
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
      throw new EmptyError(`All new proposals notifications already sent`);
    }

    // Filter out users which have not opted for the feature
    const allBuyerAddresses = nonSentProposalEmails.map(proposal => proposal.service.buyer.address);
    const notificationResponse = await getUsersWeb3MailPreference(
      Number(chainId),
      allBuyerAddresses,
      'activeOnNewProposal',
    );

    if (
      !notificationResponse?.data?.data?.userDescriptions ||
      notificationResponse.data.data.userDescriptions.length === 0
    ) {
      throw new EmptyError(`No User opted for this feature`);
    }

    const validUserAddresses = getValidUsers(notificationResponse.data.data.userDescriptions);

    const proposalEmailsToBeSent = nonSentProposalEmails.filter(proposal =>
      validUserAddresses.includes(proposal.service.buyer.address),
    );

    if (proposalEmailsToBeSent.length === 0) {
      throw new EmptyError(
        `New proposals detected, but no concerned users opted for the ${EmailType.NewProposal} feature`,
      );
    }

    const { dataProtector, web3mail } = generateWeb3mailProviders(privateKey);

    for (const proposal of proposalEmailsToBeSent) {
      const domain = await getDomain(proposal.buyer.id);

      try {
        const email = renderWeb3mail(
          `You got a new proposal!`,
          `You just received a new proposal for the open-source mission "${
            proposal.service.description?.title
          }" you posted on BuilderPlace !
          ${
            proposal.seller.handle
          } can complete your work for the following amount: ${renderTokenAmount(
            proposal.rateToken,
            proposal.rateAmount,
          )}.`,
          proposal.service.buyer.handle,
          `${domain}/work/${proposal.service.id}`,
          `Go to proposal detail`,
          domain,
        );
        // @dev: This function needs to be throwable to avoid persisting the entity in the DB if the email is not sent
        await sendMailToAddresses(
          `You got a new proposal !`,
          email,
          [proposal.service.buyer.address],
          true,
          proposal.service.platform.name,
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
    if (e instanceof EmptyError) {
      console.warn(e.message);
    } else {
      console.error(e);
      console.error(e.message);
      status = 500;
    }
  } finally {
    if (!req.query.sinceTimestamp) {
      // Update cron probe in db
      await persistCronProbe(EmailType.NewProposal, sentEmails, nonSentEmails, cronDuration);
      console.log(
        `Cron probe updated in DB for ${EmailType.NewProposal}: duration: ${cronDuration}, sentEmails: ${sentEmails}, nonSentEmails: ${nonSentEmails}`,
      );
    }
    console.log(
      `Web3 Emails sent - ${sentEmails} email successfully sent | ${nonSentEmails} non sent emails`,
    );
  }
  return res
    .status(status)
    .json(
      `Web3 Emails sent - ${sentEmails} email successfully sent | ${nonSentEmails} non sent emails`,
    );
}
