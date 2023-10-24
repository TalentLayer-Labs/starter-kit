import { useRouter } from 'next/router';
import useUserByAddress from '../../../hooks/useUserByAddress';
import { truncateAddress } from '../../../utils';
import { formatDateConversationCard } from '../../../utils/dates';
import { XmtpChatMessage } from '../utils/types';

interface IConversationCardProps {
  peerAddress: string;
  latestMessage?: XmtpChatMessage;
}

const ConversationCard = ({ peerAddress, latestMessage }: IConversationCardProps) => {
  const user = useUserByAddress(peerAddress);
  const router = useRouter();

  const handleSelectConversation = () => {
    router.push(`/messaging/${peerAddress}`);
  };

  return (
    <div
      onClick={() => handleSelectConversation()}
      className={`flex py-4 px-2 justify-center items-center border-b border-redpraha cursor-pointer text-stone-800`}>
      <div className='flex-1 pl-2'>
        {user && user.handle ? <b>{user.handle}</b> : <b>{truncateAddress(peerAddress)}</b>}
        <div>
          <span className='text-xs text-stone-800 bas'>
            {formatDateConversationCard(latestMessage?.timestamp as Date)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ConversationCard;
