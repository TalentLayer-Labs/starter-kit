import { recoverMessageAddress } from 'viem';
import { getBuilderPlaceByOwnerAddressAndDomain } from '../../../modules/BuilderPlace/actions';
import { NextApiResponse } from 'next';

export const checkSignature = async (
  subdomain: string,
  signature: `0x${string}` | Uint8Array,
  res: NextApiResponse,
) => {
  const address = await recoverMessageAddress({
    message: subdomain,
    signature: signature,
  });

  const builderPlace = await getBuilderPlaceByOwnerAddressAndDomain(address, subdomain);

  if (!builderPlace) {
    return res.status(500).json({ error: 'Not the owner.' });
  }
};
