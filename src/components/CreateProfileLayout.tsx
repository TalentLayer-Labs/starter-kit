import { ReactNode, useContext } from 'react';
import TalentLayerContext from './../context/talentLayer';
import OnboardingSteps from './OnboardingSteps';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

function CreateProfileLayout({ children, className }: ContainerProps) {
  const { account, user } = useContext(TalentLayerContext);

  return (
    <>
      <OnboardingSteps currentStep={2} type='worker' />
      <div className={`${className}`}>
        <div className='text-stone-800'>
          <p className=' pb-5 sm:pb-10 pt-5 text-3xl sm:text-5xl font-bold mt-6 text-center'>
            Create your contributor profile
          </p>

          {account?.isConnected && user && (
            <div className=' pb-16 max-w-3xl transition-all duration-300 rounded-md mx-auto'>
              <div className='p-6 mx-auto'>{children}</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CreateProfileLayout;
