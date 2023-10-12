import { NextApiRequest, NextApiResponse } from 'next';
import { userGaveAccessToPlatform } from '../../../modules/Web3mail/utils/data-protector';
import { generateWeb3mailProviders } from '../utils/web3mail';
import { recoverMessageAddress } from 'viem';
import { getPlatformId } from '../../../queries/platform';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const privateKey = process.env.NEXT_PUBLIC_WEB3MAIL_PLATFORM_PRIVATE_KEY;
  const chainId = process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID as string;
  const { emailSubject, emailContent, contacts, signature } = req.body;
  let sentEmails = 0,
    nonSentEmails = 0;
  if (!emailSubject || !emailContent || !contacts || !signature)
    return res.status(500).json(`Missing argument`);

  console.log('------- Sending email to addresses -------');
  if (!privateKey) {
    return res.status(500).json(`Private key is not set`);
  }

  // Check whether the address which provided the signature is the owner of the platform
  const address = await recoverMessageAddress({
    message: emailSubject,
    signature,
  });

  const response = await getPlatformId(Number(chainId), address);
  const platformId: string | undefined = response.data?.data?.platforms[0]?.id;

  if (!platformId || (platformId && platformId !== process.env.NEXT_PUBLIC_PLATFORM_ID)) {
    return res.status(401).json(`Unauthorized`);
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
          continue;
        }

        const mailSent = await web3mail.sendEmail({
          protectedData: protectedEmailAddress,
          emailSubject: emailSubject,
          emailContent: emailContent,
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
