import { IToken, NetworkEnum } from './types';
import { ZERO_ADDRESS } from './utils/constant';

export type Config = {
  networkId: NetworkEnum;
  subgraphUrl: string;
  escrowConfig: { [key: string]: any };
  contracts: { [key: string]: `0x${string}` };
  tokens: { [key: string]: IToken };
};

export const maxDecimals = {
  ETH: 2,
};

export const FEE_RATE_DIVIDER = 10_000;

const mumbai: Config = {
  networkId: NetworkEnum.MUMBAI,
  subgraphUrl: 'https://api.thegraph.com/subgraphs/name/talentlayer/talent-layer-mumbai',
  contracts: {
    talentLayerId: '0x3F87289e6Ec2D05C32d8A74CCfb30773fF549306',
    serviceRegistry: '0x27ED516dC1df64b4c1517A64aa2Bb72a434a5A6D',
    talentLayerReview: '0x050F59E1871d3B7ca97e6fb9DCE64b3818b14B18',
    talentLayerEscrow: '0x4bE920eC3e8552292B2147480111063E0dc36872',
    talentLayerPlatformId: '0xEFD8dbC421380Ee04BAdB69216a0FD97F64CbFD4',
    talentLayerArbitrator: '0x2CA01a0058cfB3cc4755a7773881ea88eCfBba7C',
  },
  escrowConfig: {
    adminFee: '0',
    adminWallet: '0xC01FcDfDE3B2ABA1eab76731493C617FfAED2F10',
    timeoutPayment: 3600 * 24 * 7,
  },
  tokens: {
    [ZERO_ADDRESS]: {
      address: ZERO_ADDRESS,
      symbol: 'MATIC',
      name: 'Matic',
      decimals: 18,
    },
    '0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747': {
      address: '0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747',
      symbol: 'USDC',
      name: 'USDC Stablecoin',
      decimals: 6,
    },
  },
};

const polygon: Config = {
  networkId: NetworkEnum.POLYGON,
  subgraphUrl: 'https://api.thegraph.com/subgraphs/name/talentlayer/talentlayer-polygon',
  contracts: {
    talentLayerId: '0xD7D1B2b0A665F03618cb9a45Aa3070f789cb91f2',
    serviceRegistry: '0xae8Bba1a403816568230d92099ccB87f41BbcA78',
    talentLayerReview: '0x7bBC20c8Fcb75A126810161DFB1511f6D3B1f2bE',
    talentLayerEscrow: '0x21C716673897f4a2A3c12053f3973F51Ce7b0cf6',
    talentLayerPlatformId: '0x09FF07297d48eD9aD870caCE4b33BF30869C1D17',
    talentLayerArbitrator: '0x4502E695A747F1b382a16D6C8AE3FD94DA78e7a0',
  },
  escrowConfig: {
    adminFee: '0',
    adminWallet: '0xC01FcDfDE3B2ABA1eab76731493C617FfAED2F10',
    timeoutPayment: 3600 * 24 * 7,
  },
  tokens: {
    [ZERO_ADDRESS]: {
      address: ZERO_ADDRESS,
      symbol: 'MATIC',
      name: 'Matic',
      decimals: 18,
    },
    '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174': {
      address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
      symbol: 'USDC',
      name: 'USDC Stablecoin',
      decimals: 6,
    },
    '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619': {
      address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
      symbol: 'WETH',
      name: 'WETH',
      decimals: 18,
    },
  },
};

const chains: { [networkId in NetworkEnum]?: Config } = {
  [NetworkEnum.MUMBAI]: mumbai,
  [NetworkEnum.POLYGON]: polygon,
};
export const getDefaultConfig = (): Config =>
  chains[process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID as unknown as NetworkEnum] as Config;

export const getConfig = (networkId: NetworkEnum): Config =>
  chains[networkId] || getDefaultConfig();
