import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import { fetchSentEmailAmount } from '../../../modules/Web3mail/utils/database';
import { Web3MailStats } from '../../../types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const mongoUri = process.env.NEXT_MONGO_URI as string;
  const stats: Web3MailStats = { emailAmount: 0 };

  if (!mongoUri) {
    return res.status(500).json('MongoDb URI is not set');
  }

  try {
    await mongoose.connect(mongoUri as string);
    stats.emailAmount = await fetchSentEmailAmount();

    return res.status(200).json({ message: `Successfully fetched email stats`, data: stats });
  } catch (e: any) {
    console.error(e.message);
    return res.status(500).json(`Error while fetching email stats - ${e.message}`);
  }
}
