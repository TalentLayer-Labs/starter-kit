import { NextApiRequest, NextApiResponse } from 'next';
import { getUserByTalentLayerId } from '../../../modules/BuilderPlace/actions/user';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const body: any = req.body;
  console.log('Received data:', body);

  if (!body.id) {
    return res.status(500).json({ error: 'No id.' });
  }

  const result = await getUserByTalentLayerId(body.id, res);
  return res.json(result);
}
