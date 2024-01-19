import { NextApiRequest, NextApiResponse } from 'next';
import { RemoveBuilderPlaceCollaborator } from '../../../modules/BuilderPlace/types';
import { checkOwnerSignature } from '../utils/domain';
import { User } from '.prisma/client';
import { removeBuilderPlaceCollaborator } from '../../../modules/BuilderPlace/actions/builderPlace';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const body: RemoveBuilderPlaceCollaborator = req.body;
    console.log('Received data:', body);

    try {
      const response = await checkOwnerSignature(
        body.builderPlaceId,
        body.ownerId,
        body.signature,
        res,
      );

      /**
       * @dev: Check whether the collaborator is not the BuilderPlace owner
       */
      if (
        response?.builderPlace?.owner?.address?.toLocaleLowerCase() ===
        body.collaboratorAddress.toLocaleLowerCase()
      ) {
        return res.status(400).json({ error: 'Restricted access' });
      }

      /**
       * @dev: Check whether the collaborator exists
       */
      const existingCollaborators: User[] = response?.builderPlace?.collaborators || [];
      if (
        existingCollaborators.length > 0 &&
        !existingCollaborators.some(
          collaborator =>
            collaborator?.address?.toLocaleLowerCase() ===
            body.collaboratorAddress.toLocaleLowerCase(),
        )
      ) {
        return res.status(400).json({ error: 'Not a collaborator' });
      }

      const result = await removeBuilderPlaceCollaborator(body);
      res.status(200).json({ message: result?.message, address: result?.address, id: result.id });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
