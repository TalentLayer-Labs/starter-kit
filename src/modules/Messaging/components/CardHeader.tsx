import useUserByAddress from '../../../hooks/useUserByAddress';
import { truncateAddress } from '../../../utils';

interface IProps {
  peerAddress: string;
}
const CardHeader = ({ peerAddress }: IProps) => {
  const user = useUserByAddress(peerAddress);

  return (
    <div className='flex flex-row text-base-content'>
      <div className='flex py-2 px-6 items-center border-b w-full border-info'>
        {peerAddress && (
          <>
            <p className='w-full h-full flex items-center text-md'>
              To: {` `}
              <span className='pr-2'>
                {user && user.handle ? <b>{user.handle}</b> : <b>{truncateAddress(peerAddress)}</b>}
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default CardHeader;
