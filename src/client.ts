import { createWalletClient, createPublicClient, custom, http } from 'viem';
import { polygonMumbai } from './chains';

// Viem Client
export const ConnectPublicClient = () => {
  const publicClient = createPublicClient({
    chain: polygonMumbai,
    transport: http(process.env.NEXT_PUBLIC_BACKEND_RPC_URL),
  });

  return publicClient;
};

export const ConnectWalletClient = () => {
  const walletClient = createWalletClient({
    chain: polygonMumbai,
    transport: custom(window.ethereum),
  });

  return walletClient;
};
