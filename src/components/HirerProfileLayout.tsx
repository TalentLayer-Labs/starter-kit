import { ReactNode, useContext } from 'react';
import TalentLayerContext from './../context/talentLayer';
import OnboardingSteps from './OnboardingSteps';
import Image from 'next/image';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  step?: number;
}

function HirerProfileLayout({ children, className, step }: ContainerProps) {
  const { account, user } = useContext(TalentLayerContext);
  const stepNumber = step == 1 ? 1 : 3;

  return (
    <div className='bg-white text-black'>
      <header className='navbar w-full border-stroke bg-white duration-300'>
        <div className='container relative lg:max-w-[1305px] lg:px-10'>
          <div className='flex items-center justify-between h-[80px]'>
            <div className='block py-4 lg:py-0'>
              <a href='/' className='block max-w-[145px] sm:max-w-[200px]'>
                <Image src='/logo-text-dark.png' alt='logo' width={256} height={41} />
              </a>
            </div>
          </div>
        </div>
      </header>

      <div>
        <OnboardingSteps currentStep={stepNumber} type='hirer' />
        <div className={`${className}`}>
          <div className='text-stone-800'>
            <p className=' pb-5 sm:pb-10 pt-5 text-3xl sm:text-5xl font-bold mt-6 text-center'>
              {step == 1 ? 'Create Your Hirer Profile' : 'Customize Your Hirer Profile'}
            </p>

            {account?.isConnected && user && (
              <div className=' pb-16 max-w-3xl transition-all duration-300 rounded-md mx-auto'>
                <div className='p-6 mx-auto'>{children}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HirerProfileLayout;
