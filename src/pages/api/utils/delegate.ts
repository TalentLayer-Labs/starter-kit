import { NextApiResponse } from 'next';
import { getUserByAddress } from '../../../queries/users';
import { mnemonicToAccount } from 'viem/accounts';
import { createWalletClient, http } from 'viem';
import { polygonMumbai } from '../../../chains';
import { WalletClient } from 'wagmi';

export async function isPlatformAllowedToDelegate(
  chainId: number,
  userAddress: string,
  res: NextApiResponse,
): Promise<boolean> {
  const getUser = await getUserByAddress(chainId, userAddress);
  const delegateAddresses = getUser.data?.data?.users[0].delegates;

  if (
    delegateAddresses.indexOf(
      (process.env.NEXT_PUBLIC_DELEGATE_ADDRESS as string).toLowerCase(),
    ) === -1
  ) {
    res.status(500).json('Delegation is not activated');
    return false;
  }

  return true;
}

export async function getDelegationSigner(res: NextApiResponse): Promise<WalletClient | null> {
  const delegateSeedPhrase = process.env.NEXT_PRIVATE_DELEGATE_SEED_PHRASE;

  if (delegateSeedPhrase) {
    const account = mnemonicToAccount(delegateSeedPhrase);
    return createWalletClient({
      account,
      chain: polygonMumbai,
      transport: http(),
    });
  } else {
    res.status(500).json('Delegate seed phrase is not set');
    return null;
  }
}
