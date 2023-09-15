import { createWalletClient, createPublicClient, custom, http } from 'viem';
import { polygonMumbai } from './chains';
import 'wagmi/window';


// Viem Client
export const ConnectPublicClient = () => {
  const publicClient = createPublicClient({
    chain: polygonMumbai,
    transport: http(process.env.NEXT_PUBLIC_BACKEND_RPC_URL),
  });

  return publicClient;
};

export const ConnectWalletClient = () => {
  if (window.ethereum) {
    const walletClient = createWalletClient({
      chain: polygonMumbai,
      transport: custom(window.ethereum),
    });

  return walletClient;
  } else {
    console.error("(window.ethereum) is not available.");
    return null;
  }
};
