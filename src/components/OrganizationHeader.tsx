import React, { useContext } from 'react';
import BuilderPlaceContext from '../modules/BuilderPlace/context/BuilderPlaceContext';
import Loading from './Loading';
import useFilteredServices from '../hooks/useFilteredServices';
import { ServiceStatusEnum } from '../types';
import { useRouter } from 'next/router';
import Link from 'next/link';

function OrganizationHeader() {
  const router = useRouter();
  const { builderPlace } = useContext(BuilderPlaceContext);

  const { services } = useFilteredServices(
    ServiceStatusEnum.Opened,
    builderPlace?.ownerTalentLayerId,
  );

  if (!builderPlace) return <Loading />;

  console.log('builderPlace', builderPlace);
  return (
    <header className='relative bg-base-300 rounded-xl'>
      <div className='relative h-48 sm:h-96 overflow-hidden'>
        <div className='cover'>
          {builderPlace.cover && (
            <img
              className='bottom-0 left-0 object-cover absolute top-0 w-full h-full overflow-hidden rounded-xl'
              src={builderPlace.cover}
            />
          )}
        </div>
        <div className='h-full m-auto'>
          <div className='text-white left-3 sm:left-[260px] flex justify-center flex-col absolute bottom-[1rem]'>
            <h1 className='text-[1.63rem] leading-8 font-semibold m-0 mt-3  mr-0 mb-3 ml-0 sm:mt-0 sm:mr-0 sm:mb-3 sm:ml-0'>
              {builderPlace.name}
            </h1>
            <div className='flex-col text-xs justify-center flex sm:flex-col min-[980px]:flex-row'>
              <div className='flex mr-2 p-1 mb-2  sm:mb-2 min-[980px]:mb-0'>
                <p className='text-sm text-ellipsis overflow-hidden'>{builderPlace.baseline}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='relative h-full m-auto'>
        {builderPlace.profilePicture && (
          <img
            src={builderPlace.profilePicture}
            className={`object-coverrounded-3xl bottom-[-2.00rem] left-[40px] absolute top-[-5.75rem] z-[2] w-48 h-48 -mt-8 sm:block hidden`}
          />
        )}

        <div className='pl-3 sm:pl-[260px] px-0 overflow-x-auto pr-3 sm:pr-8 xl:pr-0'>
          <div className='items-center justify-between flex w-full h-full'>
            <div className='relative flex w-full h-full mr-3 overflow-x-auto'>
              <Link
                className={`hover:opacity-100 opacity-${
                  router.asPath == '/' ? '100' : '50'
                } text-base-content items-center font-medium py-3 flex mr-6`}
                href='/'>
                missions{' '}
                {services.length > 0 && (
                  <div className='bg-primary text-primary items-center cursor-pointer text-xs justify-center inline-flex w-5 h-5 ml-1 rounded-2xl p-1'>
                    {services.length}
                  </div>
                )}
              </Link>
              <Link
                className={`hover:opacity-100 opacity-${
                  router.asPath == '/about' ? '100' : '50'
                } text-base-content items-center font-medium py-3 flex mr-6`}
                href='/about'>
                about{' '}
              </Link>
              <Link
                className={`hover:opacity-100 opacity-${
                  router.asPath == '/tech' ? '100' : '50'
                } text-base-content items-center font-medium py-3 flex mr-6`}
                href='/tech'>
                tech{' '}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default OrganizationHeader;
