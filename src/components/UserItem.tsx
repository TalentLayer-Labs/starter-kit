import Link from 'next/link';
import { IUser } from '../types';
import Loading from './Loading';
import Stars from './Stars';
import { useTalentLayer, useUser } from '@talentlayer/react';

function UserItem({ user }: { user: IUser }) {
  const { user: currentUser } = useTalentLayer();
  const [userResponse] = useUser({ userId: user?.id });
  const userDescription = userResponse?.description;

  if (!user?.id) {
    return <Loading />;
  }

  return (
    <div className='flex flex-row gap-2 rounded-xl p-4 border border-gray-700 text-white bg-endnight'>
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
              <p className='text-gray-100 font-medium break-all'>{user.handle}</p>
              <p className='text-xs text-gray-500'>{userDescription?.title || '-'}</p>
            </div>
          </div>
        </div>
        <Stars rating={Number(user.rating)} numReviews={user.userStats.numReceivedReviews} />

        <div className='flex flex-row gap-4 justify-end items-center'>
          <Link
            className='text-zinc-600 bg-zinc-50 hover:bg-zinc-500 hover:text-white px-3 py-2 rounded text-sm'
            href={`/dashboard/profile/${user.id}`}>
            View profile
          </Link>
          {currentUser?.id === user.id && (
            <Link
              className='text-green-600 bg-green-50 hover:bg-redpraha hover:text-white px-5 py-2 rounded'
              href={`/dashboard/profile/edit`}>
              Edit profile
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserItem;
