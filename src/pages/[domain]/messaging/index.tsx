import { useContext } from 'react';
import { useWalletClient } from 'wagmi';
import Steps from '../../../components/Steps';
import TalentLayerContext from '../../../context/talentLayer';
import { useChainId } from '../../../hooks/useChainId';
import { getBuilderPlace } from '../../../modules/BuilderPlace/queries';
import ConversationList from '../../../modules/Messaging/components/ConversationList';
import SearchModal from '../../../modules/Messaging/components/SearchModal';
import ShareModal from '../../../modules/Messaging/components/ShareModal';
import { XmtpContext } from '../../../modules/Messaging/context/XmtpContext';
import useStreamConversations from '../../../modules/Messaging/hooks/useStreamConversations';

export async function getServerSideProps({ params }: any) {
  return await getBuilderPlace(params.domain);
}

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
    <div className='mx-auto text-base-content sm:px-4 lg:px-0'>
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
          <div className='flex flex-row text-base-content'>
            <div className='flex py-2 px-4 sm:px-0 items-center border-b w-full border-info'>
              <>
                <p className='text-2xl font-bold flex-1 mt-3'>Chats</p>

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
