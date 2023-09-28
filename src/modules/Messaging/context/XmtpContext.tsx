import { Client, Conversation, DecodedMessage } from '@xmtp/xmtp-js';
import React, { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { useChainId } from '../../../hooks/useChainId';
import { useEthersWalletClient } from '../../../hooks/useEthersWalletClient';
import { loadKeys, storeKeys } from '../utils/keys';
import { buildChatMessage, CONVERSATION_PREFIX } from '../utils/messaging';
import { XmtpChatMessage } from '../utils/types';
import { log } from '../../../utils/log';

type clientEnv = 'local' | 'dev' | 'production' | undefined;

interface IProviderProps {
  client: Client | undefined;
  initClient: (() => Promise<void>) | undefined;
  loadingConversations: boolean;
  loadingMessages: boolean;
  conversations: Map<string, Conversation>;
  conversationMessages: Map<string, XmtpChatMessage[]>;
  userExists: boolean;
  disconnect: (() => void) | undefined;
}

export const XmtpContext = createContext<{
  providerState?: IProviderProps;
  setProviderState?: React.Dispatch<React.SetStateAction<IProviderProps>>;
}>({
  providerState: undefined,
  setProviderState: undefined,
});

export const XmtpContextProvider = ({ children }: { children: ReactNode }) => {
  const chainId = useChainId();
  const { data: walletClient } = useWalletClient({
    chainId,
  });
  const { address: walletAddress } = useAccount();
  const { data: ethersWalletClient } = useEthersWalletClient();

  const [providerState, setProviderState] = useState<IProviderProps>({
    client: undefined,
    initClient: undefined,
    loadingConversations: false,
    loadingMessages: false,
    conversations: new Map<string, Conversation>(),
    conversationMessages: new Map<string, XmtpChatMessage[]>(),
    userExists: false,
    disconnect: undefined,
  });

  const disconnect = (): void => {
    setProviderState({
      ...providerState,
      client: undefined,
      conversations: new Map(),
      conversationMessages: new Map(),
      userExists: false,
    });
  };

  const initClient = async () => {
    log(
      'XMTP initClient',
      walletAddress && !providerState.client && walletClient ? 'true' : 'false',
      walletAddress,
      providerState.client,
      walletClient,
    );
    if (walletAddress && !providerState.client && walletClient) {
      try {
        let keys = loadKeys(walletAddress as string);
        if (!keys) {
          // @ts-ignore: xmtp don't support viem typing yet
          keys = await Client.getKeys(ethersWalletClient, {
            env: process.env.NEXT_PUBLIC_MESSENGING_ENV as clientEnv,
          });
        }

        const client = await Client.create(null, {
          env: process.env.NEXT_PUBLIC_MESSENGING_ENV as clientEnv,
          privateKeyOverride: keys,
        });
        setProviderState({
          ...providerState,
          client,
          disconnect,
          userExists: !!keys,
          // getOneConversationMessages,
        });
        storeKeys(walletAddress as string, keys);
      } catch (e: any) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    const autoInit = async () => {
      if (walletClient && walletAddress && !providerState.client) {
        if (loadKeys(walletAddress)) {
          await initClient();
        }
      }
    };
    autoInit();
  }, [walletAddress]);

  useEffect(() => {
    const checkUserExistence = async (): Promise<void> => {
      if (walletClient) {
        const userExists = await Client.canMessage(walletAddress as string, {
          env: process.env.NEXT_PUBLIC_MESSENGING_ENV as clientEnv,
        });
        setProviderState({ ...providerState, userExists, initClient });
      }
    };
    checkUserExistence();
  }, [walletClient]);

  useEffect(() => {
    if (!providerState.client) return;

    const listConversations = async (): Promise<void> => {
      setProviderState({ ...providerState, loadingConversations: true, loadingMessages: true });
      const { client, conversationMessages, conversations } = providerState;
      if (client) {
        let conv: Conversation[] = [];
        try {
          conv = (await client.conversations.list()).filter(conversation =>
            conversation.context?.conversationId.startsWith(CONVERSATION_PREFIX),
          );
        } catch (e: any) {
          console.error('Error listing conversations - ', e);
        } finally {
          setProviderState({ ...providerState, loadingConversations: false });
        }

        Promise.all(
          conv.map(async conversation => {
            if (conversation.peerAddress !== walletAddress) {
              let messages: DecodedMessage[] = [];
              try {
                // Returns a list of all messages to/from the peerAddress
                messages = await conversation.messages();
              } catch (e: any) {
                console.error('Error listing messages - ', e);
              }
              //Temp fix for conversation duplicates
              if (messages.length > 0) {
                const chatMessages: XmtpChatMessage[] = messages.map(message =>
                  buildChatMessage(message),
                );
                conversationMessages.set(conversation.peerAddress, chatMessages);
                conversations.set(conversation.peerAddress, conversation);
              }
              setProviderState({
                ...providerState,
                conversationMessages,
                conversations,
              });
            }
          }),
        ).then(() => {
          setProviderState({ ...providerState, loadingMessages: false });
        });
      }
    };
    listConversations();
  }, [providerState.client]);

  const value = useMemo(() => {
    return {
      providerState,
      setProviderState,
    };
  }, [walletClient, providerState]);

  return <XmtpContext.Provider value={value}>{children}</XmtpContext.Provider>;
};
