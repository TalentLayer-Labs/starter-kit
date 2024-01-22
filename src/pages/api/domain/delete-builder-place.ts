import { NextApiRequest, NextApiResponse } from 'next';
import { checkSignature } from '../utils/domain';
import { DeleteBuilderPlace } from '../../../modules/BuilderPlace/types';
import { deleteBuilderPlace } from '../../../modules/BuilderPlace/actions/builderPlace';
import { METHOD_NOT_ALLOWED } from '../../../modules/BuilderPlace/apiResponses';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: METHOD_NOT_ALLOWED });
  }

  const body: DeleteBuilderPlace = req.body;
  console.log('Received builderPlace:', body);

  try {
    // Check whether the address which provided the signature is a collaborator of the domain
    await checkSignature(body.id, body.signature, res);

    const result = await deleteBuilderPlace(body.id);
    res.status(200).json({ message: result.message });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
