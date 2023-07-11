import { ethers } from 'ethers';
import { IToken, NetworkEnum } from './types';

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
    talentLayerId: '0x11119eD887aeC1302e2cAF49942F891667A31BBc',
    serviceRegistry: '0xf0EECbBf164D81261C7Ce4D22D16f38DC63fBAbd',
    talentLayerReview: '0xCf7577fB4749fA9Ae38296D52C53C654F9A9367f',
    talentLayerEscrow: '0x34FCF4b0A418011682F6EdC86c49a0Faacc8A667',
    talentLayerPlatformId: '0x08FB56537F118Cf35C4d3eB280444737f6D1bE46',
  },
  escrowConfig: {
    adminFee: '0',
    adminWallet: '0xC01FcDfDE3B2ABA1eab76731493C617FfAED2F10',
    timeoutPayment: 3600 * 24 * 7,
  },
  tokens: {
    [ethers.constants.AddressZero]: {
      address: ethers.constants.AddressZero,
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

const local: Config = {
  networkId: NetworkEnum.LOCAL,
  subgraphUrl: 'http://localhost:8020/',
  contracts: {
    talentLayerId: '0x2475F87a2A73548b2E49351018E7f6a53D3d35A4',
    serviceRegistry: '0x3dE39C61d4281716c458ffdb3150aa9aF4fb752a',
    talentLayerReview: '0xa3A183D6f70217362050040Ef365923a0c1989e8',
    talentLayerEscrow: '0x91327C01CB952a95addDa72FcA59E4151fE42Cb3',
    talentLayerPlatformId: '0xF39e4249b6dCcca8Ec7455E524C9685d1332fCD1',
  },
  escrowConfig: {
    timeoutPayment: 3600 * 24 * 7,
  },
  tokens: {
    [ethers.constants.AddressZero]: {
      address: ethers.constants.AddressZero,
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
};

export const getConfig = (networkId: NetworkEnum) => chains[networkId];
