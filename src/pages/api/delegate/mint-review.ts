// pages/api/createService.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getConfig } from '../../../config';
import TalentLayerReview from '../../../contracts/ABI/TalentLayerReview.json';
import { getDelegationSigner, isPlatformAllowedToDelegate } from '../utils/delegate';
import { getUserByTalentLayerId } from '../../../modules/BuilderPlace/actions/user';
import { checkUserEmailVerificationStatus } from '../../../modules/BuilderPlace/actions/email';
import {
  checkOrResetTransactionCounter,
  incrementWeeklyTransactionCounter,
} from '../../../modules/BuilderPlace/actions/transactionCounter';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId, userAddress, serviceId, uri, valuesRating, chainId } = req.body;
  const config = getConfig(chainId);

  // @dev : you can add here all the check you need to confirm the delegation for a user

  if (process.env.NEXT_PUBLIC_ACTIVE_DELEGATE !== 'true') {
    res.status(500).json('Delegation is not activated');
    return null;
  }

  try {
    const worker = await getUserByTalentLayerId(userId, res);

    if (worker) {
      await checkUserEmailVerificationStatus(worker, res);
      await checkOrResetTransactionCounter(worker, res);
      await isPlatformAllowedToDelegate(chainId, userAddress, res);
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

      await incrementWeeklyTransactionCounter(worker, res);

      res.status(200).json({ transaction: transaction });
    }
  } catch (error) {
    console.error('errorDebug', error);
    res.status(500).json('tx failed');
  }
}
