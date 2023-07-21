import type {
  Attestation,
  AttestationResult,
  EASChainConfig,
  EnsNamesResult,
  MyAttestationResult,
} from './eas-types';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ethers } from 'ethers';
import axios from 'axios';

export const alchemyApiKey = process.env.REACT_APP_ALCHEMY_API_KEY;

export const CUSTOM_SCHEMAS = {
  GITHUB_SCHEMA: '0x04e786c276457b4045eca31a80dababf3a3288ed250ff3ab4bf54aec6b3ce709',
  CONFIRM_SCHEMA: '0xb96446c85ce538c1641a967f23ea11bbb4a390ef745fc5a9905689dbd48bac86',
};

dayjs.extend(duration);
dayjs.extend(relativeTime);

function getChainId() {
  return Number(process.env.NEXT_SEPOLIA_CHAIN_ID);
}

export const CHAINID = getChainId();

if (!CHAINID) {
  throw new Error('No chain ID env found');
}

export const EAS_CHAIN_CONFIGS: EASChainConfig[] = [
  {
    chainId: 11155111,
    chainName: 'sepolia',
    subdomain: 'sepolia.',
    version: '0.26',
    contractAddress: '0xC2679fBD37d54388Ce493F1DB75320D236e1815e',
    schemaRegistryAddress: '0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0',
    etherscanURL: 'https://sepolia.etherscan.io',
    contractStartBlock: 2958570,
    rpcProvider: `https://sepolia.infura.io/v3/`,
  },
];

export const activeChainConfig = EAS_CHAIN_CONFIGS.find(config => config.chainId === CHAINID);

export const baseURL = `https://${activeChainConfig!.subdomain}easscan.org`;

if (!activeChainConfig) {
  throw new Error('No active chain config found');
}

export const EASContractAddress = activeChainConfig.contractAddress;

export const EASVersion = activeChainConfig.version;

export const EAS_CONFIG = {
  address: EASContractAddress,
  version: EASVersion,
  chainId: CHAINID,
};

export const timeFormatString = 'MM/DD/YYYY h:mm:ss a';
export async function getAddressForENS(name: string) {
  const provider = new ethers.providers.StaticJsonRpcProvider(
    `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_INFURA_ID}`,
    'mainnet',
  );

  return await provider.resolveName(name);
}
export async function getENSName(address: string) {
  const provider = new ethers.providers.StaticJsonRpcProvider(
    `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_INFURA_ID}`,
    'mainnet',
  );
  return await provider.lookupAddress(address);
}
export async function getAttestation(uid: string): Promise<Attestation | null> {
  const response = await axios.post<AttestationResult>(
    `${baseURL}/graphql`,
    {
      query:
        'query Query($where: AttestationWhereUniqueInput!) {\n  attestation(where: $where) {\n    id\n    attester\n    recipient\n    revocationTime\n    expirationTime\n    time\n    txid\n    data\n  }\n}',
      variables: {
        where: {
          id: uid,
        },
      },
    },
    {
      headers: {
        'content-type': 'application/json',
      },
    },
  );
  return response.data.data.attestation;
}
export async function getAttestationsForAddress(address: string) {
  const response = await axios.post<MyAttestationResult>(
    `${baseURL}/graphql`,
    {
      query:
        'query Attestations($where: AttestationWhereInput, $orderBy: [AttestationOrderByWithRelationInput!]) {\n  attestations(where: $where, orderBy: $orderBy) {\n    attester\n    revocationTime\n    expirationTime\n    time\n    recipient\n    id\n    data\n  }\n}',

      variables: {
        where: {
          schemaId: {
            equals: CUSTOM_SCHEMAS.GITHUB_SCHEMA,
          },
          OR: [
            {
              attester: {
                equals: address,
              },
            },
            {
              recipient: {
                equals: address,
              },
            },
          ],
        },
        orderBy: [
          {
            time: 'desc',
          },
        ],
      },
    },
    {
      headers: {
        'content-type': 'application/json',
      },
    },
  );
  return response.data.data.attestations;
}
export async function getConfirmationAttestationsForUIDs(refUids: string[]) {
  const response = await axios.post<MyAttestationResult>(
    `${baseURL}/graphql`,
    {
      query:
        'query Attestations($where: AttestationWhereInput, $orderBy: [AttestationOrderByWithRelationInput!]) {\n  attestations(where: $where, orderBy: $orderBy) {\n    attester\n    revocationTime\n    expirationTime\n    time\n    recipient\n    id\n    data\n  refUID\n  }\n}',

      variables: {
        where: {
          schemaId: {
            equals: CUSTOM_SCHEMAS.CONFIRM_SCHEMA,
          },
          refUID: {
            in: refUids,
          },
        },
        orderBy: [
          {
            time: 'desc',
          },
        ],
      },
    },
    {
      headers: {
        'content-type': 'application/json',
      },
    },
  );
  return response.data.data.attestations;
}
export async function getENSNames(addresses: string[]) {
  const response = await axios.post<EnsNamesResult>(
    `${baseURL}/graphql`,
    {
      query:
        'query Query($where: EnsNameWhereInput) {\n  ensNames(where: $where) {\n    id\n    name\n  }\n}',
      variables: {
        where: {
          id: {
            in: addresses,
            mode: 'insensitive',
          },
        },
      },
    },
    {
      headers: {
        'content-type': 'application/json',
      },
    },
  );
  return response.data.data.ensNames;
}
