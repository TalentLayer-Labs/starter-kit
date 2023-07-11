import { truncateAddress } from '../../../utils';
import SearchModal from './SearchModal';
import ShareModal from './ShareModal';

interface ICardHeaderProps {
  peerAddress?: string;
}
const CardHeader = ({ peerAddress }: ICardHeaderProps) => {
  return (
    <div className='flex flex-row text-white'>
      <div className='flex py-2 px-6 items-center border-b w-full border-gray-700'>
        {peerAddress && (
          <>
            <p className='w-full h-full flex items-center text-xs'>
              To:
              <span className='pr-2'>{truncateAddress(peerAddress, 5)}</span>
            </p>
          </>
        )}
        {!peerAddress && (
          <>
            <p className='text-2xl font-medium flex-1'>Chats</p>

            <SearchModal />
            <ShareModal />
          </>
        )}
      </div>
    </div>
  );
};

export default CardHeader;
