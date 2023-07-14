import useUserByAddress from '../../../hooks/useUserByAddress';
import { truncateAddress } from '../../../utils';
import SearchModal from './SearchModal';
import ShareModal from './ShareModal';

interface IProps {
  peerAddress: string;
}
const CardHeader = ({ peerAddress }: IProps) => {
  const user = useUserByAddress(peerAddress);

  return (
    <div className='flex flex-row text-white'>
      <div className='flex py-2 px-6 items-center border-b w-full border-gray-700'>
        {peerAddress && (
          <>
            <p className='w-full h-full flex items-center text-xs'>
              To:
              <span className='pr-2'>
                {user && user.handle ? <b>{user.handle}</b> : <b>{truncateAddress(peerAddress)}</b>}
              </span>
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
