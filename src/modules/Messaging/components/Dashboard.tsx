import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { useWalletClient } from 'wagmi';
import Steps from '../../../components/Steps';
import TalentLayerContext from '../../../context/talentLayer';
import { useChainId } from '../../../hooks/useChainId';
import useUserByAddress from '../../../hooks/useUserByAddress';
import { XmtpContext } from '../context/XmtpContext';
import useSendMessage from '../hooks/useSendMessage';
import useStreamConversations from '../hooks/useStreamConversations';
import { NON_EXISTING_XMTP_USER_ERROR_MESSAGE } from '../hooks/useStreamMessages';
import { ChatMessageStatus, XmtpChatMessage } from '../utils/types';
import CardHeader from './CardHeader';
import MessageComposer from './MessageComposer';
import MessageList from './MessageList';

function Dashboard() {
  const chainId = useChainId();
  const { account, user } = useContext(TalentLayerContext);
  const { data: walletClient } = useWalletClient({
    chainId,
  });
  const { providerState, setProviderState } = useContext(XmtpContext);
  const [messageContent, setMessageContent] = useState<string>('');
  const router = useRouter();
  const { address } = router.query;
  const selectedConversationPeerAddress = address as string;
  const [sendingPending, setSendingPending] = useState(false);
  const [messageSendingErrorMsg, setMessageSendingErrorMsg] = useState('');

  const { sendMessage } = useSendMessage(
    (selectedConversationPeerAddress as string) ? selectedConversationPeerAddress : '',
    account?.address,
  );
  const peerUser = useUserByAddress(selectedConversationPeerAddress);

  // Listens to new conversations ? ==> Yes, & sets them in "xmtp context". Stream stops "onDestroy"
  useStreamConversations();

  const handleXmtpConnect = async () => {
    if (providerState && providerState.initClient && walletClient) {
      await providerState.initClient();
    }
  };

  const sendNewMessage = async () => {
    if (account?.address && messageContent && providerState && setProviderState) {
      setSendingPending(true);
      const sentMessage: XmtpChatMessage = {
        from: account.address,
        to: selectedConversationPeerAddress,
        messageContent,
        timestamp: new Date(),
        status: ChatMessageStatus.PENDING,
      };
      const cloneState = { ...providerState };
      const allMessages = cloneState.conversationMessages;
      let messages = cloneState.conversationMessages.get(selectedConversationPeerAddress);
      if (messages) {
        // If Last message in error, remove it & try to resend
        if (messageSendingErrorMsg) {
          messages.pop();
          setMessageSendingErrorMsg('');
        }
        messages.push(sentMessage);
        allMessages.set(selectedConversationPeerAddress, messages);
      } else {
        // If no messages, create new ChatMessage array
        allMessages.set(selectedConversationPeerAddress, [sentMessage]);
      }

      try {
        //Send message
        setProviderState({
          ...providerState,
          conversationMessages: allMessages,
        });
        const response = await sendMessage(messageContent);
        // Update message status & timestamp
        sentMessage.status = ChatMessageStatus.SENT;
        sentMessage.timestamp = response.sent;

        messages = allMessages.get(selectedConversationPeerAddress);
        messages?.pop();
        messages?.push(sentMessage);
        setMessageContent('');
      } catch (error) {
        setSendingPending(false);
        setMessageSendingErrorMsg(
          'An error occurred while sending the message. Please try again later.',
        );
        // If message in error, update last message' status to ERROR
        sentMessage.status = ChatMessageStatus.ERROR;
        messages?.pop();
        messages?.push(sentMessage);
        console.error(error);
      } finally {
        if (messages) {
          allMessages.set(selectedConversationPeerAddress, messages);
        }
        setProviderState({
          ...providerState,
          conversationMessages: allMessages,
        });
        setSendingPending(false);
      }
    }
  };

  if (!user) {
    return <Steps />;
  }

  return (
    <div className='mx-auto text-base-content'>
      {!providerState?.client && account && (
        <div className='flex items-center justify-center pt-16'>
          <button
            className='text-primary bg-primary hover:opacity-70 px-5 py-2.5 rounded-xl text-md relative'
            onClick={() => handleXmtpConnect()}>
            Connect to Messaging
          </button>
        </div>
      )}
      {providerState?.client && (
        <div className='-mx-6 md:-mx-12 xl:-mx-24'>
          <CardHeader peerAddress={selectedConversationPeerAddress} />
          <div className='flex flex-row'>
            {providerState?.client && selectedConversationPeerAddress && (
              <div className='w-full flex flex-col justify-between'>
                <div className='overflow-y-auto'>
                  <MessageList
                    conversationMessages={
                      providerState.conversationMessages.get(selectedConversationPeerAddress) ?? []
                    }
                    selectedConversationPeerAddress={selectedConversationPeerAddress}
                    userId={account?.address as string}
                    peerUserId={selectedConversationPeerAddress}
                    messagesLoading={providerState.loadingMessages}
                    sendingPending={sendingPending}
                    setMessageSendingErrorMsg={setMessageSendingErrorMsg}
                  />
                </div>
                {(!providerState.loadingMessages || messageSendingErrorMsg) && (
                  <MessageComposer
                    messageContent={messageContent}
                    setMessageContent={setMessageContent}
                    sendNewMessage={sendNewMessage}
                    sendingPending={sendingPending}
                    peerUserExistsOnXMTP={
                      messageSendingErrorMsg !== NON_EXISTING_XMTP_USER_ERROR_MESSAGE
                    }
                    peerUserExistsOnTalentLayer={!!selectedConversationPeerAddress}
                  />
                )}
              </div>
            )}
          </div>
          {messageSendingErrorMsg && (
            <div className={'text-center text-xs px-4'}>
              <p className={'text-error ml-1'}>{messageSendingErrorMsg}</p>
            </div>
          )}
          {selectedConversationPeerAddress && !selectedConversationPeerAddress && (
            <div className={'text-center text-xs px-4'}>
              <p className={'text-error ml-1'}>User is not registered</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
