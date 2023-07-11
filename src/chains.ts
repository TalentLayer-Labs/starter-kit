import { chain } from 'wagmi';

export const customChains = {
  ...chain,
  polygonMumbai: {
    ...chain.polygonMumbai,
    rpcUrls: {
      default: 'https://rpc.mumbai.polygon.gateway.fm/',
    },
  },
  local: {
    id: 1337,
    name: 'localhost',
    network: 'localhost',
    nativeCurrency: {
      decimals: 18,
      name: 'Ethereum',
      symbol: 'ETH',
    },
    rpcUrls: {
      default: 'https://api.avax-test.network/ext/C/rpc',
    },
    blockExplorers: {
      default: { name: 'testnet.snowTrace', url: 'https://testnet.snowtrace.io/' },
    },
    testnet: true,
  },
};
