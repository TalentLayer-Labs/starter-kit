import { IUser } from '../../../types';
import { NextApiRequest, NextApiResponse } from 'next';
import { sendMailToAddresses } from '../../../scripts/iexec/sendMailToAddresses';
import { getUsersWeb3MailPreference } from '../../../queries/users';
import { Contact } from '@iexec/web3mail';
import { generateWeb3mailProviders, prepareNonCronApi } from '../utils/web3mail';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const chainId = process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID;
  const platformId = process.env.NEXT_PUBLIC_PLATFORM_ID;
  const securityKey = req.query.key as string;
  const privateKey = process.env.NEXT_PUBLIC_WEB3MAIL_PLATFORM_PRIVATE_KEY as string;

  let sentEmails = 0,
    nonSentEmails = 0;

  prepareNonCronApi(chainId, platformId, securityKey, privateKey, res);

  const { emailSubject, emailContent } = req.body;
  if (!emailSubject || !emailContent) return res.status(500).json(`Missing argument`);
  try {
    const { dataProtector, web3mail } = generateWeb3mailProviders(privateKey);

    // const contactList: Contact[] = await web3mail.fetchMyContacts();
    //
    // if (contactList.length === 0) {
    //   return res.status(200).json('No users granted access to their email');
    // }
    //
    // // This array has all the addresses of the users that have granted access to their email to this platform
    // const contactAddresses = contactList.map(contact => contact.address);

    const contactAddresses = [
      '0x89de0dd433bd1f6a4ec5dd2593f44b9dd4fad2f0',
      '0x86a86da3e48905f0ecbf788948ada2789669ee11',
      '0x3D0c6A35DcD9AEB46b493cd6CC9Ace84583b7aE8',
    ];

    const response = await getUsersWeb3MailPreference(
      Number(chainId),
      contactAddresses,
      'activeOnPlatformMarketing',
    );

    // This array has all the users that have granted access to their email to this platform and opted for the platform marketing feature
    let validUsers: IUser[] = [];

    if (response?.data?.data?.users) {
      validUsers = response.data.data.users;
      validUsers = validUsers.filter(
        user => user.description?.web3mailPreferences?.activeOnPlatformMarketing === true,
      );
    }

    if (validUsers.length === 0) {
      return res.status(200).json(`No User opted for this feature`);
    }

    const usersAddresses = validUsers.map(user => user.address);
    // // TODO: Remove for prod
    // const usersAddresses = [
    //   '0x89de0dd433bd1f6a4ec5dd2593f44b9dd4fad2f0',
    //   '0x86a86da3e48905f0ecbf788948ada2789669ee11',
    //   '0x3D0c6A35DcD9AEB46b493cd6CC9Ace84583b7aE8',
    // ];
    const { successCount, errorCount } = await sendMailToAddresses(
      `${emailSubject}`,
      `${emailContent}`,
      usersAddresses,
      false,
      dataProtector,
      web3mail,
    );
    sentEmails += successCount;
    nonSentEmails += errorCount;
  } catch (e: any) {
    console.error(e);
    return res.status(500).json(`Error while sending email - ${e.message}`);
  }
  return res
    .status(200)
    .json(
      `Web3 Emails sent - ${sentEmails} email successfully sent | ${nonSentEmails} non sent emails`,
    );
}
