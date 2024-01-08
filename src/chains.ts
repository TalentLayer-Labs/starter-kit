import { defineChain } from 'viem';
import { NetworkEnum } from './types';
import { Chain } from 'wagmi';
import { polygon, polygonMumbai } from 'viem/chains';

export const iexec = defineChain({
  id: 134,
  name: 'iExec Sidechain',
  network: 'iexec',
  nativeCurrency: {
    decimals: 18,
    name: 'xRLC',
    symbol: 'xRLC',
  },
  rpcUrls: {
    default: {
      http: ['https://bellecour.iex.ec'],
    },
    public: {
      http: ['https://bellecour.iex.ec'],
    },
  },
  blockExplorers: {
    default: { name: 'BlockScout', url: 'https://blockscout-bellecour.iex.ec/' },
  },
  testnet: false,
});

const viemFormattedChains: {
  [networkId in NetworkEnum]?: Chain;
} = {
  [NetworkEnum.MUMBAI]: polygonMumbai,
  [NetworkEnum.POLYGON]: polygon,
  [NetworkEnum.IEXEC]: iexec,
};

export const getDefaultViemFormattedChain = (): Chain =>
  viemFormattedChains[process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID as unknown as NetworkEnum] as Chain;

export const getViemFormattedChain = (networkId: NetworkEnum): Chain =>
  viemFormattedChains[networkId] || getDefaultViemFormattedChain();
