import { useRouter } from 'next/router';
import Loading from '../../../components/Loading';
import useUserById from '../../../hooks/useUserById';
import { getBuilderPlace } from '../../../modules/BuilderPlace/queries';
import WorkerPublicDetail from '../../../components/WorkerPublicDetail';

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
    <div className='mx-auto text-base-content'>
      {user && (
        <>
            <div className='mb-6'>
              <WorkerPublicDetail user={user} />
            </div>
            <div className='mb-6'>
              <UserServices user={user} type='seller' />
            </div>
            <div className='mb-6'>
              <LensModule address={user.address} />
            </div>
        </>
      )}
    </div>
  );
}

export default Profile;
