import { NextApiRequest, NextApiResponse } from 'next';
import { updateBuilderPlace } from '../../../modules/BuilderPlace/actions';
import { UpdateBuilderPlace } from '../../../modules/BuilderPlace/types';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const body: UpdateBuilderPlace = req.body;
    console.log('Received data:', body);

    const result = await updateBuilderPlace(body);

    if (result?.error) {
      res.status(400).json({ error: result.error });
    } else {
      res.status(200).json({ message: 'BuilderPlace domain updated successfully' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
