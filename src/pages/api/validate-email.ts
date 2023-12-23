import { NextApiRequest, NextApiResponse } from 'next';
import { CreateBuilderPlaceProps, ValidateEmailProps } from '../../modules/BuilderPlace/types';
import { createBuilderPlace, validateEmail } from '../../modules/BuilderPlace/actions';
import { sendTransactionalEmailValidation } from '../../modules/BuilderPlace/sendgrid';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const body: ValidateEmailProps = req.body;
    console.log('Received data:', body);

    const result = await validateEmail({
      ...body,
    });

    if (result.message) {
      res.status(200).json({ message: result.message, id: result.id });
    } else {
      res.status(400).json({ error: result.error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
