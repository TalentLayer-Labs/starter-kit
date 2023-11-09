import { useRouter } from 'next/router';
import { useContext } from 'react';
import TalentLayerContext from '../context/talentLayer';
import OnboardingSteps from './OnboardingSteps';

function WorkerOnboardSuccess() {
  const { user } = useContext(TalentLayerContext);
  const router = useRouter();
  const serviceId = new URL(window.location.href).searchParams.get('serviceId');
  const openService = () => {
    router.push(`/work/${serviceId}/proposal`);
  };
  return (
    <>
      <div className='bg-base-100'>
        <OnboardingSteps currentStep={3} type='worker' />
        <div className='max-w-7xl mx-auto text-base-content sm:px-4 lg:px-0 py-20'>
          <div className='flex flex-col items-center justify-center gap-10'>
            <p className='text-5xl sm:text-7xl font-bold tracking-wider max-w-5xl text-center'>
              Done! 🎉
            </p>
            <p className='text-3xl sm:text-5xl font-medium tracking-wider max-w-5xl text-center'>
              Looking good! Now, it's time to work.
            </p>
            <p className='text-xl sm:text-2xl text-base-content opacity-50 text-center'>
              Your profile looks great - you are all set to apply for opportunities.
            </p>
            <div className='flex flex-col items-center gap-8'>
              <div className='w-48 h-48 rounded-full overflow-hidden'>
                <img
                  src={user?.description?.image_url}
                  alt='Profile Photo'
                  className='object-cover w-full h-full'
                />
              </div>
              <p className='text-4xl text-base-content font-medium '>{user?.description?.name}</p>
              <p className='text-2xl text-base-content font-medium '>{user?.description?.title}</p>
              <p className='text-2xl text-base-content text-center max-w-lg font-medium '>
                {user?.description?.about}
              </p>
              <button
                className='bg-pink-500 text-content rounded-lg px-4 py-2 mt-4 text-lg text-white font-medium'
                onClick={openService}>
                Go back to proposal form
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WorkerOnboardSuccess;
