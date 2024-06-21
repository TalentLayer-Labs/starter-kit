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

const fuji: Config = {
  networkId: NetworkEnum.FUJI,
  subgraphUrl: 'https://api.studio.thegraph.com/query/41228/tl-graph-fuji/version/latest',
  contracts: {
    talentLayerId: '0x11BF027d41011a050c77E3BE7fB1942500C29928',
    serviceRegistry: '0x037a42146f7803Ac85Eeb201A8aab483E10c3E1A',
    talentLayerReview: '0x5b1e55ca26f8128155f35a0c5804e292B1b66bb7',
    talentLayerEscrow: '0x2D11f75E4af6626bA457532429D5FA6bF18ac011',
    talentLayerPlatformId: '0x5582d6493449a9c8aE353715eaE55794056dBF19',
    talentLayerArbitrator: '0x',
  },
  escrowConfig: {
    adminFee: '0',
    adminWallet: '0x754edfB906252B304f89c59c61f4368028bdcE6c',
    timeoutPayment: 3600 * 24 * 7,
  },
  tokens: {
    [ZERO_ADDRESS]: {
      address: ZERO_ADDRESS,
      symbol: 'AVAX',
      name: 'Avax',
      decimals: 18,
    },
    '0xAF82969ECF299c1f1Bb5e1D12dDAcc9027431160': {
      address: '0xAF82969ECF299c1f1Bb5e1D12dDAcc9027431160',
      symbol: 'USDC',
      name: 'USDC Stablecoin',
      decimals: 6,
    },
  },
};

const amoy: Config = {
  networkId: NetworkEnum.AMOY,
  subgraphUrl: 'https://api.studio.thegraph.com/query/41228/tl-graph-amoy/version/latest',
  contracts: {
    talentLayerId: '0xBe0d91F2371e23b9A26Fb8949E041A65dD0aDe83',
    serviceRegistry: '0x5394632Fe8044BF3c3eF6fBD30d1121d5d796542',
    talentLayerReview: '0x194D3a30Ad6274F169c78D64A538a8F472c47819',
    talentLayerEscrow: '0x466e65231DBe87b184c7cEeE8A319b4aB117915B',
    talentLayerPlatformId: '0xbE56916C64f80040d46Ea5B32E1e851cE752cD3f',
    talentLayerArbitrator: '0x0F39E0ffEaBE0C100768F16988F0c9405428E2D8',
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

const iexec: Config = {
  networkId: NetworkEnum.IEXEC,
  subgraphUrl: 'https://thegraph-sandbox.iex.ec/subgraphs/name/users/talentLayer',
  contracts: {
    talentLayerId: '0xC51537E03f56650C63A9Feca4cCb5a039c77c822',
    serviceRegistry: '0x45E8F869Fd316741A9316f39bF09AD03Df88496f',
    talentLayerReview: '0x6A5BF452108DA389B7B38284E871f538671Ad375',
    talentLayerEscrow: '0x7A534501a6e63448EBC691f27B27B76d4F9b7E17',
    talentLayerPlatformId: '0x05D8A2E01EB06c284ECBae607A2d0c2BE946Bf49',
    talentLayerArbitrator: '0x24cEd045b50cF811862B1c33dC6B1fbC8358F521',
  },
  escrowConfig: {
    adminFee: '0',
    adminWallet: '0x2E6f7222d4d7A71B05E7C35389d23C3dB400851f',
    timeoutPayment: 3600 * 24 * 7,
  },
  tokens: {
    ['0x0000000000000000000000000000000000000000']: {
      address: '0x0000000000000000000000000000000000000000',
      symbol: 'RLC',
      name: 'iExec RLC',
      decimals: 18,
    },
    '0xe62c28709e4f19bae592a716b891a9b76bf897e4': {
      address: '0xe62c28709e4f19bae592a716b891a9b76bf897e4',
      symbol: 'SERC20',
      name: 'SimpleERC20',
      decimals: 18,
    },
  },
};

const local: Config = {
  networkId: NetworkEnum.LOCAL,
  subgraphUrl: 'http://localhost:8020/',
  contracts: {
    talentLayerId: '0x3F87289e6Ec2D05C32d8A74CCfb30773fF549306',
    serviceRegistry: '0x27ED516dC1df64b4c1517A64aa2Bb72a434a5A6D',
    talentLayerReview: '0x050F59E1871d3B7ca97e6fb9DCE64b3818b14B18',
    talentLayerEscrow: '0x4bE920eC3e8552292B2147480111063E0dc36872',
    talentLayerPlatformId: '0xEFD8dbC421380Ee04BAdB69216a0FD97F64CbFD4',
    talentLayerArbitrator: '0xd6eCCD00F4F411CDf3DCc3009164d0C388b18fd1',
  },
  escrowConfig: {
    timeoutPayment: 3600 * 24 * 7,
  },
  tokens: {
    [ZERO_ADDRESS]: {
      address: ZERO_ADDRESS,
      symbol: 'ETH',
      name: 'ETH',
      decimals: 18,
    },
    '0xfF695df29837B571c4DAE01B5711500f6306E93f': {
      address: '0xfF695df29837B571c4DAE01B5711500f6306E93f',
      symbol: 'ERC20',
      name: 'Simple ERC20',
      decimals: 18,
    },
  },
};

const chains: { [networkId in NetworkEnum]: Config } = {
  [NetworkEnum.LOCAL]: local,
  [NetworkEnum.MUMBAI]: mumbai,
  [NetworkEnum.FUJI]: fuji,
  [NetworkEnum.IEXEC]: iexec,
  [NetworkEnum.AMOY]: amoy,
};

export const getConfig = (networkId: NetworkEnum) => chains[networkId];
