import { NextApiResponse } from 'next';
import { IExecWeb3mail, getWeb3Provider as getMailProvider } from '@iexec/web3mail';
import { IExecDataProtector, getWeb3Provider as getProtectorProvider } from '@iexec/dataprotector';

export const prepareCronApi = (
  chainId: string | undefined,
  platformId: string | undefined,
  mongoUri: string | undefined,
  cronSecurityKey: string | undefined,
  privateKey: string | undefined,
  res: NextApiResponse,
) => {
  if (cronSecurityKey !== process.env.NEXT_PRIVATE_CRON_KEY) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (!chainId) {
    return res.status(500).json('Chain Id is not set');
  }

  if (!mongoUri) {
    return res.status(500).json('MongoDb URI is not set');
  }

  if (!platformId) {
    return res.status(500).json('Platform Id is not set');
  }

  if (!privateKey) {
    return res.status(500).json('Private key is not set');
  }
};

export const prepareNonCronApi = (
  chainId: string | undefined,
  platformId: string | undefined,
  securityKey: string | undefined,
  privateKey: string | undefined,
  res: NextApiResponse,
) => {
  if (securityKey !== process.env.NEXT_PRIVATE_CRON_KEY) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (!chainId) {
    return res.status(500).json('Chain Id is not set');
  }

  if (!platformId) {
    return res.status(500).json('Platform Id is not set');
  }

  if (!privateKey) {
    return res.status(500).json('Private key is not set');
  }
};

export const generateWeb3mailProviders = (
  privateKey: string,
): { dataProtector: IExecDataProtector; web3mail: IExecWeb3mail } => {
  const mailWeb3Provider = getMailProvider(privateKey);
  const web3mail = new IExecWeb3mail(mailWeb3Provider);
  const protectorWebProvider = getProtectorProvider(privateKey);
  const dataProtector = new IExecDataProtector(protectorWebProvider);
  return { dataProtector, web3mail };
};
