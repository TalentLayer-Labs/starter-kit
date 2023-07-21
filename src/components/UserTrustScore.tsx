import { useContext, useState } from 'react';
import StarterKitContext from '../context/starterKit';
import useUserById from '../hooks/useUserById';
import { IUser } from '../types';
import Loading from './Loading';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function UserTrustScore({ user }: { user: IUser }) {
  const { user: currentUser } = useContext(StarterKitContext);
  const userDescription = user?.id ? useUserById(user?.id)?.description : null;
  const [isHovered, setIsHovered] = useState(false);
  const { push } = useRouter();

  if (!user?.id) {
    return <Loading />;
  }

  return (
    <div
      id={'UserTrustScore'}
      className='z-0 relative'
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      onClick={() => {
        push('/dashboard/profile/edit');
      }}>
      <div className='circle-bg-color-anim score-circular text-center'>
        <div className='circle-bg-color-anim score-inner'></div>
        <div className='score-number'></div>
        <div className='circle-text-color-anim score-text'>
          {currentUser?.id === user.id ? (
            <>{isHovered ? 'Improve it 🚀' : 'TrustyScore'}</>
          ) : (
            <>TrustyScore</>
          )}
        </div>
        <div className='score-circle'>
          <div className='circle-bg-color-anim score-bar progress-right'>
            <div className='circle-bg-color-anim score-progress'></div>
          </div>
          <div className='circle-bg-color-anim score-bar progress-left'>
            <div className='score-progress'></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserTrustScore;
