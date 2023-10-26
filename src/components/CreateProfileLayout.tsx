import { EyeIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode, useContext } from 'react';
import TalentLayerContext from './../context/talentLayer';
import Steps from './Steps';

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
      <div className='max-w-7xl mx-auto text-stone-800'>
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
                  <div className='pb-16 border-redpraha relative w-full transition-all duration-300 rounded-md'>
                    <div className='border border-redpraha rounded-xl p-6 bg-white'>{children}</div>
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
