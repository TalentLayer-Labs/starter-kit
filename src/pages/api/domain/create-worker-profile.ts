import { NextApiRequest, NextApiResponse } from 'next';
import { CreateWorkerProfileProps } from '../../../modules/BuilderPlace/types';
import { createWorkerProfile } from '../../../modules/BuilderPlace/actions';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const body: CreateWorkerProfileProps = req.body;
    console.log('Received data:', body);

    const result = await createWorkerProfile({
      ...body,
    });

    console.log('result: ', result);

    if (result.message) {
      res.status(200).json({ message: result.message, id: result._id });
    } else {
      res.status(400).json({ error: result.error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
