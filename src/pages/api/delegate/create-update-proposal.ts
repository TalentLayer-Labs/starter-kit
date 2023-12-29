// pages/api/createService.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getConfig } from '../../../config';
import TalentLayerService from '../../../contracts/ABI/TalentLayerService.json';
import { getProposalSignature } from '../../../utils/signature';
import { getDelegationSigner, isPlatformAllowedToDelegate } from '../utils/delegate';
import {
  checkOrResetTransactionCounter,
  checkUserEmailVerificationStatus,
  getWorkerProfileByTalentLayerId,
  incrementWeeklyTransactionCounter,
} from '../../../modules/BuilderPlace/actions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    userId,
    userAddress,
    serviceId,
    valuesRateToken,
    parsedRateAmountString,
    cid,
    convertExpirationDateString,
    existingProposalStatus,
    chainId,
  } = req.body;
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

      if (existingProposalStatus) {
        transaction = await walletClient.writeContract({
          address: config.contracts.serviceRegistry,
          abi: TalentLayerService.abi,
          functionName: 'updateProposal',
          args: [
            userId,
            serviceId,
            valuesRateToken,
            parsedRateAmountString,
            cid,
            convertExpirationDateString,
          ],
        });
      } else {
        const signature = await getProposalSignature({
          profileId: Number(userId),
          cid,
          serviceId: Number(serviceId),
        });

        transaction = await walletClient.writeContract({
          address: config.contracts.serviceRegistry,
          abi: TalentLayerService.abi,
          functionName: 'createProposal',
          args: [
            userId,
            serviceId,
            valuesRateToken,
            parsedRateAmountString,
            process.env.NEXT_PUBLIC_PLATFORM_ID,
            cid,
            convertExpirationDateString,
            signature,
          ],
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
