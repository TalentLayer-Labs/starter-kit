import Link from 'next/link';
import { useContext } from 'react';
import TalentLayerContext from '../context/talentLayer';
import useUserById from '../hooks/useUserById';
import { IUser } from '../types';
import Loading from './Loading';
import Stars from './Stars';

function UserItem({ user }: { user: IUser }) {
  const { user: currentUser } = useContext(TalentLayerContext);
  const userDescription = user?.id ? useUserById(user?.id)?.description : null;

  if (!user?.id) {
    return <Loading />;
  }

  return (
    <div className='flex flex-row gap-2 rounded-xl p-4 border border-info text-base-content bg-base-100'>
      <div className='flex flex-col items-top justify-between w-full'>
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
              <p className='text-base-content font-medium break-all'>{user.handle}</p>
              <p className='text-xs text-base-content opacity-50'>
                {userDescription?.title || '-'}
              </p>
            </div>
          </div>
        </div>
        <Stars rating={Number(user.rating)} numReviews={user.userStats.numReceivedReviews} />

        <div className='flex flex-row gap-4 justify-end items-center'>
          <Link
            className='text-primary bg-primary hover:opacity-70 px-5 py-2.5 rounded-xl text-md relative'
            href={`/profiles/${user.id}`}>
            View profile
          </Link>
          {currentUser?.id === user.id && (
            <Link
              className='text-success bg-success hover:bg-info hover:text-base-content px-5 py-2 rounded'
              href={`/profiles/edit`}>
              Edit profile
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserItem;
