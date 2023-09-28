import { useContext } from 'react';
import { useWalletClient } from 'wagmi';
import Steps from '../../../components/Steps';
import TalentLayerContext from '../../../context/talentLayer';
import { useChainId } from '../../../hooks/useChainId';
import ConversationList from '../../../modules/Messaging/components/ConversationList';
import SearchModal from '../../../modules/Messaging/components/SearchModal';
import ShareModal from '../../../modules/Messaging/components/ShareModal';
import { XmtpContext } from '../../../modules/Messaging/context/XmtpContext';
import useStreamConversations from '../../../modules/Messaging/hooks/useStreamConversations';

function MessagingIndex() {
  const chainId = useChainId();
  const { account, user } = useContext(TalentLayerContext);
  const { data: walletClient } = useWalletClient({
    chainId,
  });
  const { providerState } = useContext(XmtpContext);

  // Listens to new conversations ? ==> Yes, & sets them in "xmtp context". Stream stops "onDestroy"
  useStreamConversations();

  const handleXmtpConnect = async () => {
    if (providerState && providerState.initClient && walletClient) {
      await providerState.initClient();
    }
  };

  if (!user) {
    return <Steps />;
  }

  return (
    <div className='mx-auto text-gray-900 sm:px-4 lg:px-0'>
      {!providerState?.client && account && (
        <div className='flex items-center justify-center pt-16'>
          <button
            type='submit'
            className='bg-redpraha text-white font-bold py-2 px-4 rounded'
            onClick={() => handleXmtpConnect()}>
            Connect to Messaging
          </button>
        </div>
      )}
      {providerState?.client && (
        <div className='-mx-6 -mt-6 sm:mx-0 sm:mt-0'>
          <div className='flex flex-row text-white'>
            <div className='flex py-2 px-6 sm:px-0 items-center border-b w-full border-gray-700'>
              <>
                <p className='text-2xl font-medium flex-1'>Chats</p>

                <SearchModal />
                <ShareModal />
              </>
            </div>
          </div>
          <div className='flex flex-col'>
            <ConversationList
              conversationMessages={providerState.conversationMessages}
              conversationsLoading={providerState.loadingConversations}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default MessagingIndex;
