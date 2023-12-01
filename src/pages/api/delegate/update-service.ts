import { NextApiRequest, NextApiResponse } from 'next';
import { getConfig } from '../../../config';
import TalentLayerService from '../../../contracts/ABI/TalentLayerService.json';
import { getDelegationSigner, isPlatformAllowedToDelegate } from '../utils/delegate';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId, userAddress, serviceId, referralAmount, cid, chainId } = req.body;
  const config = getConfig(chainId);

  // @dev : you can add here all the checks you need to confirm the delegation for a user
  await isPlatformAllowedToDelegate(chainId, userAddress, res);

  try {
    const walletClient = await getDelegationSigner(res);
    if (!walletClient) {
      return;
    }

    const transaction = await walletClient.writeContract({
      address: config.contracts.serviceRegistry,
      abi: TalentLayerService.abi,
      functionName: 'updateService',
      args: [userId, serviceId, referralAmount, cid],
    });

    res.status(200).json({ transaction: transaction });
  } catch (error) {
    console.log('errorDebug', error);
    res.status(500).json('tx failed');
  }
}
