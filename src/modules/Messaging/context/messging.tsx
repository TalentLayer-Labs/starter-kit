"use client"

import { useRouter } from 'next/navigation';
import { createContext, ReactNode, useContext, useMemo } from 'react';
import { getAddress } from 'viem';
import { useWalletClient } from 'wagmi';
import { useChainId } from '../../../hooks/useChainId';
import { XmtpContext } from './XmtpContext';
import { useTalentLayer } from '@talentlayer/react/dist';

const MessagingContext = createContext<{
  userExists: () => boolean;
  handleRegisterToMessaging: () => Promise<void>;
  handleMessageUser: (userAddress: string) => Promise<void>;
}>({
  userExists: () => false,
  handleRegisterToMessaging: () => Promise.resolve(),
  handleMessageUser: (userAddress: string) => Promise.resolve(),
});

const MessagingProvider = ({ children }: { children: ReactNode }) => {
  const chainId = useChainId();
  const { user } = useTalentLayer()
  const { providerState } = useContext(XmtpContext);
  const { data: walletClient } = useWalletClient({
    chainId,
  });
  const router = useRouter();

  const userExists = (): boolean => {
    return providerState ? providerState.userExists : false;
  };

  const handleRegisterToMessaging = async (): Promise<void> => {
    try {
      if (user?.address && providerState?.initClient && walletClient) {
        await providerState.initClient();
      }
    } catch (e) {
      console.error('Error initializing XMTP client :', e);
    }
  };

  const handleMessageUser = async (userAddress: string): Promise<void> => {
    if (walletClient && providerState) {
      //If initClient() is in the context, then we can assume that the user has not already logged in
      if (providerState.initClient) {
        try {
          await providerState.initClient();
        } catch (e) {
          console.error('ServiceDetail - Error initializing XMTP client: ', e);
          return;
        }
      }
      const buyerAddress = getAddress(userAddress);
      router.push(`/dashboard/messaging/${buyerAddress}`);
    }
  };

  const value = useMemo(() => {
    return {
      userExists,
      handleRegisterToMessaging,
      handleMessageUser,
    };
  }, [userExists, handleRegisterToMessaging, handleMessageUser]);

  return <MessagingContext.Provider value={value}>{children}</MessagingContext.Provider>;
};

export { MessagingProvider };

export default MessagingContext;
