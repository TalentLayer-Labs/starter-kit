import mongoose from 'mongoose';
import { EmailType, IReview, IUser } from '../../../types';
import { NextApiRequest, NextApiResponse } from 'next';
import { sendMailToAddresses } from '../../../scripts/iexec/sendMailToAddresses';
import { getUsersWeb3MailPreference } from '../../../queries/users';
import { calculateCronData } from '../../../modules/Web3mail/utils/cron';
import {
  hasReviewEmailBeenSent,
  persistCronProbe,
  persistEmail,
} from '../../../modules/Web3mail/utils/database';
import { getNewReviews } from '../../../queries/reviews';
import { generateWeb3mailProviders, prepareCronApi } from '../utils/web3mail';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const chainId = process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID as string;
  const platformId = process.env.NEXT_PUBLIC_PLATFORM_ID as string;
  const mongoUri = process.env.NEXT_MONGO_URI as string;
  const cronSecurityKey = req.query.key as string;
  const privateKey = process.env.NEXT_PUBLIC_WEB3MAIL_PLATFORM_PRIVATE_KEY as string;

  const RETRY_FACTOR = 5;
  let sentEmails = 0,
    nonSentEmails = 0;

  prepareCronApi(chainId, platformId, mongoUri, cronSecurityKey, privateKey, res);

  await mongoose.connect(mongoUri as string);

  // Check whether the user provided a timestamp or if it will come from the cron config
  const { sinceTimestamp, cronDuration } = calculateCronData(req, RETRY_FACTOR, EmailType.Review);

  try {
    const response = await getNewReviews(Number(chainId), platformId, sinceTimestamp);

    if (!response?.data?.data?.reviews || response.data.data.reviews.length === 0) {
      return res.status(200).json(`No new reviews available`);
    }

    // Check if a notification email has already been sent for these reviews
    const reviews: IReview[] = response.data.data.reviews;
    const nonSentReviewEmails: IReview[] = [];

    if (reviews.length > 0) {
      for (const review of reviews) {
        const hasBeenSent = await hasReviewEmailBeenSent(review, EmailType.Review);
        if (!hasBeenSent) {
          nonSentReviewEmails.push(review);
        }
      }
    }

    // If some emails have not been sent yet, send a web3mail & persist in the DB that the email was sent
    if (nonSentReviewEmails.length > 0) {
      // Filter out users which have not opted for the feature
      const allRevieweesAddresses = nonSentReviewEmails.map(review => review.to.address);

      const response = await getUsersWeb3MailPreference(
        Number(chainId),
        allRevieweesAddresses,
        'activeOnReview',
      );

      let validUsers: IUser[] = [];

      if (response?.data?.data?.users && response.data.data.users.length > 0) {
        validUsers = response.data.data.users;
      } else {
        return res.status(200).json(`No User opted for this feature`);
      }

      const validUserAddresses: string[] = validUsers.map(user => user.address);

      const reviewEmailsToBeSent = nonSentReviewEmails.filter(review => {
        validUserAddresses.includes(review.to.address);
      });

      if (reviewEmailsToBeSent.length === 0) {
        return res
          .status(200)
          .json(
            `New reviews detected, but no concerned users opted for the ${EmailType.Review} feature`,
          );
      }

      const { dataProtector, web3mail } = generateWeb3mailProviders(privateKey);

      for (const review of reviewEmailsToBeSent) {
        let fromHandle = '',
          fromAddress = '';
        if (review.to.address === review.service.buyer.address) {
          fromHandle = review.service.seller.handle;
          fromAddress = review.service.seller.address;
        } else {
          fromHandle = review.service.buyer.handle;
          fromAddress = review.service.buyer.address;
        }
        console.log(
          `A review with id ${review.id} was created from ${fromHandle} owning the address ${fromAddress} for the service ${review.service.id}.`,
        );
        review.to.address === review.service.buyer.address
          ? console.log('Reviewer is the seller')
          : console.log('Reviewer is the buyer');
        try {
          // @dev: This function needs to be throwable to avoid persisting the entity in the DB if the email is not sent
          await sendMailToAddresses(
            `A review was created for the service - ${review.service.description?.title}`,
            `${fromHandle} has left a review for the TalentLayer service ${review.service.description?.title}.
            The service was rated ${review.rating}/5 stars and the following comment was left: ${review.description?.content}.
            Congratulations on completing your service and improving your TalentLayer reputation !
            
            You can find details on this review here: ${review.service.platform.description?.website}/dashboard/services/${review.service.id}`,
            [review.to.address],
            true,
            dataProtector,
            web3mail,
          );
          await persistEmail(review.id, EmailType.Review);
          sentEmails++;
        } catch (e: any) {
          nonSentEmails++;
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
      persistCronProbe(EmailType.Review, sentEmails, nonSentEmails, cronDuration);
    }
  }
  return res
    .status(200)
    .json(
      `Web3 Emails sent - ${sentEmails} email successfully sent | ${nonSentEmails} non sent emails`,
    );
}
