import { NextApiRequest, NextApiResponse } from 'next';
import { UpdateBuilderPlaceDomain } from '../../../modules/BuilderPlace/types';
import { checkSignature } from '../utils/domain';
import { updateDomain } from '../../../modules/BuilderPlace/actions/builderPlace';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    try {
      const body: UpdateBuilderPlaceDomain = req.body;
      console.log('Received data:', body);

      // Check whether the address which provided the signature is an owner of the domain
      await checkSignature(body.id, body.signature, res);
      await updateDomain(body);
      res.status(200).json({ message: 'BuilderPlace domain updated successfully' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
