import mongoose from 'mongoose';
import { EmailType, IReview } from '../../../types';
import { NextApiRequest, NextApiResponse } from 'next';
import { sendMailToAddresses } from '../../../scripts/iexec/sendMailToAddresses';
import { getUserWeb3mailPreferences } from '../../../queries/users';
import { calculateCronData } from '../../../modules/Web3mail/utils/cron';
import {
  checkReviewExistenceInDb,
  persistCronProbe,
  persistEmail,
} from '../../../modules/Web3mail/utils/database';
import { getNewReviews } from '../../../queries/reviews';
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
  const { sinceTimestamp, cronDuration } = calculateCronData(req, RETRY_FACTOR, EmailType.Review);

  try {
    const response = await getNewReviews(Number(chainId), platformId, sinceTimestamp);
    const nonSentReviewEmails: IReview[] = [];

    // Check if some entities are not already in the DB
    if (response.data.data.reviews.length > 0) {
      for (const review of response.data.data.reviews as IReview[]) {
        await checkReviewExistenceInDb(review, nonSentReviewEmails, EmailType.Review);
      }
    }

    // If some entities are not already in the DB, email the hirer & persist the payment in the DB
    if (nonSentReviewEmails) {
      for (const review of nonSentReviewEmails) {
        let fromHandle = '',
          fromAddress = '';
        review.to.address === review.service.buyer.address
          ? ((fromHandle = review.service.seller.handle),
            (fromAddress = review.service.seller.address))
          : ((fromHandle = review.service.buyer.handle),
            (fromAddress = review.service.buyer.address));
        console.log('Handle', fromHandle);
        console.log('Address', fromAddress);
        console.log('Payment id', review.id);
        console.log('Reviewer is the buyer', review.to.address === review.service.buyer.address);
        // Check whether the user opted for the called feature | Seller if fund release, Buyer if fund reimbursement
        //TODO query not tested
        const userData = await getUserWeb3mailPreferences(
          Number(chainId),
          fromAddress,
          'activeOnReview',
        );
        if (!userData?.description?.web3mailPreferences?.activeOnReview) {
          console.error(`User ${fromAddress} has not opted in for the ${EmailType.Review} feature`);
        }
        try {
          // @dev: This function needs to be throwable to avoid persisting the entity in the DB if the email is not sent
          await sendMailToAddresses(
            `A review was created for the service - ${review.service.description?.title}`,
            `${fromHandle} has left a review for the TalentLayer service ${review.service.description?.title}.
            The service was rated ${review.rating}/5 stars and the following comment was left: ${review.description?.content}.
            Congratulations on completing your service and improving your TalentLayer reputation !`,
            [fromAddress],
            true,
          );
          await persistEmail(review.id, EmailType.Review);
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
      persistCronProbe(EmailType.Review, successCount, errorCount, cronDuration);
    }
  }
  return res
    .status(200)
    .json(`Web3 Emails sent - ${successCount} email successfully sent | ${errorCount} errors`);
}
