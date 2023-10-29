import { ReactNode, useContext } from 'react';
import TalentLayerContext from './../context/talentLayer';
import OnboardingSteps from './OnboardingSteps';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  step?: number;
}

function HirerProfileLayout({ children, className,step }: ContainerProps) {
  const { account, user } = useContext(TalentLayerContext);
  const stepNumber = step == 1 ? 1 : 3;

  return (
    <>
      <OnboardingSteps currentStep={stepNumber} type="Hirer" />
      <div className={`${className}`}>
        <div className='text-stone-800'>
          <p className='pb-10 pt-5 text-5xl font-bold mt-6 text-center'>
            {step == 1 ? "Create Your Hirer Profile" : "Customize Your Hirer Profile"}
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

export default HirerProfileLayout;
