'use client';

import { useUser } from '@talentlayer/react';
import Loading from '../../../../components/Loading';
import UserDetail from '../../../../components/UserDetail';
import UserServices from '../../../../components/UserServices';
import LensModule from '../../../../modules/Lens/LensModule';
import UserBadges from '../../../../modules/Sismo/components/UserBadges';

export default function Profile(props: { params: { id: string } }) {
  const { id } = props.params;
  const [user, loading] = useUser({ userId: id });

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='max-w-7xl mx-auto text-gray-200 sm:px-4 lg:px-0'>
      {user && (
        <>
          <div className='-mx-6 -mt-6 sm:mx-0 sm:mt-0'>
            <p className='flex py-2 px-6 sm:px-0 items-center text-2xl font-medium tracking-wider mb-8 border-b w-full border-gray-700 md:px-8 '>
              Profile <span className='text-gray-100 ml-1'> {user?.handle} </span>
            </p>
          </div>
          <div>
            <div className='mb-6'>
              <UserDetail user={user} />
            </div>
            <div className='mb-6'>
              <UserBadges user={user} />
            </div>
            <div className='mb-6'>
              <UserServices user={user} type='buyer' />
            </div>
            <div className='mb-6'>
              <UserServices user={user} type='seller' />
            </div>
            <div className='mb-6'>
              <LensModule address={user.address} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
