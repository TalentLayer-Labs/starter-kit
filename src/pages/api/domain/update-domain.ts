import { NextApiRequest, NextApiResponse } from 'next';
import { UpdateBuilderPlaceDomain } from '../../../modules/BuilderPlace/types';
import { checkSignature } from '../utils/domain';
import { updateDomain } from '../../../modules/BuilderPlace/actions/builderPlace';
import { METHOD_NOT_ALLOWED } from '../../../modules/BuilderPlace/apiResponses';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: METHOD_NOT_ALLOWED });
  }

  try {
    const body: UpdateBuilderPlaceDomain = req.body;
    console.log('Received data:', body);

    /**
     * @dev: Check whether the address which provided the signature is an admin of the domain
     */
    await checkSignature(body.id, body.signature, res);

    await updateDomain(body);
    res.status(200).json({ message: 'BuilderPlace domain updated successfully' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
