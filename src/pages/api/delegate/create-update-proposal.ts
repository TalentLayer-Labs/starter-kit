// pages/api/createService.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getConfig } from '../../../config';
import TalentLayerService from '../../../contracts/ABI/TalentLayerService.json';
import { getProposalSignature } from '../../../utils/signature';
import { getDelegationSigner, isPlatformAllowedToDelegate } from '../utils/delegate';

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

  // @dev : you can add here all the check you need to confirm the delagation for a user
  await isPlatformAllowedToDelegate(chainId, userAddress, res);

  try {
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

    res.status(200).json({ transaction: transaction });
  } catch (error) {
    console.error('errorDebug', error);
    res.status(500).json('tx failed');
  }
}
