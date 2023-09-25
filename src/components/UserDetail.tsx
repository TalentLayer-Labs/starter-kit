import { useContext } from 'react';
import TalentLayerContext from '../context/talentLayer';
import useUserById from '../hooks/useUserById';
import PohModule from '../modules/Poh/PohModule';
import { IUser } from '../types';
import Loading from './Loading';
import Stars from './Stars';
import DelegateModal from './Modal/DelegateModal';

function UserDetail({ user }: { user: IUser }) {
  const { user: currentUser } = useContext(TalentLayerContext);
  const userDescription = user?.id ? useUserById(user?.id)?.description : null;

  if (!user?.id) {
    return <Loading />;
  }

  return (
    <div className='rounded-xl p-4 border border-gray-700 text-white bg-endnight'>
      <div className='w-full'>
        <div className='flex flex-col justify-start items-start gap-4'>
          <div className='flex items-center justify-start mb-4'>
            <img
              src={
                user?.description?.image_url
                  ? user?.description?.image_url
                  : `/images/default-avatar-${Number(user?.id ? user.id : '1') % 9}.jpeg`
              }
              className='w-10 mr-4 rounded-full'
              width={50}
              height={50}
              alt='default avatar'
            />
            <div className='flex flex-col'>
              <p className='text-gray-100 font-medium break-all'>{user?.handle}</p>
              <p className='text-gray-400 text-xs'>{userDescription?.title}</p>
            </div>
            <div className=''>
              <PohModule address={user.address} />
            </div>
          </div>
        </div>
        <Stars rating={Number(user.rating)} numReviews={user.userStats.numReceivedReviews} />
      </div>
      <div className=' border-t border-gray-700 pt-2 w-full'>
        {userDescription?.name && (
          <p className='text-sm text-gray-400 mt-4'>
            <strong>Name:</strong> {userDescription?.name}
          </p>
        )}
        <p className='text-sm text-gray-400 mt-4'>
          <strong>Skills:</strong> {userDescription?.skills_raw}
        </p>
        <p className='text-sm text-gray-400 mt-4'>
          <strong>About:</strong> {userDescription?.about}
        </p>
        {userDescription?.role && (
          <p className='text-sm text-gray-400 mt-4'>
            <strong>Role:</strong> {userDescription?.role}
          </p>
        )}
      </div>

      {currentUser?.id === user.id && process.env.NEXT_PUBLIC_ACTIVE_DELEGATE === 'true' && (
        <div className=' border-t border-gray-700 pt-4 w-full mt-4'>
          <div className='flex flex-row gap-4 justify-end items-center'>
            {/* <Link
              className='text-zinc-600 bg-zinc-50 hover:bg-zinc-500 hover:text-white px-3 py-2 rounded text-sm'
              href={`/dashboard/profile/incomes`}>
              Your incomes
            </Link> */}
            <DelegateModal />
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDetail;
