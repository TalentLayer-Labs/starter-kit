import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';
import { Chain, WagmiConfig } from 'wagmi';
import { iexec } from '../chains';
import { NetworkEnum } from '../types';
import { polygon, polygonMumbai } from 'viem/chains';

// 1. Get projectId
const projectId = process.env.NEXT_PUBLIC_WALLECT_CONNECT_PROJECT_ID as string;

// 2. Create wagmiConfig
const metadata = {
  name: 'BuilderPlace',
  description: 'grow your open-source movement today',
  url: 'https://builder.place',
  icons: ['https://builder.place/logo192.png'],
};

export let chains: Chain[] = [];
if ((process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID as unknown as NetworkEnum) == NetworkEnum.MUMBAI) {
  chains.push(polygonMumbai);
} else if (
  (process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID as unknown as NetworkEnum) == NetworkEnum.POLYGON
) {
  chains.push(polygon);
}

if (process.env.NEXT_PUBLIC_ACTIVATE_WEB3MAIL == 'true') {
  chains.push(iexec);
}

export const defaultChain: Chain | undefined = chains.find(
  chain => chain.id === parseInt(process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID as string),
);

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains });

export function Web3Modal({ children }: { children: React.ReactNode }) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}
