import { chain } from 'wagmi';

export const customChains = {
  ...chain,
  polygonMumbai: {
    ...chain.polygonMumbai,
    rpcUrls: {
      default: 'https://rpc.mumbai.polygon.gateway.fm/',
    },
  },
  iexec: {
    id: 134,
    name: 'iExec Sidechain',
    network: 'iexec',
    nativeCurrency: {
      decimals: 18,
      name: 'xRLC',
      symbol: 'xRLC',
    },
    rpcUrls: {
      default: 'https://bellecour.iex.ec',
    },
    blockExplorers: {
      default: { name: 'BlockScout', url: 'https://blockscout-bellecour.iex.ec/' },
    },
    testnet: false,
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
