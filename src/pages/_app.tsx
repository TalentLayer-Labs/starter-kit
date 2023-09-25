import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { DefaultSeo } from 'next-seo';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Chain, WagmiConfig, configureChains, createConfig } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import SEO from '../../next-seo.config';
import { iexec } from '../chains';
import { TalentLayerProvider } from '../context/talentLayer';
import { XmtpContextProvider } from '../modules/Messaging/context/XmtpContext';
import { MessagingProvider } from '../modules/Messaging/context/messging';
import { Web3MailProvider } from '../modules/Web3mail/context/web3mail';
import '../styles/globals.css';
import Layout from './Layout';
import { NetworkEnum } from '../types';

export const chains: Chain[] = [polygonMumbai, iexec];
export const defaultChain: Chain | undefined = chains.find(
  chain => chain.id === parseInt(process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID as string),
);
const projectId = `${process.env.NEXT_PUBLIC_WALLECT_CONNECT_PROJECT_ID}`;

// Wagmi Client
const { publicClient } = configureChains(chains, [w3mProvider({ projectId })], {
  pollingInterval: 10_000,
});
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <WagmiConfig config={wagmiConfig}>
        <TalentLayerProvider>
          <Web3MailProvider>
            <XmtpContextProvider>
              <MessagingProvider>
                <ThemeProvider enableSystem={false}>
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </ThemeProvider>
              </MessagingProvider>
            </XmtpContextProvider>
            <ToastContainer position='bottom-right' />
          </Web3MailProvider>
        </TalentLayerProvider>
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

export default MyApp;
