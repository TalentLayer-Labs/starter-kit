'use client';

import { DefaultSeo } from 'next-seo';
import { WagmiConfig, configureChains, createConfig, useAccount, useChainId, Chain } from 'wagmi';
import { TalentLayerProvider } from '@talentlayer/react/dist';
import { Web3MailProvider } from '../modules/Web3mail/context/web3mail';
import { XmtpContextProvider } from '../modules/Messaging/context/XmtpContext';
import { MessagingProvider } from '../modules/Messaging/context/messging';
import { ThemeProvider } from 'next-themes';
// import Layout from './layout';
import { Web3Modal } from '@web3modal/react';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import SEO from '../../next-seo.config';
import { ToastContainer } from 'react-toastify';

import React from 'react';
import { iexec, polygonMumbai } from '../chains';
import { NetworkEnum } from '../types';

const projectId = `${process.env.NEXT_PUBLIC_WALLECT_CONNECT_PROJECT_ID}`;

export const chains: Chain[] = [polygonMumbai, iexec];
export const defaultChain: Chain | undefined = chains.find(
  chain => chain.id === parseInt(process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID as string),
);

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

export default function Providers(props: { children: JSX.Element }) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <WagmiConfig config={wagmiConfig}>
        <Web3MailProvider>
          <XmtpContextProvider>
            <MessagingProvider>
              <ThemeProvider enableSystem={false}>
                <TLWrapper>{props.children}</TLWrapper>
              </ThemeProvider>
            </MessagingProvider>
          </XmtpContextProvider>
          <ToastContainer position='bottom-right' />
        </Web3MailProvider>
        <Web3Modal
          projectId={projectId}
          ethereumClient={ethereumClient}
          defaultChain={defaultChain}
          chainImages={{ [NetworkEnum.IEXEC]: `/images/blockchain/${[NetworkEnum.IEXEC]}.png` }}
        />
      </WagmiConfig>
    </>
  );
}

function TLWrapper(props: { children: JSX.Element }) {
  const chainId = useChainId();
  const account: any = useAccount();

  return (
    <TalentLayerProvider
      config={{
        account,
        chainId,
        ipfsConfig: {
          clientId: process.env.NEXT_PUBLIC_INFURA_ID as string,
          clientSecret: process.env.NEXT_PUBLIC_INFURA_SECRET as string,
          baseUrl: process.env.NEXT_PUBLIC_IPFS_WRITE_URL as string,
        },
        platformId: parseInt(process.env.NEXT_PUBLIC_PLATFORM_ID as string),
        signatureApiUrl: process.env.NEXT_PUBLIC_SIGNATURE_API_URL as string,
      }}>
      {props.children}
    </TalentLayerProvider>
  );
}
