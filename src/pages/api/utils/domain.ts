import { recoverMessageAddress } from 'viem';
import {
  getBuilderPlaceByOwnerAddressAndId,
  getBuilderPlaceByOwnerTlIdAndId,
} from '../../../modules/BuilderPlace/actions';
import { NextApiResponse } from 'next';

export const checkSignature = async (
  _id: string,
  signature: `0x${string}` | Uint8Array,
  res: NextApiResponse,
) => {
  const address = await recoverMessageAddress({
    message: _id,
    signature: signature,
  });

  const builderPlace = await getBuilderPlaceByOwnerAddressAndId(address, _id);

  if (!builderPlace) {
    return res.status(500).json({ error: 'Not the owner.' });
  }

  return { builderPlace, address };
};

/**
 * Checks if the signature is from the BuilderPlace owner
 * @param builderPlaceId
 * @param ownerId
 * @param signature
 * @param res
 */
export const checkOwnerSignature = async (
  builderPlaceId: string,
  ownerId: string,
  signature: `0x${string}` | Uint8Array,
  res: NextApiResponse,
) => {
  const address = await recoverMessageAddress({
    message: ownerId,
    signature: signature,
  });

  const builderPlace = await getBuilderPlaceByOwnerTlIdAndId(ownerId, builderPlaceId);

  if (address !== builderPlace?.ownerAddress) {
    return res.status(500).json({ error: 'Not BuilderPlace owner' });
  }

  return { builderPlace, address };
};
