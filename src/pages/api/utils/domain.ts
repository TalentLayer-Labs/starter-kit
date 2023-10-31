import { recoverMessageAddress } from 'viem';
import { getBuilderPlaceByOwnerAddressAndId } from '../../../modules/BuilderPlace/actions';
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
