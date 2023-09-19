import { useChainId, useWalletClient } from 'wagmi';
import { ZERO_ADDRESS } from '../utils/constant';

/*
 * copy from: https://github.com/lensterxyz/lenster/blob/0dbd6b297138ff70ed2b0f55244b2ca8177c1d0e/apps/web/src/components/utils/hooks/useEthersWalletClient.tsx#L14C19-L14C19
 $ TEMP fix for dependencies who don't support view walletClient
 */
export const useEthersWalletClient = (): {
  data: {
    getAddress: () => Promise<`0x${string}`>;
    signMessage: (message: string) => Promise<string>;
  };
  isLoading: boolean;
} => {
  const chainId = useChainId();
  const { data, isLoading } = useWalletClient({ chainId });

  const ethersWalletClient = {
    getAddress: async (): Promise<`0x${string}`> => {
      return (await data?.account.address) ?? ZERO_ADDRESS;
    },
    signMessage: async (message: string): Promise<string> => {
      const signature = await data?.signMessage({ message });
      return signature ?? '';
    },
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { signMessage, ...rest } = data ?? {};

  const mergedWalletClient = {
    data: {
      ...ethersWalletClient,
      ...{ ...rest },
    },
  };

  return { data: mergedWalletClient.data, isLoading };
};
