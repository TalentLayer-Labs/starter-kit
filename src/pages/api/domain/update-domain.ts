import { NextApiRequest, NextApiResponse } from 'next';
import { UpdateBuilderPlaceDomain } from '../../../modules/BuilderPlace/types';
import { updateDomain } from '../../../modules/BuilderPlace/actions';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const body: UpdateBuilderPlaceDomain = req.body;
    console.log('Received data:', body);

    const result = await updateDomain(body);

    if (result?.error) {
      res.status(400).json({ error: result.error });
    } else {
      res.status(200).json({ message: 'BuilderPlace domain updated successfully' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
