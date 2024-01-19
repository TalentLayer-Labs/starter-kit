import { NextApiRequest, NextApiResponse } from 'next';
import { AddBuilderPlaceCollaborator } from '../../../modules/BuilderPlace/types';
import { checkOwnerSignature } from '../utils/domain';
import { User } from '.prisma/client';
import { addBuilderPlaceCollaborator } from '../../../modules/BuilderPlace/actions/builderPlace';
import { COLLABORATOR_ALREADY_EXISTS } from '../../../modules/BuilderPlace/apiResponses';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const body: AddBuilderPlaceCollaborator = req.body;
    console.log('Received data:', body);
    try {
      const response = await checkOwnerSignature(
        body.builderPlaceId,
        body.ownerId,
        body.signature,
        res,
      );

      const existingCollaborators: User[] = response?.builderPlace?.collaborators || [];
      if (
        existingCollaborators.length > 0 &&
        existingCollaborators.some(
          collaborator =>
            collaborator?.address?.toLocaleLowerCase() ===
            body.newCollaboratorAddress.toLocaleLowerCase(),
        )
      ) {
        return res.status(400).json({ error: COLLABORATOR_ALREADY_EXISTS });
      }

      const result = await addBuilderPlaceCollaborator(body);
      res.status(200).json({ message: result.message, address: result.address, id: result.id });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
