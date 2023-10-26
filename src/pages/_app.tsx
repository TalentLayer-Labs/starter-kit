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
      <Head>
        <style>
          {`
          :root {
            --primary: ${pageProps.builderPlace?.pallete.primary};
            --primary-focus: ${pageProps.builderPlace?.pallete.primaryFocus};
            --primary-content: ${pageProps.builderPlace?.pallete.primaryContent};

            --base-100: ${pageProps.builderPlace?.pallete.base100};
            --base-200: ${pageProps.builderPlace?.pallete.base200};
            --base-300: ${pageProps.builderPlace?.pallete.base300};
            --base-content: ${pageProps.builderPlace?.pallete.baseContent};

            --info: ${pageProps.builderPlace?.pallete.info};
            --info-content: ${pageProps.builderPlace?.pallete.infoContent};

            --success: ${pageProps.builderPlace?.pallete.success};
            --success-content: ${pageProps.builderPlace?.pallete.successContent};

            --warning: ${pageProps.builderPlace?.pallete.warning};
            --warning-content: ${pageProps.builderPlace?.pallete.warningContent};

            --error: ${pageProps.builderPlace?.pallete.error};
            --error-content: ${pageProps.builderPlace?.pallete.errorContent};
          }

          .bg-primary {
            background-color: var(--primary);
          }

          .text-primary {
            color: var(--primary-content);
          }

          .text-primary-focus {
            color: var(--primary-focus);
          }

          .bg-base-100 {
            background-color: var(--base-100);
          }

          .bg-base-200 {
            background-color: var(--base-200);
          }

          .bg-base-300 {
            background-color: var(--base-300);
          }

          .text-base {
            color: var(--base-content);
          }

          .bg-info {
            background-color: var(--info);
          }

          .text-info {
            color: var(--info-content);
          }

          .bg-success {
            background-color: var(--success);
          }

          .text-success {
            color: var(--success-content);
          }

          .bg-warning {
            background-color: var(--warning);
          }

          .text-warning {
            color: var(--warning-content);
          }

          .bg-error {
            background-color: var(--error);
          }

          .text-error {
            color: var(--error-content);
          }
        `}
        </style>
      </Head>
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
