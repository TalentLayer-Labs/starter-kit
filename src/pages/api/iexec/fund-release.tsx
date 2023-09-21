import mongoose from 'mongoose';
import { getNewPayment } from '../../../queries/payments';
import { EmailType, IPayment, PaymentTypeEnum } from '../../../types';
import { NextApiRequest, NextApiResponse } from 'next';
import { sendMailToAddresses } from '../../../scripts/iexec/sendMailToAddresses';
import { getUserWeb3mailPreference } from '../../../queries/users';
import { calculateCronData } from '../../../modules/Web3mail/utils/cron';
import {
  hasPaymentEmailBeenSent,
  persistCronProbe,
  persistEmail,
} from '../../../modules/Web3mail/utils/database';
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
  const { sinceTimestamp, cronDuration } = calculateCronData(
    req,
    RETRY_FACTOR,
    EmailType.FundRelease,
  );
  try {
    const response = await getNewPayment(Number(chainId), platformId, sinceTimestamp);
    const payments: IPayment[] = response.data.data.payments;
    const nonSentPaymentEmails: IPayment[] = [];

    // Check if a notification email has already been sent for this fund release
    if (payments.length > 0) {
      for (const payment of payments) {
        const hasBeenSent = await hasPaymentEmailBeenSent(payment, EmailType.FundRelease);
        if (!hasBeenSent) {
          nonSentPaymentEmails.push(payment);
        }
      }
    }

    //TODO Check si il y a quelque chose à faire ici
    // If some emails have not been sent yet, send a web3mail & persist in the DB that the email was sent
    if (nonSentPaymentEmails.length > 0) {
      const { dataProtector, web3mail } = generateWeb3mailProviders(privateKey);

      for (const payment of nonSentPaymentEmails) {
        let handle = '',
          action = '',
          address = '';
        if (payment.paymentType === PaymentTypeEnum.Release) {
          handle = payment.service.seller.handle;
          action = 'released';
          address = payment.service.seller.address;
        } else {
          handle = payment.service.buyer.handle;
          action = 'reimbursed';
          address = payment.service.buyer.address;
        }
        console.log(`New fund ${action} email to send to ${handle} at address ${address}`);

        // Check whether the user opted for the called feature | Seller if fund release, Buyer if fund reimbursement
        //TODO query not tested
        const userData = await getUserWeb3mailPreference(
          Number(chainId),
          address,
          'activeOnFundRelease',
        );
        if (!userData?.description?.web3mailPreferences?.activeOnFundRelease) {
          console.log(`User ${address} has not opted in for the ${EmailType.FundRelease} feature`);
          continue;
        }
        try {
          // @dev: This function needs to be throwable to avoid persisting the entity in the DB if the email is not sent
          await sendMailToAddresses(
            `Funds ${action} for the service - ${payment.service.description?.title}`,
            `${handle} has ${action} ${payment.amount} ${payment.rateToken.symbol} for the 
            service ${payment.service.description?.title} on TalentLayer !`,
            [address],
            true,
            dataProtector,
            web3mail,
          );
          await persistEmail(payment.id, EmailType.FundRelease);
          sentEmails++;
          console.log('Email sent');
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
      await persistCronProbe(EmailType.FundRelease, sentEmails, nonSentEmails, cronDuration);
    }
  }
  return res
    .status(200)
    .json(
      `Web3 Emails sent - ${sentEmails} email successfully sent | ${nonSentEmails} non sent emails`,
    );
}
