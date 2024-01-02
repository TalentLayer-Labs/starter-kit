// pages/api/createService.ts
import { NextApiRequest, NextApiResponse } from 'next';
import TalentLayerService from '../../../contracts/ABI/TalentLayerService.json';
import { getServiceSignature } from '../../../utils/signature';
import { getDelegationSigner, isPlatformAllowedToDelegate } from '../utils/delegate';
import { getConfig } from '../../../config';
import {
  checkOrResetTransactionCounter,
  checkUserEmailVerificationStatus,
  getWorkerProfileByTalentLayerId,
  incrementWeeklyTransactionCounter,
} from '../../../modules/BuilderPlace/actions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId, userAddress, cid, chainId, existingService } = req.body;
  const config = getConfig(chainId);

  // @dev : you can add here all the check you need to confirm the delegation for a user
  try {
    const worker = await getWorkerProfileByTalentLayerId(userId, res);

    if (worker) {
      await checkUserEmailVerificationStatus(worker, res);
      await checkOrResetTransactionCounter(worker, res);
      await isPlatformAllowedToDelegate(chainId, userAddress, res);

      const walletClient = await getDelegationSigner(res);
      if (!walletClient) {
        return;
      }

    let transaction;

    if (existingService) {
      transaction = await walletClient.writeContract({
        address: config.contracts.serviceRegistry,
        abi: TalentLayerService.abi,
        functionName: 'updateServiceData',
        args: [userId, existingService.id, cid],
      });
    } else {
      const signature = await getServiceSignature({ profileId: Number(userId), cid });
      transaction = await walletClient.writeContract({
        address: config.contracts.serviceRegistry,
        abi: TalentLayerService.abi,
        functionName: 'createService',
        args: [userId, process.env.NEXT_PUBLIC_PLATFORM_ID, cid, signature],
      });
    }

      await incrementWeeklyTransactionCounter(worker, res);

      res.status(200).json({ transaction: transaction });
    }
  } catch (error) {
    console.error('errorDebug', error);
    res.status(500).json('tx failed');
  }
}
