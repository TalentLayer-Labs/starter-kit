import { NextApiRequest, NextApiResponse } from 'next';
import { getUserById } from '../../../modules/BuilderPlace/actions/user';
import { MISSING_DATA } from '../../../modules/BuilderPlace/apiResponses';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const body: any = req.body;
  console.log('Received data:', body);

  if (!body.id) {
    return res.status(400).json({ error: MISSING_DATA });
  }

  const result = await getUserById(body.id);
  return res.json(result);
}
