import { useNetwork } from 'wagmi';

export const useChainId = (): number => {
  const { chain, chains } = useNetwork();
  const chainId =
    chain?.id || chains[0]?.id || (process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID as unknown as number);
  return chainId;
};
