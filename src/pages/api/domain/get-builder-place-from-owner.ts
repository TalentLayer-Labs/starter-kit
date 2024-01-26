import { NextApiRequest, NextApiResponse } from 'next';
import { getBuilderPlaceByOwnerTalentLayerId } from '../../../modules/BuilderPlace/actions/builderPlace';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const body: any = req.body;
  console.log('Received data:', body);

  if (!body.id) {
    return res.status(400).json({ error: 'No id.' });
  }

  const result = await getBuilderPlaceByOwnerTalentLayerId(body.id);

  return res.json(result);
}
