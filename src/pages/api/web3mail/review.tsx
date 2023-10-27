import mongoose from 'mongoose';
import { EmailType, IReview, NotificationApiUri } from '../../../types';
import { NextApiRequest, NextApiResponse } from 'next';
import { sendMailToAddresses } from '../../../scripts/iexec/sendMailToAddresses';
import { getUsersWeb3MailPreference } from '../../../queries/users';
import { calculateCronData } from '../../../modules/Web3mail/utils/cron';
import {
  hasEmailBeenSent,
  persistCronProbe,
  persistEmail,
} from '../../../modules/Web3mail/utils/database';
import { getNewReviews } from '../../../queries/reviews';
import {
  EmptyError,
  generateWeb3mailProviders,
  getValidUsers,
  prepareCronApi,
} from '../utils/web3mail';
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
    NotificationApiUri.Review,
  );

  let status = 200;
  try {
    const response = await getNewReviews(Number(chainId), platformId, sinceTimestamp);

    if (!response?.data?.data?.reviews || response.data.data.reviews.length === 0) {
      throw new EmptyError(`No new reviews available`);
    }

    // Check if a notification email has already been sent for these reviews
    const reviews: IReview[] = response.data.data.reviews;
    const nonSentReviewEmails: IReview[] = [];

    if (reviews.length > 0) {
      for (const review of reviews) {
        const hasBeenSent = await hasEmailBeenSent(review.id, EmailType.Review);
        if (!hasBeenSent) {
          nonSentReviewEmails.push(review);
        }
      }
    }

    // If some emails have not been sent yet, send a web3mail & persist in the DB that the email was sent
    if (nonSentReviewEmails.length == 0) {
      throw new EmptyError(`All review notifications already sent`);
    }
    // Filter out users which have not opted for the feature
    const allRevieweesAddresses = nonSentReviewEmails.map(review => review.to.address);

    const notificationResponse = await getUsersWeb3MailPreference(
      Number(chainId),
      allRevieweesAddresses,
      'activeOnReview',
    );

    if (
      !notificationResponse?.data?.data?.userDescriptions ||
      notificationResponse.data.data.userDescriptions.length === 0
    ) {
      throw new EmptyError(`No User opted for this feature`);
    }

    const validUserAddresses = getValidUsers(notificationResponse.data.data.userDescriptions);

    const reviewEmailsToBeSent = nonSentReviewEmails.filter(review =>
      validUserAddresses.includes(review.to.address),
    );

    if (reviewEmailsToBeSent.length === 0) {
      throw new EmptyError(
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
        `A review with id ${review.id} was created from ${fromHandle} owning the address ${fromAddress} for the gig ${review.service.id}!`,
      );
      review.to.address === review.service.buyer.address
        ? console.log('Reviewer is the seller')
        : console.log('Reviewer is the buyer');
      try {
        const email = renderWeb3mail(
          `You received a new review!`,
          review.to.handle,
          `${fromHandle} has left a review for the gig ${review.service.description?.title}.
            The gig was rated ${review.rating}/5 stars and the following comment was left: ${review.description?.content}.
            Congratulations on completing your gig and improving your reputation !`,
          `${review.service.platform.description?.website}/work/${review.service.id}`,
          `Go to review detail`,
        );
        // @dev: This function needs to be throwable to avoid persisting the entity in the DB if the email is not sent
        await sendMailToAddresses(
          `A review was created for the gig - ${review.service.description?.title}`,
          email,
          [review.to.address],
          true,
          review.service.platform.name,
          dataProtector,
          web3mail,
        );
        await persistEmail(review.id, EmailType.Review);
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
      console.error(e.message);
      status = 500;
    }
  } finally {
    if (!req.query.sinceTimestamp) {
      // Update cron probe in db
      persistCronProbe(EmailType.Review, sentEmails, nonSentEmails, cronDuration);
      console.log(
        `Cron probe updated in DB for ${EmailType.Review}: duration: ${cronDuration}, sentEmails: ${sentEmails}, nonSentEmails: ${nonSentEmails}`,
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
