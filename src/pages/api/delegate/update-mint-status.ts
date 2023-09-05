// pages/api/createService.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { Contract } from 'ethers';
import { getConfig } from '../../../config';
import TalentLayerPlatformID from '../../../contracts/ABI/TalentLayerPlatformID.json';
import { getDelegationSigner, isPlatformAllowedToDelegate } from '../utils/delegate';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { mintStatus, userAddress, chainId } = req.body;
  const config = getConfig(chainId);

  // @dev : you can add here all the check you need to confirm the delagation for a user

  await isPlatformAllowedToDelegate(chainId, userAddress, res);

  try {
    const signer = await getDelegationSigner(res);

    if (!signer) {
      return;
    }

    const talentLayerPlatformID = new Contract(
      config.contracts.talentLayerPlatformID,
      TalentLayerPlatformID.abi,
      signer,
    );
    const transaction = await talentLayerPlatformID.updateMintStatus(mintStatus);

    res.status(200).json({ transaction: transaction });
  } catch (error) {
    console.error('errorDebug', error);
    res.status(500).json({ error: error });
  }
}
