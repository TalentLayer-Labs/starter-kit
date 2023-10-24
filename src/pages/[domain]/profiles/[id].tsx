import { useRouter } from 'next/router';
import Loading from '../../../components/Loading';
import UserDetail from '../../../components/UserDetail';
import UserServices from '../../../components/UserServices';
import useUserById from '../../../hooks/useUserById';
import LensModule from '../../../modules/Lens/LensModule';
import { getBuilderPlace } from '../../../modules/BuilderPlace/queries';

export async function getServerSideProps({ params }: any) {
  return await getBuilderPlace(params.domain);
}

function Profile() {
  const router = useRouter();
  const { id } = router.query;
  const user = useUserById(id as string);

  if (!user) {
    return <Loading />;
  }

  return (
    <div className='max-w-7xl mx-auto text-stone-800'>
      {user && (
        <>
          <div className='-mx-6 -mt-6 sm:mx-0 sm:mt-0'>
            <p className='flex py-2 items-center text-2xl font-bold tracking-wider mb-6 w-full px-6 sm:px-0 mt-6 '>
              Profile <span className='text-stone-800 ml-1'> {user.handle} </span>
            </p>
          </div>
          <div>
            <div className='mb-6'>
              <UserDetail user={user} />
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

export default Profile;
