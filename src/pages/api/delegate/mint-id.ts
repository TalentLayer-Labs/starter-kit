import { NextApiRequest, NextApiResponse } from 'next';
import { getConfig } from '../../../config';
import TalentLayerID from '../../../contracts/ABI/TalentLayerID.json';
import { getDelegationSigner } from '../utils/delegate';
import { recoverMessageAddress } from 'viem';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { handle, handlePrice, userAddress, chainId, signature } = req.body;
  const config = getConfig(chainId);

  const address = await recoverMessageAddress({
    message: handle,
    signature: signature,
  });

  if (address.toLowerCase() !== userAddress.toLowerCase()) {
    res.status(500).json('Signature is not valid');
    return;
  }

  try {
    if (process.env.NEXT_PUBLIC_ACTIVE_DELEGATE_MINT !== 'true') {
      res.status(500).json('Delegation is not activated');
      return null;
    }

    const walletClient = await getDelegationSigner(res);
    if (!walletClient) {
      return;
    }
    const transaction = await walletClient.writeContract({
      address: config.contracts.talentLayerId,
      abi: TalentLayerID.abi,
      functionName: 'mintForAddress',
      args: [userAddress, process.env.NEXT_PUBLIC_PLATFORM_ID, handle],
      value: BigInt(handlePrice),
    });

    res.status(200).json({ transaction: transaction });
  } catch (error) {
    console.error('errorDebug', error);
    res.status(500).json({ error: error });
  }
}
