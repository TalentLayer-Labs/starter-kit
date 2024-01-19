import { NextApiResponse } from 'next';
import { getUserByAddress } from '../../../queries/users';
import { mnemonicToAccount } from 'viem/accounts';
import { createPublicClient, createWalletClient, http, PublicClient } from 'viem';
import { getViemFormattedChain } from '../../../chains';
import { WalletClient } from 'wagmi';
import { NetworkEnum } from '../../../types';

export async function isPlatformAllowedToDelegate(
  chainId: number,
  userAddress: string,
  res: NextApiResponse,
): Promise<boolean> {
  const getUser = await getUserByAddress(chainId, userAddress);
  const delegateAddresses: string[] = getUser.data?.data?.users[0]?.delegates.map((delegate: any) =>
    delegate.address.toLowerCase(),
  );

  if (
    process.env.NEXT_PUBLIC_DELEGATE_ADDRESS &&
    delegateAddresses.indexOf(process.env.NEXT_PUBLIC_DELEGATE_ADDRESS.toLowerCase()) === -1
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
      chain: getViemFormattedChain(
        process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID as unknown as NetworkEnum,
      ),
      transport: http(),
    });
  } else {
    res.status(500).json('Delegate seed phrase is not set');
    return null;
  }
}

export function getPublicClient(): PublicClient {
  return createPublicClient({
    chain: getViemFormattedChain(
      process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID as unknown as NetworkEnum,
    ),
    transport: http(),
  });
}
