import { NextApiResponse } from 'next';

export const prepareCronApi = (
  chainId: string | undefined,
  platformId: string | undefined,
  mongoUri: string | undefined,
  cronSecurityKey: string | undefined,
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
};

export const prepareNonCronApi = (
  chainId: string | undefined,
  platformId: string | undefined,
  cronSecurityKey: string | undefined,
  res: NextApiResponse,
) => {
  if (cronSecurityKey !== process.env.NEXT_PRIVATE_CRON_KEY) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (!chainId) {
    return res.status(500).json('Chain Id is not set');
  }

  if (!platformId) {
    return res.status(500).json('Platform Id is not set');
  }
};
