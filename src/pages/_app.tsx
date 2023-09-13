import { EthereumClient, modalConnectors } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { DefaultSeo } from 'next-seo';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Chain, WagmiConfig, createConfig } from 'wagmi';
import { publicClient } from '../client';
import SEO from '../../next-seo.config';
import { polygonMumbai } from '../chains';
import { StarterKitProvider } from '../context/starterKit';
import { XmtpContextProvider } from '../modules/Messaging/context/XmtpContext';
import { MessagingProvider } from '../modules/Messaging/context/messging';
import '../styles/globals.css';
import Layout from './Layout';

const chains: Chain[] = [polygonMumbai];

// Wagmi client

const wagmiConfig = createConfig({
  autoConnect: false,
  connectors: modalConnectors({ appName: 'web3Modal', chains }),
  publicClient,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiConfig, chains);

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    wagmiConfig.autoConnect();
  }, []);

  return (
    <>
      <DefaultSeo {...SEO} />
      <ToastContainer position='bottom-right' />
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
        </StarterKitProvider>
        <Web3Modal
          projectId={`${process.env.NEXT_PUBLIC_WALLECT_CONNECT_PROJECT_ID}`}
          ethereumClient={ethereumClient}
          accentColor='blackWhite'
        />
      </WagmiConfig>
    </>
  );
}

export default MyApp;
