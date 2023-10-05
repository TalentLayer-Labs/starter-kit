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
import { generateWeb3mailProviders, getValidUsers, prepareCronApi } from '../utils/web3mail';

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
    NotificationApiUri.FundRelease,
  );
  try {
    const response = await getNewPayments(Number(chainId), platformId, sinceTimestamp);

    if (!response?.data?.data?.payments || response.data.data.payments.length === 0) {
      return res.status(200).json(`No new payments available`);
    }

    const payments: IPayment[] = response.data.data.payments;
    const nonSentPaymentEmails: IPayment[] = [];

    // Check if a notification email has already been sent for these fund releases
    if (payments.length > 0) {
      for (const payment of payments) {
        const hasBeenSent = await hasEmailBeenSent(payment.id, EmailType.FundRelease);
        if (!hasBeenSent) {
          nonSentPaymentEmails.push(payment);
        }
      }
    }

    // If some emails have not been sent yet, send a web3mail & persist in the DB that the email was sent
    if (nonSentPaymentEmails.length == 0) {
      return res.status(200).json(`All new fund release notifications already sent`);
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
      return res.status(200).json(`No User opted for this feature`);
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
      return res
        .status(200)
        .json(
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

      try {
        // @dev: This function needs to be throwable to avoid persisting the entity in the DB if the email is not sent
        await sendMailToAddresses(
          `Funds ${action} for the service - ${payment.service.description?.title}`,
          `${senderHandle} has ${action} ${payment.amount} ${payment.rateToken.symbol} for the 
            service ${payment.service.description?.title} on TalentLayer !
            
            You can find details on this payment here: ${payment.service.platform.description?.website}/dashboard/services/${payment.service.id}`,
          [receiverAddress],
          true,
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
    console.error(e.message);
    return res.status(500).json(`Error while sending email - ${e.message}`);
  } finally {
    if (!req.query.sinceTimestamp) {
      // Update cron probe in db
      await persistCronProbe(EmailType.FundRelease, sentEmails, nonSentEmails, cronDuration);
    }
  }
  return res
    .status(200)
    .json(
      `Web3 Emails sent - ${sentEmails} email successfully sent | ${nonSentEmails} non sent emails`,
    );
}
