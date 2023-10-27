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
    <div className='rounded-xl p-4 border border-info text-base-content bg-base-100'>
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
              <p className='text-base-content font-medium break-all'>
                {userDescription?.name || user?.handle}
              </p>
              <p className='text-base-content text-xs'>{userDescription?.title}</p>
            </div>
            <div className=''>
              <PohModule address={user.address} />
            </div>
          </div>
        </div>
        <Stars rating={Number(user.rating)} numReviews={user.userStats.numReceivedReviews} />
      </div>
      <div className=' border-t border-info pt-2 w-full'>
        <p className='text-sm text-base-content mt-4'>
          <strong>Skills:</strong>

          {userDescription?.skills_raw?.split(',').map((skill, index) => (
            <span key={index} className='text-xs border border-base-300 rounded-md px-2 py-1 ml-2'>
              {skill.trim()}
            </span>
          ))}
        </p>
      </div>

      {currentUser?.id === user.id && process.env.NEXT_PUBLIC_ACTIVE_DELEGATE === 'true' && (
        <div className=' border-t border-info pt-4 w-full mt-4'>
          <div className='flex flex-row gap-4 justify-end items-center'>
            <DelegateModal />
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDetail;
