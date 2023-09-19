import { EmailType } from '../../../types';
import { NextApiRequest, NextApiResponse } from 'next';
import { sendMailToAddresses } from '../../../scripts/iexec/sendMailToAddresses';
import { getUserWeb3mailPreferences } from '../../../queries/users';
import { IExecWeb3mail, getWeb3Provider as getMailProvider, Contact } from '@iexec/web3mail';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const chainId = process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID;
  const platformId = process.env.NEXT_PUBLIC_PLATFORM_ID;
  const privateKey = process.env.NEXT_PUBLIC_WEB3MAIL_PLATFORM_PRIVATE_KEY;
  let successCount = 0,
    errorCount = 0;

  if (!chainId) {
    return res.status(500).json('Chain Id is not set');
  }
  const { emailSubject, emailContent } = req.body;
  if (!emailSubject || !emailContent) return res.status(500).json(`Missing argument`);

  if (!privateKey) {
    return res.status(500).json('Private key is not set');
  }

  if (!platformId) {
    return res.status(500).json('Platform Id is not set');
  }

  try {
    const mailWeb3Provider = getMailProvider(privateKey);
    const web3mail = new IExecWeb3mail(mailWeb3Provider);
    const contactList: Contact[] = await web3mail.fetchMyContacts();

    if (contactList) {
      for (const contact of contactList) {
        console.log(contact.address);
        // Check whether the user opted for the called feature
        //TODO loop sur les contact qui ont true en metadata
        const userData = await getUserWeb3mailPreferences(
          Number(chainId),
          contact.address,
          'activeOnPlatformMarketing',
        );
        if (!userData?.description?.web3mailPreferences?.activeOnPlatformMarketing) {
          console.error(`User has not opted in for the ${EmailType.PlatformMarketing} feature`);
          continue;
        }
        try {
          //TODO Sortir ca de la loop , param = array address
          await sendMailToAddresses(`${emailSubject}`, `${emailContent}`, [contact.address], true);
          successCount++;
          console.log('Email sent');
        } catch (e: any) {
          errorCount++;
          console.error(e.message);
        }
      }
    }
  } catch (e: any) {
    console.error(e);
    return res.status(500).json(`Error while sending email - ${e.message}`);
  }
  return res
    .status(200)
    .json(`Web3 Emails sent - ${successCount} email successfully sent | ${errorCount} errors`);
}
