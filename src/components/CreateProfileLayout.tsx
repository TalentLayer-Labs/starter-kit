import { ReactNode, useContext } from 'react';
import TalentLayerContext from './../context/talentLayer';
import Steps from './Steps';
import OnboardingSteps from './OnboardingSteps';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

function CreateProfileLayout({ children, className }: ContainerProps) {
  const { account, user } = useContext(TalentLayerContext);

  if (!account?.isConnected || !user) {
    return <Steps />;
  }

  return (
    <div className={className}>
      <OnboardingSteps currentStep={2} />
      <div className='max-w-7xl mx-auto text-base-content'>
        <div className='-mx-6 -mt-6 sm:mx-0 sm:mt-0'>
          <div className='flex py-2 px-6 sm:px-0 items-center w-full mb-8'>
            <p className='text-2xl font-bold flex-1 mt-6'>Create Your Worker Profile</p>
          </div>
        </div>

        {account?.isConnected && user && (
          <div>
            <div className='min-h-screen overflow-hidden'>
              <div className='grid xl:gap-8 xl:grid-cols-12'>
                <div className='col-span-12 xl:col-span-8'>
                  <div className='pb-16 border-info relative w-full transition-all duration-300 rounded-md'>
                    <div className='border border-info rounded-xl p-6 bg-base-100'>{children}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateProfileLayout;
