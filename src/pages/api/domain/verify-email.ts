import { NextApiRequest, NextApiResponse } from 'next';
import { validateWorkerProfileEmail } from '../../../modules/BuilderPlace/actions';
import { VerifyEmail } from '../../../modules/BuilderPlace/types';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const body: VerifyEmail = req.body;
    console.log('Received data:', body);

    //TODO call verify email API service
    const result = await validateWorkerProfileEmail(body.userId, body.email);

    if (result?.error) {
      res.status(400).json({ error: result.error });
    } else {
      res.status(200).json({ message: 'Email successfully validated  ', email: body.email });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
