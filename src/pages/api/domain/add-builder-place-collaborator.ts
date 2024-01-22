import { NextApiRequest, NextApiResponse } from 'next';
import { AddBuilderPlaceCollaborator } from '../../../modules/BuilderPlace/types';
import { checkOwnerSignature, isCollaboratorExists } from '../utils/domain';
import { User } from '.prisma/client';
import { addBuilderPlaceCollaborator } from '../../../modules/BuilderPlace/actions/builderPlace';
import {
  COLLABORATOR_ALREADY_EXISTS,
  METHOD_NOT_ALLOWED,
} from '../../../modules/BuilderPlace/apiResponses';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: METHOD_NOT_ALLOWED });
  }

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

    if (isCollaboratorExists(existingCollaborators, body.newCollaboratorAddress)) {
      return res.status(400).json({ error: COLLABORATOR_ALREADY_EXISTS });
    }

    const result = await addBuilderPlaceCollaborator(body);
    res.status(200).json({ message: result.message, address: result.address, id: result.id });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
