import { useContext } from 'react';
import TalentLayerContext from '../context/talentLayer';
import useUserById from '../hooks/useUserById';
import PohModule from '../modules/Poh/PohModule';
import { IUser } from '../types';
import Loading from './Loading';
import Stars from './Stars';
import DelegateModal from './Modal/DelegateModal';
import Link from 'next/link';

function UserDetail({ user }: { user: IUser }) {
  const { user: currentUser } = useContext(TalentLayerContext);
  const userDescription = user?.id ? useUserById(user?.id)?.description : null;

  if (!user?.id) {
    return <Loading />;
  }

  return (
    <div className='rounded-xl p-4 border border-redpraha text-stone-800 bg-white'>
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
              <p className='text-stone-800 font-medium break-all'>{user?.handle}</p>
              <p className='text-stone-600 text-xs'>{userDescription?.title}</p>
            </div>
            <div className=''>
              <PohModule address={user.address} />
            </div>
          </div>
        </div>
        <Stars rating={Number(user.rating)} numReviews={user.userStats.numReceivedReviews} />
      </div>
      <div className=' border-t border-redpraha pt-2 w-full'>
        {userDescription?.name && (
          <p className='text-sm text-stone-600 mt-4'>
            <strong>Name:</strong> {userDescription?.name}
          </p>
        )}
        <p className='text-sm text-stone-600 mt-4'>
          <strong>Skills:</strong> {userDescription?.skills_raw}
        </p>
        <p className='text-sm text-stone-600 mt-4'>
          <strong>About:</strong> {userDescription?.about}
        </p>
        {userDescription?.role && (
          <p className='text-sm text-stone-600 mt-4'>
            <strong>Role:</strong> {userDescription?.role}
          </p>
        )}
      </div>

      {currentUser?.id === user.id && (
        <div className=' border-t border-redpraha pt-4 w-full mt-4'>
          <div className='flex flex-row gap-4 justify-end items-center'>
            <Link
              className='text-stone-800 bg-stone-200 hover:bg-stone-300 px-5 py-2.5 rounded-xl text-sm-xl relative'
              href={`/profiles/incomes`}>
              Your incomes
            </Link>
            {process.env.NEXT_PUBLIC_ACTIVE_DELEGATE === 'true' && <DelegateModal />}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDetail;
