"use client";

import { LOCAL_STORAGE_KEYS } from "@lit-protocol/constants";
import { AuthSig } from "@lit-protocol/types";
import { GetWalletClientResult } from "@wagmi/core";
import { SiweMessage } from "lit-siwe";
import * as nacl from "tweetnacl";
import * as naclUtil from "tweetnacl-util";
import { verifyMessage } from "viem";

// This document is not mandatory to use Lit but add nice features :
// - custom implementation of the SignMessage using wagmi and siwe
// - adds custom logging
// - adds local storage to store signature and handle sgx

interface SignedMessage {
  signature: string;
  address: string;
}

function log(...m: string[]) {
  console.log(m);
}

interface signAndSaveAuthParams {
  web3: GetWalletClientResult;
  resources?: any;
  expiration: string;
  uri?: string;
}

interface SignMessageParams {
  message: string;
  web3: GetWalletClientResult;
  account: `0x${string}`;
}

export const signMessage = async ({
  message,
  web3,
  account,
}: SignMessageParams): Promise<SignedMessage> => {
  // -- validate
  if (!web3 || !account) return { signature: "", address: "" };

  log("pausing...");
  await new Promise((resolve: any) => setTimeout(resolve, 500));
  log("signing with ", account);

  const signature = await web3.signMessage({ message, account });

  log("Signature: ", signature);
  const isSignValid = await verifyMessage({ address: account, message, signature });

  if (!isSignValid) {
    const msg = `ruh roh, the user signed with a different address then they\'re using with web3 (${account}).  this will lead to confusion.`;
    log(msg);
    alert(
      "something seems to be wrong with your wallets message signing.  maybe restart your browser or your wallet.  your recovered sig address does not match your web3 account address",
    );
    throw new Error(msg);
  }
  return { signature, address: account };
};

export const signAndSaveAuthMessage = async ({
  web3,
  resources,
  expiration,
  uri,
}: signAndSaveAuthParams): Promise<AuthSig> => {
  // check if it's nodejs
  // -- 1. prepare 'sign-in with ethereum' message

  const account = web3?.account.address as `0x${string}`;

  const preparedMessage: Partial<SiweMessage> = {
    domain: globalThis.location.host,
    address: account, // convert to EIP-55 format or else SIWE complains
    version: "1",
    chainId: await web3?.getChainId(),
    expirationTime: expiration,
  };

  if (resources && resources.length > 0) {
    preparedMessage.resources = resources;
  }

  if (uri) {
    preparedMessage.uri = uri;
  } else {
    preparedMessage.uri = globalThis.location.href;
  }

  const message: SiweMessage = new SiweMessage(preparedMessage);
  const body: string = message.prepareMessage();

  // -- 2. sign the message
  let signedResult: SignedMessage = await signMessage({
    message: body,
    web3,
    account,
  });

  // -- 3. prepare auth message
  let authSig: AuthSig = {
    sig: signedResult.signature,
    derivedVia: "web3.eth.personal.sign",
    signedMessage: body,
    address: signedResult.address,
  };

  // -- 4. store auth and a keypair in localstorage for communication with sgx

  localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_SIGNATURE, JSON.stringify(authSig));
  const commsKeyPair = nacl.box.keyPair();

  localStorage.setItem(
    LOCAL_STORAGE_KEYS.KEY_PAIR,
    JSON.stringify({
      publicKey: naclUtil.encodeBase64(commsKeyPair.publicKey),
      secretKey: naclUtil.encodeBase64(commsKeyPair.secretKey),
    }),
  );

  log(`generated and saved ${LOCAL_STORAGE_KEYS.KEY_PAIR}`);
  return authSig;
};
