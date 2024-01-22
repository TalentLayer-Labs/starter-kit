import { recoverMessageAddress } from 'viem';
import { NextApiResponse } from 'next';
import {
  getBuilderPlaceByCollaboratorAddressAndId,
  getBuilderPlaceByOwnerTlIdAndId,
} from '../../../modules/BuilderPlace/actions/builderPlace';
import { User } from '.prisma/client';

/**
 * Checks if the signature is from a BuilderPlace collaborator by getting the BuilderPlace
 * by the collaborator address & BuilderPlace Database id
 * @param id: Database BuilderPlace id
 * @param signature
 * @param res
 */
export const checkSignature = async (
  id: string,
  signature: `0x${string}` | Uint8Array,
  res: NextApiResponse,
) => {
  try {
    const address = await recoverMessageAddress({
      message: id,
      signature: signature,
    });

    const builderPlace = await getBuilderPlaceByCollaboratorAddressAndId(
      address.toLocaleLowerCase(),
      id,
    );

    if (!builderPlace) {
      return res.status(400).json({ error: 'No BuilderPlace found.' });
    }

    return { builderPlace, address };
  } catch (error) {
    console.error('Error in checkSignature:', error);

    return res.status(500).json({ error: 'An error occurred while verifying the signature.' });
  }
};

/**
 * Checks if the signature is from the BuilderPlace owner by getting the BuilderPlace
 * by the owner DataBase id & BuilderPlace Database id
 * @param builderPlaceId: Database BuilderPlace id
 * @param ownerId: Database BuilderPlace owner id
 * @param signature
 * @param res
 * @throws 401 if the signature is not from the BuilderPlace owner
 */
export const checkOwnerSignature = async (
  builderPlaceId: string,
  ownerId: string,
  signature: `0x${string}` | Uint8Array,
  res: NextApiResponse,
) => {
  try {
    const address = await recoverMessageAddress({
      message: ownerId,
      signature: signature,
    });

    const builderPlace = await getBuilderPlaceByOwnerTlIdAndId(ownerId, builderPlaceId);

    if (
      builderPlace &&
      address.toLocaleLowerCase() !== builderPlace?.owner?.address?.toLocaleLowerCase()
    ) {
      return res.status(401).json({ error: 'Not BuilderPlace owner' });
    }

    return { builderPlace, address };
  } catch (error) {
    console.error('Error in checkSignature:', error);

    return res.status(500).json({ error: 'An error occurred while verifying the signature.' });
  }
};

export const isCollaboratorExists = (
  collaborators: User[] = [],
  newCollaboratorAddress: string,
): boolean => {
  return collaborators.some(
    collaborator =>
      collaborator?.address?.toLocaleLowerCase() === newCollaboratorAddress.toLocaleLowerCase(),
  );
};
