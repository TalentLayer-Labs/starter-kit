import { NextApiRequest, NextApiResponse } from 'next';
import { sendMailToAddresses } from '../../../scripts/iexec/sendMailToAddresses';
import { generateWeb3mailProviders, prepareNonCronApi } from '../utils/web3mail';
import { recoverMessageAddress } from 'viem';
import { getPlatformId } from '../../../queries/platform';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const chainId = process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID;
  const platformId = process.env.NEXT_PUBLIC_PLATFORM_ID;
  const securityKey = req.headers.authorization as string;
  const privateKey = process.env.NEXT_PUBLIC_WEB3MAIL_PLATFORM_PRIVATE_KEY as string;
  const isWeb3mailActive = process.env.NEXT_PUBLIC_ACTIVE_WEB3MAIL as string;

  let sentEmails = 0,
    nonSentEmails = 0;

  prepareNonCronApi(isWeb3mailActive, chainId, platformId, securityKey, privateKey, res);

  const { emailSubject, emailContent, signature, contacts: usersAddresses } = req.body;
  if (!emailSubject || !emailContent || !signature || !usersAddresses)
    return res.status(500).json(`Missing argument`);

  try {
    // Check whether the address which provided the signature is the owner of the platform
    const address = await recoverMessageAddress({
      message: emailSubject,
      signature,
    });

    const platformResponse = await getPlatformId(Number(chainId), address);
    const platformId: string | undefined = platformResponse.data?.data?.platforms[0]?.id;

    if (!platformId || (platformId && platformId !== process.env.NEXT_PUBLIC_PLATFORM_ID)) {
      return res.status(401).json(`Unauthorized`);
    }

    const { dataProtector, web3mail } = generateWeb3mailProviders(privateKey);

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
