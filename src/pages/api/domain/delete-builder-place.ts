import { NextApiRequest, NextApiResponse } from 'next';
import { deleteBuilderPlace } from '../../../modules/BuilderPlace/actions';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const { subdomain } = req.query;
    console.log('Received builderPlace:', subdomain);

    const result = await deleteBuilderPlace(subdomain as string);

    if (result.message) {
      res.status(200).json({ message: result.message });
    } else {
      res.status(400).json({ error: result.error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
