import { useContext } from 'react';
import StarterKitContext from '../context/starterKit';
import useUserById from '../hooks/useUserById';
import { IUser } from '../types';
import Loading from './Loading';
import Link from 'next/link';

function UserTrustScore({ user }: { user: IUser }) {
  const { user: currentUser } = useContext(StarterKitContext);
  const userDescription = user?.id ? useUserById(user?.id)?.description : null;

  if (!user?.id) {
    return <Loading />;
  }

  return (
    <div id={'UserTrustScore'} className=''>
      <div className='circle-bg-color-anim score-circular'>
        <div className='circle-bg-color-anim score-inner'></div>
        <div className='score-number'></div>
        <div className='circle-text-color-anim score-text'>TrustyScore</div>
        <div className='score-circle'>
          <div className='circle-bg-color-anim score-bar progress-right'>
            <div className='circle-bg-color-anim score-progress'></div>
          </div>
          <div className='circle-bg-color-anim score-bar progress-left'>
            <div className='score-progress'></div>
          </div>
        </div>
      </div>

      {currentUser?.id === user.id && (
        <div className=' border-t border-gray-700 pt-4 w-full mt-4'>
          <div className='flex flex-row gap-4 justify-end items-center'>
            <Link
              className='text-zinc-600 bg-zinc-50 hover:bg-zinc-500 hover:text-white px-3 py-2 rounded text-sm'
              href={`/dashboard/profile/incomes`}>
              See how to improve it
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserTrustScore;
