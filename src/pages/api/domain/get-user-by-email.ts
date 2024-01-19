import { NextApiRequest, NextApiResponse } from 'next';
import { getUserByEmail } from '../../../modules/BuilderPlace/actions/user';
import { MISSING_DATA } from '../../../modules/BuilderPlace/apiResponses';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const body: any = req.body;
  console.log('Received data:', body);

  if (!body.email) {
    return res.status(400).json({ error: MISSING_DATA });
  }

  const result = await getUserByEmail(body.email);
  return res.json(result);
}
