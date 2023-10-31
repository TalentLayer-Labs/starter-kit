import { NextApiRequest, NextApiResponse } from 'next';
import { getBuilderPlaceById } from '../../../modules/BuilderPlace/actions';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const body: any = req.body;
  console.log('Received data:', body);

  if (!body.id) {
    return res.status(500).json({ error: 'No id.' });
  }

  const result = await getBuilderPlaceById(body.id);

  return res.json(result);
}
