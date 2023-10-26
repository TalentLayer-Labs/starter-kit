import { NextApiRequest, NextApiResponse } from 'next';
import { UpdateBuilderPlaceDomain } from '../../../modules/BuilderPlace/types';
import { updateDomain } from '../../../modules/BuilderPlace/actions';
import { checkSignature } from '../utils/domain';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const body: UpdateBuilderPlaceDomain = req.body;
    console.log('Received data:', body);

    // Check whether the address which provided the signature is an owner of the domain
    await checkSignature(body.subdomain, body.signature, res);

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
