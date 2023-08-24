import { EyeIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode, useContext } from 'react';
import TalentLayerContext from '../../context/talentLayer';
import Steps from '../Steps';
import SideMenu from './SideMenu';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

function Layout({ children, className }: ContainerProps) {
  const { account, user } = useContext(TalentLayerContext);

  if (!account?.isConnected || !user) {
    return <Steps />;
  }

  return (
    <div className={className}>
      <div className='max-w-7xl mx-auto text-gray-200 sm:px-4 lg:px-0'>
        <div className='-mx-6 -mt-6 sm:mx-0 sm:mt-0'>
          <div className='flex py-2 px-6 sm:px-0 items-center border-b w-full border-gray-700 mb-8'>
            <p className='text-2xl font-medium flex-1'>Edit</p>

            <Link
              href={`/dashboard/profile/${user.id}`}
              className=' hover:bg-endnight text-white bg-endnight px-3 py-2 text-sm flex items-center rounded-xl'>
              <EyeIcon className='w-[18px] h-[18px] text-redpraha mr-2' />
              Public page
            </Link>
          </div>
        </div>

        {account?.isConnected && user && (
          <div>
            <div className='min-h-screen overflow-hidden'>
              <div className='grid gap-8 sm:grid-cols-12'>
                <div className='col-span-12 sm:col-span-4'>
                  <div className='flex w-full items-center gap-2'>
                    <div className='relative inline-flex shrink-0 items-center justify-center outline-none h-12 w-12 rounded-full'>
                      <div className='flex h-full w-full items-center justify-center overflow-hidden text-center transition-all duration-300 rounded-full'>
                        <Image
                          src={`/images/default-avatar-${Number(user?.id) % 9}.jpeg`}
                          className='max-h-full max-w-full object-cover shadow-sm border-transparent h-12 w-12'
                          width={48}
                          height={48}
                          alt='default avatar'
                        />
                      </div>
                    </div>
                    <div className=''>
                      <p className='font-heading text-base font-medium leading-none'>
                        {user?.handle}
                      </p>
                      <p className='font-alt text-xs font-normal leading-normal text-muted-400'>
                        {user?.description?.title}
                      </p>
                    </div>
                  </div>
                  <div className='mt-8 max-w-[240px]'>
                    <SideMenu />
                  </div>
                </div>
                <div className='col-span-12 sm:col-span-8'>
                  <div className='pb-16 border-muted-700 relative w-full transition-all duration-300 rounded-md'>
                    <div className='border border-gray-700 rounded-xl p-6 bg-endnight'>
                      {children}
                    </div>
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

export default Layout;
