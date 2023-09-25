import { NextApiRequest, NextApiResponse } from 'next';
import { userGaveAccessToPlatform } from '../../../modules/Web3mail/utils/data-protector';
import { generateWeb3mailProviders } from '../utils/web3mail';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const privateKey = process.env.NEXT_PUBLIC_WEB3MAIL_PLATFORM_PRIVATE_KEY;
  const { subject, body, contacts } = req.body;
  let sentEmails = 0,
    nonSentEmails = 0;
  if (!subject || !body || !contacts) return res.status(500).json(`Missing argument`);

  console.log('------- Sending email to addresses -------');
  if (!privateKey) {
    return res.status(500).json(`Private key is not set`);
  }

  try {
    const { dataProtector, web3mail } = generateWeb3mailProviders(privateKey);

    for (const address of contacts) {
      try {
        console.log(`------- Sending to ${address} -------`);

        // Check whether user granted access to his email
        const protectedEmailAddress = await userGaveAccessToPlatform(address, dataProtector);

        if (!protectedEmailAddress) {
          nonSentEmails++;
          console.log(`sendMailToAddresses - User ${address} did not grant access to his email`);
          continue;
        }

        const mailSent = await web3mail.sendEmail({
          protectedData: protectedEmailAddress,
          emailSubject: subject,
          emailContent: body,
        });
        sentEmails++;
        console.log('sent email', mailSent);
      } catch (e: any) {
        nonSentEmails++;
        console.error(e.message);
      }
    }
  } catch (e: any) {
    console.error(e.message);
    return res.status(500).json(`Error while sending email - ${e.message}`);
  }
  return res
    .status(200)
    .json(
      `Web3 Emails sent - ${sentEmails} email successfully sent | ${nonSentEmails} non sent emails`,
    );
}
