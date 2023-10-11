import { IExecWeb3mail, getWeb3Provider as getMailProvider, Contact } from '@iexec/web3mail';
import { NextApiRequest, NextApiResponse } from 'next';
import { recoverMessageAddress } from 'viem';
import { getPlatformId } from '../../../queries/platform';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const privateKey = process.env.NEXT_PUBLIC_WEB3MAIL_PLATFORM_PRIVATE_KEY;
  const chainId = process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID as string;
  const { emailSubject, emailContent, signature } = req.body;
  let sentEmails = 0,
    nonSentEmails = 0;
  if (!emailSubject || !emailContent) return res.status(500).json(`Missing argument`);

  console.log('------- Sending email to all contacts -------');
  if (!privateKey) {
    return res.status(500).json(`Private key is not set`);
  }

  // Check whether the address which provided the signature is the owner of the platform
  const address = await recoverMessageAddress({
    message: emailSubject,
    signature,
  });

  const response = await getPlatformId(Number(chainId), address);
  const platformId: string | undefined = response.data?.data?.platforms[0].id;

  if (platformId && platformId !== process.env.NEXT_PUBLIC_PLATFORM_ID) {
    return res.status(401).json(`Unauthorized`);
  }

  try {
    const mailWeb3Provider = getMailProvider(privateKey);
    const web3mail = new IExecWeb3mail(mailWeb3Provider);

    console.log('------- All Contacts -------');
    const contactList: Contact[] = await web3mail.fetchMyContacts();

    for (const contact of contactList) {
      console.log(`------- Sending to ${contact.address} -------`);

      try {
        const sentMail = await web3mail.sendEmail({
          protectedData: contact.address,
          emailSubject: emailSubject,
          emailContent: emailContent,
        });
        sentEmails++;
        console.log('sentMail', sentMail);
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
