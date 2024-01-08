import { useContext, useEffect, useState } from 'react';
import TalentLayerContext from '../../../context/talentLayer';
import { useRouter } from 'next/router';
import Loading from '../../../components/Loading';
import OnboardingSteps from '../../../components/OnboardingSteps';
import CreateWorkerId from '../../../components/Home/CreateWorkerId';
import Steps from '../../../components/Steps';
import { useSetWorkerProfileOwner } from '../../../modules/BuilderPlace/hooks/UseSetWorkerProfileOwner';
import { slugify } from '../../../modules/BuilderPlace/utils';
import { useGetWorkerById } from '../../../modules/BuilderPlace/hooks/UseGetWorkerById';

function workerOnboardingStep2() {
  const { account, loading, user } = useContext(TalentLayerContext);
  const { mutateAsync: updateWorkerProfileAsync } = useSetWorkerProfileOwner();
  const [error, setError] = useState('');
  const router = useRouter();
  const id = new URL(window.location.href).searchParams.get('id');
  const worker = useGetWorkerById(id as string);
  const serviceId = new URL(window.location.href).searchParams.get('serviceId');

  useEffect(() => {
    const setOwner = async () => {
      if (account?.isConnected && user?.id && id) {
        try {
          const response = await updateWorkerProfileAsync({
            id,
            talentLayerId: user.id,
          });
          /* If user tries to update a profile which already has an owner or if
          the profile does not exist, he's prompted to create his profile. */
          if (
            response?.error === 'Profile already has an owner.' ||
            response?.error === "Profile doesn't exist."
          ) {
            setError(response?.error);
          } else if (response?.id || response?.error === 'You already have a profile') {
            // If "id" successfully created or already has a profile redirect to step 3
            router.push({
              pathname: `/worker-onboarding/step3`,
              query: { serviceId: serviceId },
            });
          }
        } catch (e) {
          console.log('e', e);
        }
      }
    };
    setOwner();
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <OnboardingSteps currentStep={2} type='worker' />
      {!error ? (
        <>
          <CreateWorkerId />
          <div className='flex flex-col items-center justify-center gap-10'>
            <Steps handle={slugify(worker?.name)} />
          </div>
        </>
      ) : (
        <>
          <div className='bg-base-100'>
            <div className='max-w-7xl mx-auto text-base-content sm:px-4 lg:px-0 py-20'>
              <div className='flex flex-col items-center justify-center gap-10'>
                <p className='text-3xl sm:text-5xl font-medium tracking-wider max-w-5xl text-center'>
                  {error}
                </p>
                <p className='text-xl sm:text-2xl text-base-content opacity-50 text-center'>
                  You can create your own profile here
                </p>
                <div className='flex flex-col items-center gap-8'>
                  <button
                    className='bg-pink-500 text-content rounded-lg px-4 py-2 mt-4 text-lg text-white font-medium'
                    onClick={() => router.push('/worker-onboarding')}>
                    Create my worker profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default workerOnboardingStep2;
