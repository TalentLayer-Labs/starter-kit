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
  const { account, user, completionScores } = useContext(TalentLayerContext);

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
              <div className='grid xl:gap-8 xl:grid-cols-12'>
                <div className='col-span-12 xl:col-span-4 mb-4 xl:mb-0'>
                  <div className='flex w-full items-center gap-2'>
                    <div className='border-gray-700 bg-endnight relative w-full border transition-all duration-300 rounded-md flex flex-col p-6'>
                      <div className='flex items-center'>
                        <div className='relative inline-flex shrink-0 items-center justify-center outline-none h-12 w-12 rounded-full mr-4'>
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
                          <p className='font-heading text-lg font-medium leading-none'>
                            {user?.handle}
                          </p>
                          <p className='font-alt text-sm font-normal leading-normal text-gray-400'>
                            {user?.description?.title}
                          </p>
                        </div>
                      </div>
                      <div className='mb-1 mt-6 flex items-center justify-between'>
                        <h3 className='font-heading text-sm font-semibold leading-tight '>
                          <span>Profile Completion</span>
                        </h3>
                        <div>
                          <span className='text-gray-400 font-sans text-sm'>
                            {completionScores?.total.percentage || '0'}%
                          </span>
                        </div>
                      </div>
                      <div>
                        <div
                          role='progressbar'
                          className='bg-gray-700 relative w-full overflow-hidden h-1 rounded-full'>
                          <div
                            className='bg-redpraha rounded-full absolute start-0 top-0 h-full transition-all duration-300'
                            style={{ width: completionScores?.total.percentage + '%' }}
                          />
                        </div>
                        <div className='mt-2'>
                          <p className='text-gray-400 font-sans text-xs leading-tight'>
                            Reach out higher levels to increase your visibility and trust inside the
                            network while preserving your privacy.
                          </p>
                        </div>
                      </div>
                      <div className='mt-8 border-t-2 border-dashed pt-8 border-gray-700'>
                        <SideMenu />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-span-12 xl:col-span-8'>
                  <div className='pb-16 border-gray-700 relative w-full transition-all duration-300 rounded-md'>
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
