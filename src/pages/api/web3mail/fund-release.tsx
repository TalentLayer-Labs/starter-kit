import mongoose from 'mongoose';
import { getNewPayments } from '../../../queries/payments';
import { EmailType, IPayment, NotificationApiUri, PaymentTypeEnum } from '../../../types';
import { NextApiRequest, NextApiResponse } from 'next';
import { sendMailToAddresses } from '../../../scripts/iexec/sendMailToAddresses';
import { getUsersWeb3MailPreference } from '../../../queries/users';
import { calculateCronData } from '../../../modules/Web3mail/utils/cron';
import {
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
    NotificationApiUri.FundRelease,
  );

  let status = 200;
  try {
    const response = await getNewPayments(Number(chainId), platformId, sinceTimestamp);

    if (!response?.data?.data?.payments || response.data.data.payments.length === 0) {
      throw new EmptyError('No new payments available');
    }

    const payments: IPayment[] = response.data.data.payments;
    const nonSentPaymentEmails: IPayment[] = [];

    // Check if a notification email has already been sent for these fund releases
    for (const payment of payments) {
      const hasBeenSent = await hasEmailBeenSent(payment.id, EmailType.FundRelease);
      if (!hasBeenSent) {
        nonSentPaymentEmails.push(payment);
      }
    }

    // If some emails have not been sent yet, send a web3mail & persist in the DB that the email was sent
    if (nonSentPaymentEmails.length == 0) {
      throw new EmptyError('All new fund release notifications already sent');
    }

    // Check whether the users opted for the called feature | Seller if fund release, Buyer if fund reimbursement
    const allAddresses = nonSentPaymentEmails.map(payment => {
      if (payment.paymentType === PaymentTypeEnum.Release) {
        return payment.service.seller.address;
      } else {
        return payment.service.buyer.address;
      }
    });

    const notificationResponse = await getUsersWeb3MailPreference(
      Number(chainId),
      allAddresses,
      'activeOnFundRelease',
    );

    if (
      !notificationResponse?.data?.data?.userDescriptions ||
      notificationResponse.data.data.userDescriptions.length === 0
    ) {
      throw new EmptyError('No User opted for this feature');
    }

    const validUserAddresses = getValidUsers(notificationResponse.data.data.userDescriptions);

    const paymentEmailsToBeSent = nonSentPaymentEmails.filter(payment =>
      validUserAddresses.includes(
        payment.paymentType === PaymentTypeEnum.Release
          ? payment.service.seller.address
          : payment.service.buyer.address,
      ),
    );

    if (paymentEmailsToBeSent.length === 0) {
      throw new EmptyError(
        `New fund release detected, but no  concerned users opted for the ${EmailType.FundRelease} feature`,
      );
    }

    const { dataProtector, web3mail } = generateWeb3mailProviders(privateKey);

    for (const payment of paymentEmailsToBeSent) {
      let senderHandle = '',
        receiverHandle = '',
        action = '',
        receiverAddress = '';
      if (payment.paymentType === PaymentTypeEnum.Release) {
        senderHandle = payment.service.buyer.handle;
        receiverHandle = payment.service.seller.handle;
        action = 'released';
        receiverAddress = payment.service.seller.address;
      } else {
        senderHandle = payment.service.seller.handle;
        receiverHandle = payment.service.buyer.handle;
        action = 'reimbursed';
        receiverAddress = payment.service.buyer.address;
      }

      console.log(
        `New fund ${action} email to send to ${senderHandle} at address ${receiverAddress}`,
      );

      const email = renderWeb3mail(
        `Funds released!`,
        `${senderHandle} has ${action} ${renderTokenAmount(
          payment.rateToken,
          payment.amount,
        )} for the gig ${payment.service.description?.title} on BuilderPlace !`,
        receiverHandle,
        `${payment.service.platform.description?.website}/work/${payment.service.id}`,
        `Go to payment detail`,
      );
      try {
        // @dev: This function needs to be throwable to avoid persisting the entity in the DB if the email is not sent
        await sendMailToAddresses(
          `Funds ${action} for the gig - ${payment.service.description?.title}`,
          email,
          [receiverAddress],
          true,
          payment.service.platform.name,
          dataProtector,
          web3mail,
        );
        await persistEmail(payment.id, EmailType.FundRelease);
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
      await persistCronProbe(EmailType.FundRelease, sentEmails, nonSentEmails, cronDuration);
      console.log(
        `Cron probe updated in DB for ${EmailType.FundRelease}: duration: ${cronDuration}, sentEmails: ${sentEmails}, nonSentEmails: ${nonSentEmails}`,
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
