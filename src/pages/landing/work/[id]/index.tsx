import { useRouter } from 'next/router';
import Loading from '../../../../components/Loading';
import ServiceDetail from '../../../../components/ServiceDetail';
import useServiceById from '../../../../hooks/useServiceById';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

function Service() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { id } = router.query;
  const { service, isLoading } = useServiceById(id as string);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='bg-white text-black'>
      <header className='navbar fixed top-0 left-0 z-50 w-full border-stroke bg-white duration-300 '>
        <div className='container relative lg:max-w-[1305px] lg:px-10'>
          <div className='flex items-center justify-between'>
            <div className='block py-4 lg:py-0'>
              <Link href='/' className='block max-w-[145px] sm:max-w-[200px]'>
                <Image src='/logo-text-dark.png' alt='logo' width={256} height={41} />
              </Link>
            </div>
            <button
              onClick={() => setIsOpen(true)}
              className='navbarOpen absolute right-4 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 flex-col items-center justify-center space-y-[6px] font-bold lg:hidden'
              aria-label='navbarOpen'
              name='navbarOpen'>
              <span className='block h-[2px] w-7 bg-black '></span>
              <span className='block h-[2px] w-7 bg-black '></span>
              <span className='block h-[2px] w-7 bg-black '></span>
            </button>

            <div
              className={`menu-wrapper relative ${isOpen ? '' : 'hidden'} justify-between lg:flex`}>
              <button
                onClick={() => setIsOpen(false)}
                className='navbarClose fixed top-10 right-10 z-[9999] flex h-10 w-10 flex-col items-center justify-center font-bold lg:hidden'
                name='navbarClose'
                aria-label='navbarClose'>
                <span className='block h-[2px] w-7 rotate-45 bg-black '></span>
                <span className='-mt-[2px] block h-[2px] w-7 -rotate-45 bg-black '></span>
              </button>

              <nav className='fixed top-0 left-0 z-[999] flex h-screen w-full items-center justify-center bg-white bg-opacity-95 text-center backdrop-blur-sm lg:static lg:h-auto lg:w-max lg:bg-transparent lg:backdrop-blur-none '>
                <ul className='items-center space-y-3 lg:flex lg:space-x-8 lg:space-y-0 xl:space-x-10'>
                  <li className='menu-item'>
                    <a
                      onClick={() => setIsOpen(false)}
                      href='/worker-landing#video'
                      className='menu-scroll inline-flex items-center text-base font-medium text-black hover:text-redpraha   lg:py-7'>
                      about
                    </a>
                  </li>
                  <li className='menu-item'>
                    <a
                      onClick={() => setIsOpen(false)}
                      href='/worker-landing#features'
                      className='menu-scroll inline-flex items-center text-base font-medium text-black hover:text-redpraha   lg:py-7'>
                      features
                    </a>
                  </li>
                  <li className='menu-item'>
                    <a
                      onClick={() => setIsOpen(false)}
                      href='/worker-landing#pricing'
                      className='menu-scroll inline-flex items-center text-base font-medium text-black hover:text-redpraha   lg:py-7'>
                      pricing
                    </a>
                  </li>
                  <li className='menu-item'>
                    <a
                      onClick={() => setIsOpen(false)}
                      href='/worker-landing#contact'
                      className='menu-scroll inline-flex items-center text-base font-medium text-black hover:text-redpraha   lg:py-7'>
                      support
                    </a>
                  </li>
                  <li>
                    <a
                      href='/worker-onboarding'
                      className='rounded-md text-center bg-redpraha py-[6px] px-[12px] xl:py-[10px] xl:px-[30px] text-base font-bold text-stone-800 hover:bg-opacity-60'>
                      register
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <div className='max-w-7xl mx-auto text-base-content mt-10 p-4'>
        <div className='-mx-6 -mt-6 sm:mx-0 sm:mt-0'>
          <p className='flex py-2 items-center text-2xl font-bold tracking-wider mb-6 w-full px-6 sm:px-0 mt-6 '>
            mission
          </p>
        </div>
        {service ? <ServiceDetail service={service} /> : <Loading />}
      </div>
    </div>
  );
}

export default Service;
