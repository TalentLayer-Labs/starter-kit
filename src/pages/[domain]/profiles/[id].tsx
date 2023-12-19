import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import Loading from '../../../components/Loading';
import UserServices from '../../../components/UserServices';
import WorkerPublicDetail from '../../../components/WorkerPublicDetail';
import useUserById from '../../../hooks/useUserById';
import LensModule from '../../../modules/Lens/LensModule';
import { sharedGetServerSideProps } from '../../../utils/sharedGetServerSideProps';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return sharedGetServerSideProps(context);
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
