// pages/api/createService.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getConfig } from '../../../config';
import TalentLayerID from '../../../contracts/ABI/TalentLayerID.json';
import { getDelegationSigner } from '../utils/delegate';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { handle, handlePrice, userAddress, chainId } = req.body;
  const config = getConfig(chainId);

  // @dev : you can add here all the check you need to confirm the delagation for a user

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
