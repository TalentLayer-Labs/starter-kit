import { useRouter } from 'next/navigation';
import { truncateAddress } from '../../../utils';
import { formatDateConversationCard } from '../../../utils/dates';
import { XmtpChatMessage } from '../utils/types';
import { useUser } from '@talentlayer/react/dist';

interface IConversationCardProps {
  peerAddress: `0x${string}`;
  latestMessage?: XmtpChatMessage;
}

const ConversationCard = ({ peerAddress, latestMessage }: IConversationCardProps) => {
  const [user, loading] = useUser({ address: peerAddress });
  const router = useRouter();

  const handleSelectConversation = () => {
    router.push(`/dashboard/messaging/${peerAddress}`);
  };

  return (
    <div
      onClick={() => handleSelectConversation()}
      className={`flex py-4 px-2 justify-center items-center border-b border-gray-700 cursor-pointer text-white`}>
      <div className='flex-1 pl-2'>
        {!loading && user && user.handle ? (
          <b>{user.handle}</b>
        ) : (
          <b>{truncateAddress(peerAddress)}</b>
        )}
        <div>
          <span className='text-xs text-gray-200 bas'>
            {formatDateConversationCard(latestMessage?.timestamp as Date)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ConversationCard;
