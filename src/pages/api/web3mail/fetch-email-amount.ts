import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import { fetchSentEmailAMount } from '../../../modules/Web3mail/utils/database';

export const config = {
  maxDuration: 300, // 5 minutes.
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const mongoUri = process.env.NEXT_MONGO_URI as string;

  if (!mongoUri) {
    return res.status(500).json('MongoDb URI is not set');
  }

  try {
    await mongoose.connect(mongoUri as string);
    const emailsNumber = await fetchSentEmailAMount();

    return res.status(200).json({ message: `Successfully fetched emails`, data: emailsNumber });
  } catch (e: any) {
    console.error(e.message);
    return res.status(500).json(`Error while fetching email amount - ${e.message}`);
  }
}
