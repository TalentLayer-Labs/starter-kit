import { Signer, ethers } from 'ethers';
import * as lit from '@lit-protocol/lit-node-client';
import { SiweMessage } from 'siwe';

interface AuthSig {
  sig: string;
  derivedVia: string;
  signedMessage: string;
  address: string;
}

export function getAccessControlCondition(
  encryptorAddress: string,
  dataHash: string,
  chain: string,
  whitelistContractAddress: string,
) {
  const accessControlConditions = [
    {
      conditionType: 'evmContract',
      contractAddress: whitelistContractAddress,
      functionName: 'isWhitelisted',
      functionParams: [encryptorAddress, dataHash, ':userAddress'],
      functionAbi: {
        inputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
          {
            internalType: 'bytes32',
            name: '',
            type: 'bytes32',
          },
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        name: 'isWhitelisted',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      chain,
      returnValueTest: {
        key: '',
        comparator: '==',
        value: 'true',
      },
    },
  ];

  return accessControlConditions;
}

export async function encryptData(
  accessControlConditions: any,
  chain: string,
  node: lit.LitNodeClient,
  signer: Signer,
  data: string,
  authSig: AuthSig,
): Promise<{ encryptedKey: string; encryptedString: Blob }> {
  const { encryptedString, symmetricKey } = await lit.encryptString(data);

  const encryptedSymmetricKey = await node.saveEncryptionKey({
    accessControlConditions,
    symmetricKey,
    authSig,
    chain,
    permanent: false,
  });
  return { encryptedKey: lit.uint8arrayToString(encryptedSymmetricKey, 'base16'), encryptedString };
}

export async function getSymmetricKey(
  accessControlConditions: any,
  authSig: AuthSig,
  chain: string,
  node: lit.LitNodeClient,
  encryptedSymmetricKey: string,
) {
  const symmetricKey = await node.getEncryptionKey({
    accessControlConditions,
    toDecrypt: encryptedSymmetricKey,
    chain,
    authSig,
  });
  return symmetricKey;
}

export async function decryptData(encryptedString: Blob, symmetricKey: string) {
  return await lit.decryptString(encryptedString, lit.uint8arrayFromString(symmetricKey));
}

export async function getAuthSig(signer: Signer) {
  const domain = 'localhost';
  const origin = 'https://localhost/login';
  const statement = 'This is a test statement.  You can put anything you want here.';

  const siweMessage = new SiweMessage({
    domain,
    address: await signer.getAddress(),
    statement,
    uri: origin,
    version: '1',
    chainId: 1,
  });

  const messageToSign = siweMessage.prepareMessage();

  const signature = await signer.signMessage(messageToSign);

  console.log('signature', signature);

  const recoveredAddress = ethers.utils.verifyMessage(messageToSign, signature);

  const authSig = {
    sig: signature,
    derivedVia: 'web3.eth.personal.sign',
    signedMessage: messageToSign,
    address: recoveredAddress,
  };
  return authSig;
}
