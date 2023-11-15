import { recoverMessageAddress } from 'viem';
import { getBuilderPlaceByOwnerAddressAndId } from '../../../modules/BuilderPlace/actions';
import { NextApiResponse } from 'next';
import { getUserByAddress, getUserById } from '../../../queries/users';

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

export const checkOwnerSignature = async (
  id: string,
  signature: `0x${string}` | Uint8Array,
  res: NextApiResponse,
) => {
  const address = await recoverMessageAddress({
    message: id,
    signature: signature,
  });

  const builderPlace = await getBuilderPlaceByOwnerAddressAndId(address, id);

  if (!builderPlace) {
    return res.status(500).json({ error: 'Not the owner.' });
  }

  return { builderPlace, address };
};
