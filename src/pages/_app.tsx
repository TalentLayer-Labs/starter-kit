import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { WagmiConfig } from 'wagmi';
import CustomPalette from '../components/CustomPalette';
import { TalentLayerProvider } from '../context/talentLayer';
import { Web3Modal } from '../context/web3modal';
import { BuilderPlaceProvider } from '../modules/BuilderPlace/context/BuilderPlaceContext';
import { getSeoDefaultConfig } from '../modules/BuilderPlace/seo';
import { XmtpContextProvider } from '../modules/Messaging/context/XmtpContext';
import { MessagingProvider } from '../modules/Messaging/context/messging';
import '../styles/globals.css';
import Layout from './Layout';

// react-query client
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  console.log('MyApp', { pageProps });
  return (
    <>
      <CustomPalette builderPlace={pageProps.builderPlace} />
      <QueryClientProvider client={queryClient}>
        <DefaultSeo {...getSeoDefaultConfig(pageProps.builderPlace)} />
        <Web3Modal>
          <TalentLayerProvider>
            <BuilderPlaceProvider data={pageProps.builderPlace}>
              <XmtpContextProvider>
                <MessagingProvider>
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </MessagingProvider>
              </XmtpContextProvider>
              <ToastContainer position='bottom-right' />
            </BuilderPlaceProvider>
          </TalentLayerProvider>
        </Web3Modal>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
