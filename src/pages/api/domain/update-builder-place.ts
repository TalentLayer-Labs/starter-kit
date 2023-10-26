import { NextApiRequest, NextApiResponse } from 'next';
import {
  getBuilderPlaceByOwnerAddressAndDomain,
  updateBuilderPlace,
} from '../../../modules/BuilderPlace/actions';
import { UpdateBuilderPlace } from '../../../modules/BuilderPlace/types';
import { recoverMessageAddress } from 'viem';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const body: UpdateBuilderPlace = req.body;
    console.log('Received data:', body);

    // Check whether the address which provided the signature is the owner of the platform
    const address = await recoverMessageAddress({
      message: body.subdomain,
      signature: body.signature,
    });

    const builderPlace = await getBuilderPlaceByOwnerAddressAndDomain(address, body.subdomain);

    if (!builderPlace) {
      return res.status(500).json({ error: 'Not the owner.' });
    }

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
