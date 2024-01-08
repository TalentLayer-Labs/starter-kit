import { NextApiRequest, NextApiResponse } from 'next';
import { SendVerificationEmail } from '../../../modules/BuilderPlace/types';
import { sendTransactionalEmailValidation } from '../utils/sendgrid';
import { EMAIL_VERIFIED_SUCCESSFULLY } from '../../../modules/BuilderPlace/apiResponses';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const body: SendVerificationEmail = req.body;
    console.log('Received data:', body);

    if (!process.env.NEXT_PUBLIC_ROOT_DOMAIN) {
      res.status(400).json({ message: 'NEXT_PUBLIC_ROOT_DOMAIN is not defined' });
      return;
    }

    try {
      await sendTransactionalEmailValidation(body.to, body.userId, body.name, body.domain);
      res.status(200).json({ message: EMAIL_VERIFIED_SUCCESSFULLY, email: body.to });
    } catch (err: any) {
      console.error(err);
      res.status(err.httpCode || 400).end(String(err));
      return;
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
