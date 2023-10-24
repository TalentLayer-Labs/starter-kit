import { NextApiRequest, NextApiResponse } from 'next';
import { CreateBuilderPlaceProps, IBuilderPlace } from '../../../modules/BuilderPlace/types';
import { createBuilderPlace } from '../../../modules/BuilderPlace/actions';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const body: CreateBuilderPlaceProps = req.body;
    console.log('Received data:', body);

    const result = await createBuilderPlace({
      ...body,
      subdomain: `${body.subdomain}`,
    });

    if (result.message) {
      res.status(200).json({ message: result.message });
    } else {
      res.status(400).json({ error: result.error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
