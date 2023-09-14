import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { DefaultSeo } from 'next-seo';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Chain, WagmiConfig, configureChains, createConfig } from 'wagmi';
import SEO from '../../next-seo.config';
import { StarterKitProvider } from '../context/starterKit';
import { XmtpContextProvider } from '../modules/Messaging/context/XmtpContext';
import { MessagingProvider } from '../modules/Messaging/context/messging';
import '../styles/globals.css';
import Layout from './Layout';
import { useEffect } from 'react';
import { polygonMumbai } from 'wagmi/chains';

const chains: Chain[] = [polygonMumbai];
const projectId = `${process.env.NEXT_PUBLIC_WALLECT_CONNECT_PROJECT_ID}`;

// Wagmi Client
const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
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
        <StarterKitProvider>
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
        </StarterKitProvider>
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      </WagmiConfig>
    </>
  );
}

export default MyApp;
