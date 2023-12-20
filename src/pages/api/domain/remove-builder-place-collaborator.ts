import { NextApiRequest, NextApiResponse } from 'next';
import { removeBuilderPlaceCollaborator } from '../../../modules/BuilderPlace/actions';
import { RemoveBuilderPlaceCollaborator } from '../../../modules/BuilderPlace/types';
import { checkOwnerSignature } from '../utils/domain';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const body: RemoveBuilderPlaceCollaborator = req.body;
    console.log('Received data:', body);

    await checkOwnerSignature(body.builderPlaceId, body.ownerId, body.signature, res);

    const result = await removeBuilderPlaceCollaborator(body);

    if (result?.error) {
      res.status(400).json({ error: result.error });
    } else {
      res.status(200).json({ message: result.message, address: result.collaborator });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
