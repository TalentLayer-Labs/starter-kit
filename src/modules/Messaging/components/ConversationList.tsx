import { getLatestMessage } from '../utils/messaging';
import ConversationCard from './ConversationCard';
import Loading from '../../../components/Loading';
import { XmtpChatMessage } from '../utils/types';

interface IConversationListProps {
  conversationMessages: Map<string, XmtpChatMessage[]>;
  selectedConversationPeerAddress?: string;
  conversationsLoading: boolean;
}

const ConversationList = ({
  conversationMessages,
  conversationsLoading,
}: IConversationListProps) => {
  // Sort conversations by latest message timestamp
  const sortedConversations: Map<string, XmtpChatMessage[]> = new Map(
    [...conversationMessages.entries()].sort((convA, convB) => {
      return getLatestMessage(convA[1])?.timestamp < getLatestMessage(convB[1])?.timestamp ? 1 : -1;
    }),
  );

  return (
    <>
      {conversationsLoading && (
        <div className='flex flex-col mt-5 pb-8'>
          <Loading />
        </div>
      )}
      <ConversationCard
        key={'support'}
        latestMessage={
          { messageContent: 'Ask me anything', timestamp: 0 } as unknown as XmtpChatMessage
        }
        peerAddress={'0x599cEba969cafa87bAE8b6c8AC24846484714f09'}
      />
      {!conversationsLoading &&
        Array.from(sortedConversations.keys())
          .filter(value => {
            return value == '0x599cEba969cafa87bAE8b6c8AC24846484714f09' ? null : value;
          })
          .map(peerAddress => {
            return (
              <ConversationCard
                key={peerAddress}
                latestMessage={
                  sortedConversations.get(peerAddress)
                    ? getLatestMessage(sortedConversations.get(peerAddress) as XmtpChatMessage[])
                    : undefined
                }
                peerAddress={peerAddress}
              />
            );
          })}
    </>
  );
};

export default ConversationList;
