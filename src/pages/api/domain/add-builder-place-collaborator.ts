import { NextApiRequest, NextApiResponse } from 'next';
import { addBuilderPlaceCollaborator } from '../../../modules/BuilderPlace/actions';
import { AddBuilderPlaceCollaborator } from '../../../modules/BuilderPlace/types';
import { checkOwnerSignature } from '../utils/domain';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const body: AddBuilderPlaceCollaborator = req.body;
    console.log('Received data:', body);

    const response = await checkOwnerSignature(
      body.builderPlaceId,
      body.ownerId,
      body.signature,
      res,
    );

    // Checks if the user is already a collaborator
    if (response?.builderPlace?.owners?.includes(body.newCollaborator)) {
      res.status(400).json({ error: 'Already a Collaborator' });
    } else {
      const result = await addBuilderPlaceCollaborator(body);

      if (result?.error) {
        res.status(400).json({ error: result.error });
      } else {
        res.status(200).json({ message: result.message, address: result.collaborator });
      }
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
