// pages/api/createService.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getDelegationSigner, isPlatformAllowedToDelegate } from '../utils/delegate';
import { getConfig } from '../../../config';
import {
  baseURL,
  // Shema address for "met IRL" need to create it before
  CUSTOM_SCHEMAS,
  EASContractAddress,
  getAttestation,
} from './utils/utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId, userAddress, cid, chainId } = req.body;
  const config = getConfig(chainId);

  // @dev : you can add here all the check you need to confirm the delagation for a user
  await isPlatformAllowedToDelegate(chainId, userAddress, res);

  try {
    const signer = await getDelegationSigner(res);
    if (!signer) {
      return;
    }

    res.status(200).json({ transaction: signer });
  } catch (error) {
    console.error('errorDebug', error);
    res.status(500).json('tx failed');
  }
}
