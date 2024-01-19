import { GetServerSidePropsContext } from 'next';
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
import { sharedGetServerSideProps } from '../../utils/sharedGetServerSideProps';
import EmailModal from '../../components/Modal/EmailModal';
import { useRouter } from 'next/router';
import VerifyEmailNotification from '../../components/VerifyEmailNotification';
import DelegationNotification from '../../components/DelegationNotification';
import { toast } from 'react-toastify';
import VerifyUserAccountNotification from '../../components/VerifyUserAccountNotification';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return sharedGetServerSideProps(context);
}

function Dashboard() {
  const { account, user, workerProfile } = useContext(TalentLayerContext);
  const router = useRouter();
  const { isBuilderPlaceCollaborator, builderPlace } = useContext(BuilderPlaceContext);
  const isComingFromHirerOnboarding = router.asPath.includes('hireronboarding');

  if (!user) {
    return (
      <>
        {isComingFromHirerOnboarding ? (
          <div className='max-w-7xl mx-auto text-base-content text-center'>
            <div className='-mx-6 -mt-6 sm:mx-0 sm:mt-0'>
              <div className='py-2 px-6 sm:px-0 w-full mb-8'>
                <p className='text-2xl font-bold flex-1 mt-6'>
                  <span className='text-base-content ml-1'> your new Builder Place is ready!</span>
                </p>
                <p>Please connect your wallet to your new custom domain to access your dashboard</p>
              </div>
            </div>
          </div>
        ) : (
          !account?.isConnected && (
            <div className='max-w-7xl mx-auto text-base-content text-center'>
              <div className='-mx-6 -mt-6 sm:mx-0 sm:mt-0'>
                <div className='py-2 px-6 sm:px-0 w-full mb-8'>
                  <p className='text-2xl font-bold flex-1 mt-6'>
                    <span className='text-base-content ml-1'> Connect your wallet </span>
                  </p>
                  <p>You need first to connect your wallet to access your dashboard</p>
                </div>
              </div>
            </div>
          )
        )}

        <Steps />
      </>
    );
  }

  return (
    <div className='max-w-7xl mx-auto text-base-content'>
      <div className='-mx-6 -mt-6 sm:mx-0 sm:mt-0'>
        <div className='flex py-2 px-6 sm:px-0 items-center w-full mb-8'>
          <p className='text-2xl font-bold flex-1 mt-6'>
            <span className='text-base-content ml-1'> dashboard </span>
          </p>
        </div>
      </div>

      {account?.isConnected && user && (
        <div>
          {isBuilderPlaceCollaborator && (!builderPlace?.logo || !builderPlace?.icon) && (
            <>
              <div className='mb-12'>
                <h2 className='pb-4 text-base-content break-all flex justify-between items-center'>
                  <span className='flex-1 font-bold'>your BuilderPlace</span>
                </h2>

                <EmailModal />
                {!isComingFromHirerOnboarding && (
                  <VerifyEmailNotification
                    callback={() => {
                      toast.success('Verification email sent!');
                    }}
                  />
                )}
                <VerifyUserAccountNotification
                  callback={() => {
                    toast.success('Account verified!');
                  }}
                />
                <Notification
                  title='personalize your space!'
                  text='customize your BuilderPlace to match your brand'
                  link='/admin/configure-place'
                  linkText='personalize my space'
                  color='success'
                  imageUrl={user?.description?.image_url}
                />
              </div>

              <div className='mb-12'>
                <UserServices user={user} type='buyer' />
              </div>
            </>
          )}
          {!isBuilderPlaceCollaborator && (
            <>
              <EmailModal />
              <VerifyEmailNotification
                callback={() => {
                  toast.success('Verification email sent!');
                }}
              />
              <VerifyUserAccountNotification
                callback={() => {
                  toast.success('Account verified!');
                }}
              />
              {process.env.NEXT_PUBLIC_ACTIVE_DELEGATE === 'true' && <DelegationNotification />}
              <div className='mb-12 mt-2'>
                <h2 className='pb-4 text-base-content  break-all flex justify-between items-center'>
                  <span className='flex-1 font-bold'>contributor profile</span>
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
