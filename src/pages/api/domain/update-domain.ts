import { NextApiRequest, NextApiResponse } from 'next';
import { UpdateSpaceDomain, updateSpaceDomain } from '../../../modules/MultiDomain/actions';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const body: UpdateSpaceDomain = req.body;
    console.log('Received data:', body);

    const result = await updateSpaceDomain(body);

    if (result.error) {
      res.status(400).json({ error: result.error });
    } else {
      res.status(200).json({ message: 'Space domain updated successfully' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}