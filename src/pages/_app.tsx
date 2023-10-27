import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { DefaultSeo } from 'next-seo';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Chain, WagmiConfig, configureChains, createConfig } from 'wagmi';
import { polygon, polygonMumbai } from 'wagmi/chains';
import { iexec } from '../chains';
import { TalentLayerProvider } from '../context/talentLayer';
import { BuilderPlaceProvider } from '../modules/BuilderPlace/context/BuilderPlaceContext';
import { getSeoDefaultConfig } from '../modules/BuilderPlace/seo';
import { XmtpContextProvider } from '../modules/Messaging/context/XmtpContext';
import { MessagingProvider } from '../modules/Messaging/context/messging';
import '../styles/globals.css';
import { NetworkEnum } from '../types';
import Layout from './Layout';
import CustomPallete from '../components/CustomPallete';

export let chains: Chain[] = [];
if ((process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID as unknown as NetworkEnum) == NetworkEnum.MUMBAI) {
  chains.push(polygonMumbai);
} else if (
  (process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID as unknown as NetworkEnum) == NetworkEnum.POLYGON
) {
  chains.push(polygon);
}

if (process.env.NEXT_PUBLIC_ACTIVE_WEB3MAIL == 'true') {
  chains.push(iexec);
}

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

// react-query client
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  console.log('MyApp', { pageProps });
  return (
    <>
      <CustomPallete builderPlace={pageProps.builderPlace} />
      <QueryClientProvider client={queryClient}>
        <DefaultSeo {...getSeoDefaultConfig(pageProps.builderPlace)} />
        <WagmiConfig config={wagmiConfig}>
          <TalentLayerProvider>
            <BuilderPlaceProvider data={pageProps.builderPlace}>
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
            </BuilderPlaceProvider>
          </TalentLayerProvider>
          <Web3Modal
            projectId={projectId}
            ethereumClient={ethereumClient}
            defaultChain={defaultChain}
            chainImages={{ [NetworkEnum.IEXEC]: `/images/blockchain/${[NetworkEnum.IEXEC]}.png` }}
          />
        </WagmiConfig>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
