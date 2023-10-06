import { IExecWeb3mail, getWeb3Provider as getMailProvider, Contact } from '@iexec/web3mail';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const privateKey = process.env.NEXT_PUBLIC_WEB3MAIL_PLATFORM_PRIVATE_KEY;
  const { emailSubject, emailContent } = req.body;
  let sentEmails = 0,
    nonSentEmails = 0;
  if (!emailSubject || !emailContent) return res.status(500).json(`Missing argument`);

  console.log('------- Sending email to all contacts -------');
  if (!privateKey) {
    return res.status(500).json(`Private key is not set`);
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
