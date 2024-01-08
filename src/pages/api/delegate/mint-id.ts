import { NextApiRequest, NextApiResponse } from 'next';
import { getConfig } from '../../../config';
import TalentLayerID from '../../../contracts/ABI/TalentLayerID.json';
import { getDelegationSigner, getPublicClient } from '../utils/delegate';
import { recoverMessageAddress } from 'viem';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { handle, handlePrice, userAddress, chainId, signature, addDelegateAndTransferId } =
    req.body;
  const config = getConfig(chainId);

  const address = await recoverMessageAddress({
    message: handle,
    signature: signature,
  });

  if (address.toLowerCase() !== userAddress.toLowerCase()) {
    res.status(500).json('Signature is not valid');
    return;
  }

  if (process.env.NEXT_PUBLIC_ACTIVATE_DELEGATE_MINT !== 'true') {
    res.status(500).json('Delegation is not activated');
    return null;
  }

  try {
    const walletClient = await getDelegationSigner(res);
    if (!walletClient) {
      return;
    }

    let transaction;

    /**
     * If addDelegateAndTransferId is true, we mint the TlId for the user, add the delegator address as delegate, then transfer it to them.
     * @dev: This requires the delegator address not to have an existing TlId.
     */
    if (addDelegateAndTransferId) {
      const publicClient = getPublicClient();
      if (!publicClient) {
        return;
      }

      const tx = await walletClient.writeContract({
        address: config.contracts.talentLayerId,
        abi: TalentLayerID.abi,
        functionName: 'mint',
        args: [process.env.NEXT_PUBLIC_PLATFORM_ID, handle],
        value: BigInt(handlePrice),
      });

      console.log(`Minted TalentLayer Id for address ${userAddress}`);

      // Wait for transaction to be mined
      const receipt = await publicClient.waitForTransactionReceipt({ hash: tx });
      console.log('Mint Transaction Status', receipt.status);

      // Get Minted UserId
      console.log('walletClient.account.address', walletClient.account.address);
      const userId = await publicClient.readContract({
        address: config.contracts.talentLayerId,
        abi: TalentLayerID.abi,
        functionName: 'ids',
        args: [walletClient.account.address],
      });

      console.log(`Minted id: ${userId} for user ${userAddress}`);

      // Add delegate
      await walletClient.writeContract({
        address: config.contracts.talentLayerId,
        abi: TalentLayerID.abi,
        functionName: 'addDelegate',
        args: [userId, walletClient.account.address],
      });

      console.log(`Added ${walletClient.account.address} as delegate for user ${userId}`);

      // Transfer TlId to user
      transaction = await walletClient.writeContract({
        address: config.contracts.talentLayerId,
        abi: TalentLayerID.abi,
        functionName: 'safeTransferFrom',
        args: [walletClient.account.address, userAddress, userId],
      });

      console.log(`Transferred TalentLayer Id ${userId} to address ${userAddress}`);
    } else {
      transaction = await walletClient.writeContract({
        address: config.contracts.talentLayerId,
        abi: TalentLayerID.abi,
        functionName: 'mintForAddress',
        args: [userAddress, process.env.NEXT_PUBLIC_PLATFORM_ID, handle],
        value: BigInt(handlePrice),
      });
    }

    res.status(200).json({ transaction: transaction });
  } catch (error) {
    console.error('errorDebug', error);
    res.status(500).json({ error: error });
  }
}
