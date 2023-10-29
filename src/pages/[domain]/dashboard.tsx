import Link from 'next/link';
import { useContext } from 'react';
import Notification from '../../components/Notification';
import Steps from '../../components/Steps';
import UserDetail from '../../components/UserDetail';
import UserGains from '../../components/UserGains';
import UserPayments from '../../components/UserPayments';
import UserProposals from '../../components/UserProposals';
import UserServices from '../../components/UserServices';
import TalentLayerContext from '../../context/talentLayer';
import BuilderPlaceContext from '../../modules/BuilderPlace/context/BuilderPlaceContext';
import { getBuilderPlace } from '../../modules/BuilderPlace/queries';

export async function getServerSideProps({ params }: any) {
  console.log('getServerSideProps', { params });
  return await getBuilderPlace(params.domain);
}

function Dashboard() {
  const { account, user } = useContext(TalentLayerContext);
  const { isBuilderPlaceOwner, builderPlace } = useContext(BuilderPlaceContext);

  if (!user) {
    return <Steps />;
  }

  return (
    <div className='max-w-7xl mx-auto text-base-content'>
      <div className='-mx-6 -mt-6 sm:mx-0 sm:mt-0'>
        <div className='flex py-2 px-6 sm:px-0 items-center w-full mb-8'>
          <p className='text-2xl font-bold flex-1 mt-6'>
            your <span className='text-base-content ml-1'> dashboard </span>
          </p>
        </div>
      </div>

      {account?.isConnected && user && (
        <div>
          {isBuilderPlaceOwner && (!builderPlace?.logo || !builderPlace?.icon) && (
            <>
              <div className='mb-12'>
                <h2 className='pb-4 text-base-content  break-all flex justify-between items-center'>
                  <span className='flex-1 font-bold'>your builderPlace</span>
                </h2>

                <Notification
                  title='personalize your space!'
                  text='customize your builder place to match your brand'
                  link='/admin/configure-place'
                  linkText='personalize my space'
                  color='success'
                  imageUrl={
                    user?.description?.image_url
                      ? user?.description?.image_url
                      : `/images/default-avatar-${Number(user?.id ? user.id : '1') % 9}.jpeg`
                  }
                />
              </div>

              <div className='mb-12'>
                <UserServices user={user} type='buyer' />
              </div>
            </>
          )}
          {!isBuilderPlaceOwner && (
            <>
              <div className='mb-12'>
                <h2 className='pb-4 text-base-content  break-all flex justify-between items-center'>
                  <span className='flex-1 font-bold'>worker profile</span>
                  <Link
                    className='hover:opacity-70 text-primary bg-primary px-3 py-2 text-sm  rounded-xl'
                    href={`/profiles/edit`}>
                    Edit
                  </Link>
                </h2>
                <UserDetail user={user} />
              </div>
              <div className='mb-12'>
                <UserPayments user={user} />
              </div>
              <div className='mb-12'>
                <UserGains user={user} />
              </div>
              <div className='mb-12'>
                <UserServices user={user} type='seller' />
              </div>
              <div className='mb-12'>
                <UserProposals user={user} />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
