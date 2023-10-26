import { NextApiRequest, NextApiResponse } from 'next';
import { deleteBuilderPlace } from '../../../modules/BuilderPlace/actions';
import { checkSignature } from '../utils/domain';
import { DeleteBuilderPlace } from '../../../modules/BuilderPlace/types';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const body: DeleteBuilderPlace = req.body;
    console.log('Received builderPlace:', body);

    // Check whether the address which provided the signature is an owner of the domain
    await checkSignature(body.subdomain, body.signature, res);

    const result = await deleteBuilderPlace(body.subdomain);

    if (result.message) {
      res.status(200).json({ message: result.message });
    } else {
      res.status(400).json({ error: result.error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
