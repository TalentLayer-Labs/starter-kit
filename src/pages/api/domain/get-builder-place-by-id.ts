import { NextApiRequest, NextApiResponse } from 'next';
import { getBuilderPlaceById } from '../../../modules/BuilderPlace/actions/builderPlace';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const body: { id: string } = req.body;
  console.log('Received data:', body);

  if (!body.id) {
    return res.status(400).json({ error: 'Missing id' });
  }

  try {
    const result = await getBuilderPlaceById(body.id);
    res.status(200).json({ result: result });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
