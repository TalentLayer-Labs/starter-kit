import mongoose from 'mongoose';
import { getAcceptedProposal } from '../../../queries/proposals';
import { EmailType, IProposal } from '../../../types';
import { NextApiRequest, NextApiResponse } from 'next';
import { sendMailToAddresses } from '../../../scripts/iexec/sendMailToAddresses';
import { getUserWeb3mailPreferences } from '../../../queries/users';
import { calculateCronData } from '../../../modules/Web3mail/utils/cron';
import {
  checkProposalExistenceInDb,
  persistCronProbe,
  persistEmail,
} from '../../../modules/Web3mail/utils/database';
import { prepareCronApi } from '../utils/web3mail';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const chainId = process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID as string;
  const platformId = process.env.NEXT_PUBLIC_PLATFORM_ID as string;
  const mongoUri = process.env.NEXT_MONGO_URI as string;

  const cronSecurityKey = req.query.key as string;
  const RETRY_FACTOR = 5;
  let successCount = 0,
    errorCount = 0;

  prepareCronApi(chainId, platformId, mongoUri, cronSecurityKey, res);

  await mongoose.connect(mongoUri as string);

  // Check whether the user provided a timestamp or if it will come from the cron config
  const { sinceTimestamp, cronDuration } = calculateCronData(
    req,
    RETRY_FACTOR,
    EmailType.ProposalValidated,
  );

  try {
    const response = await getAcceptedProposal(Number(chainId), platformId, sinceTimestamp);
    console.log('All proposals', response.data.data.proposals);
    const nonSentProposals: IProposal[] = [];

    // Check if some entities are not already in the DB
    if (response.data.data.proposals.length > 0) {
      for (const proposal of response.data.data.proposals as IProposal[]) {
        console.log('Proposal', proposal.service.buyer.address);
        await checkProposalExistenceInDb(proposal, nonSentProposals, EmailType.ProposalValidated);
      }
    }

    // If some entities are not already in the DB, email the hirer & persist the proposal in the DB
    if (nonSentProposals) {
      for (const proposal of nonSentProposals) {
        // Check whether the user opted for the called feature
        //TODO query not tested
        const userData = await getUserWeb3mailPreferences(
          Number(chainId),
          proposal.service.buyer.address,
          'activeOnProposalValidated',
        );
        if (!userData?.description?.web3mailPreferences?.activeOnProposalValidated) {
          console.error(`User has not opted in for the ${EmailType.ProposalValidated} feature`);
          continue;
        }
        try {
          // @dev: This function needs to be throwable to avoid persisting the proposal in the DB if the email is not sent
          await sendMailToAddresses(
            `Your proposal got accepted ! - ${proposal.description?.title}`,
            `The proposal you made for the service ${proposal.service.id} you posted on TalentLayer got accepted by ${proposal.service.buyer} !
              The following amount was agreed: ${proposal.rateAmount} : ${proposal.rateToken.symbol}. 
              For the following work to be provided: ${proposal.description?.about}.
              This Proposal can be viewed at ${process.env.NEXT_PUBLIC_IPFS_BASE_URL}${proposal.id}`,
            [proposal.seller.address],
            true,
          );
          await persistEmail(proposal.id, EmailType.ProposalValidated);
          successCount++;
          console.log('Email sent');
        } catch (e: any) {
          errorCount++;
          console.error(e.message);
        }
      }
    }
  } catch (e: any) {
    console.error(e.message);
    return res.status(500).json(`Error while sending email - ${e.message}`);
  } finally {
    if (!req.query.sinceTimestamp) {
      // Update cron probe in db
      persistCronProbe(EmailType.ProposalValidated, successCount, errorCount, cronDuration);
    }
  }
  return res
    .status(200)
    .json(`Web3 Emails sent - ${successCount} email successfully sent | ${errorCount} errors`);
}
