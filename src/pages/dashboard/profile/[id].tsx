import { useRouter } from 'next/router';
import Loading from '../../../components/Loading';
import UserDetail from '../../../components/UserDetail';
import UserServices from '../../../components/UserServices';
import useUserById from '../../../hooks/useUserById';

// MODULE_SECTION_START:lens
import LensModule from '../../../modules/Lens/LensModule';
// MODULE_SECTION_END

// MODULE_SECTION_START:sismo
import UserBadges from '../../../modules/Sismo/components/UserBadges';
// MODULE_SECTION_END

function Profile() {
  const router = useRouter();
  const { id } = router.query;
  const user = useUserById(id as string);

  if (!user) {
    return <Loading />;
  }

  return (
    <div className='max-w-7xl mx-auto text-gray-200 sm:px-4 lg:px-0'>
      {user && (
        <>
          <div className=' -mx-6 -mt-6 '>
            <p className='flex py-2 px-6 items-center text-2xl font-medium tracking-wider mb-8 border-b w-full border-gray-700 md:px-8 '>
              Profile <span className='text-gray-100 ml-1'> {user.handle} </span>
            </p>
          </div>
          <div>
            <div className='mb-6'>
              <UserDetail user={user} />
            </div>
            {/* MODULE_SECTION_START:sismo */}
            <div className='mb-6'>
              <UserBadges user={user} />
            </div>
            {/* MODULE_SECTION_END */}
            <div className='mb-6'>
              <UserServices user={user} type='buyer' />
            </div>
            <div className='mb-6'>
              <UserServices user={user} type='seller' />
            </div>
            {/* MODULE_SECTION_START:lens */}
            <div className='mb-6'>
              <LensModule address={user.address} />
            </div>
            {/* MODULE_SECTION_END */}
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
