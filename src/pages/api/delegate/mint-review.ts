// pages/api/createService.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getConfig } from '../../../config';
import TalentLayerReview from '../../../contracts/ABI/TalentLayerReview.json';
import { getDelegationSigner, isPlatformAllowedToDelegate } from '../utils/delegate';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId, userAddress, serviceId, uri, valuesRating, chainId } = req.body;
  const config = getConfig(chainId);

  // @dev : you can add here all the check you need to confirm the delagation for a user
  await isPlatformAllowedToDelegate(chainId, userAddress, res);

  try {
    const walletClient = await getDelegationSigner(res);
    if (!walletClient) {
      return;
    }

    const transaction = await walletClient.writeContract({
      address: config.contracts.talentLayerReview,
      abi: TalentLayerReview.abi,
      functionName: 'mint',
      args: [userId, serviceId, uri, valuesRating],
    });

    res.status(200).json({ transaction: transaction });
  } catch (error) {
    console.error('errorDebug', error);
    res.status(500).json('tx failed');
  }
}
