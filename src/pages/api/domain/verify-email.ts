import { NextApiRequest, NextApiResponse } from 'next';
import { VerifyEmail } from '../../../modules/BuilderPlace/types';
import { verifyUserEmail } from '../../../modules/BuilderPlace/actions/email';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const body: VerifyEmail = req.body;
    console.log('Received data:', body);

    try {
      const result = await verifyUserEmail(body.userId, res);
      res.status(200).json({ message: result?.message, email: result?.email });
    } catch (err: any) {
      console.error(err);
      res.status(err.httpCode || 400).end(String(err));
      return;
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
