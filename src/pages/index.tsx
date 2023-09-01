import {
  BanknotesIcon,
  BriefcaseIcon,
  ChatBubbleBottomCenterTextIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useState } from 'react';

function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className='bg-white text-black'>
      <header className='navbar fixed top-0 left-0 z-50 w-full border-stroke bg-white duration-300'>
        <div className='container relative lg:max-w-[1305px] lg:px-10'>
          <div className='flex items-center justify-between'>
            <div className='block py-4 lg:py-0'>
              <a href='index.html' className='block max-w-[145px] sm:max-w-[180px]'>
                <Image src='/logo-text-dark.png' alt='logo' width={125} height={15} />
              </a>
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
                      href='#features'
                      className='menu-scroll inline-flex items-center text-base font-medium text-black hover:text-redpraha   lg:py-7'>
                      Features
                    </a>
                  </li>
                  <li className='menu-item'>
                    <a
                      onClick={() => setIsOpen(false)}
                      href='#about'
                      className='menu-scroll inline-flex items-center text-base font-medium text-black hover:text-redpraha   lg:py-7'>
                      About
                    </a>
                  </li>
                  <li className='menu-item'>
                    <a
                      onClick={() => setIsOpen(false)}
                      href='#work-process'
                      className='menu-scroll inline-flex items-center text-base font-medium text-black hover:text-redpraha   lg:py-7'>
                      How It Works
                    </a>
                  </li>
                  <li className='menu-item'>
                    <a
                      onClick={() => setIsOpen(false)}
                      href='#faq'
                      className='menu-scroll inline-flex items-center text-base font-medium text-black hover:text-redpraha   lg:py-7'>
                      Support
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            <div className='mr-[60px] flex items-center justify-end lg:mr-0'>
              <a
                href='/dashboard'
                className='rounded-md bg-redpraha py-[6px] px-[12px] xl:py-[10px] xl:px-[30px] text-base font-medium text-white hover:bg-opacity-90'>
                Use The App
              </a>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section id='home' className='pt-[165px]'>
          <div className='container lg:max-w-[1305px] lg:px-10'>
            <div className='-mx-4 flex flex-wrap items-center'>
              <div className='w-full px-4 lg:w-7/12'>
                <div className='wow fadeInUp mb-12 lg:mb-0 lg:max-w-[570px]' data-wow-delay='.2s'>
                  <span className='mb-5 block text-2xl font-medium leading-tight text-black sm:text-[40px] md:text-[50px] lg:text-[42px] xl:text-[50px]'>
                    to fight misinformation in the age of AI...
                  </span>
                  <h1 className='mb-6 text-5xl font-bold leading-tight text-black  sm:text-[50px] md:text-[70px] lg:text-[52px] xl:text-[60px]'>
                    we need{' '}
                    <span className='inline bg-redpraha bg-clip-text text-transparent'>
                      {' '}
                      authentic
                    </span>
                    photos from
                    <span className='inline bg-redpraha bg-clip-text text-transparent mx-2'>
                      real
                    </span>
                    people
                  </h1>
                  <p className='mb-10 max-w-[475px] text-base leading-relaxed text-body'>
                    Proof of Photo helps people earn from sharing real photos with the news
                    organizations that need them the most
                  </p>

                  <div className='flex flex-wrap items-center'>
                    <a
                      target='_blank'
                      href='https://github.com/orgs/Witness-Market/repositories'
                      className='mr-6 mb-6 inline-flex h-[60px] items-center rounded-lg bg-black py-[14px] px-[30px] text-white hover:bg-opacity-90'>
                      <span className='mr-[18px] border-r border-stroke border-opacity-40 pr-[18px] leading-relaxed '>
                        View on Github
                      </span>
                      <span>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='24'
                          height='24'
                          viewBox='0 0 24 24'>
                          <path
                            fill='#FFF'
                            d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'
                          />
                        </svg>
                      </span>
                    </a>
                    <a
                      target='_blank'
                      href='https://github.com/TalentLayer-Labs/starter-kit'
                      className='mr-6 mb-6 inline-flex h-[60px] items-center rounded-lg bg-redpraha py-[14px] px-[30px] text-white hover:bg-opacity-90'>
                      Use the App
                    </a>

                    {/* <a
                      href='javascript:void(0)'
                      className='glightbox mb-6 inline-flex items-center py-4 text-black hover:text-primary '>
                      <span className='mr-[12px] flex h-[56px] w-[56px] items-center justify-center rounded-full border-2 border-current'>
                        <svg
                          width='14'
                          height='16'
                          viewBox='0 0 14 16'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'>
                          <path
                            d='M13.5 7.06367C14.1667 7.44857 14.1667 8.41082 13.5 8.79572L1.5 15.7239C0.833334 16.1088 -3.3649e-08 15.6277 0 14.8579L6.05683e-07 1.00149C6.39332e-07 0.231693 0.833334 -0.249434 1.5 0.135466L13.5 7.06367Z'
                            fill='currentColor'
                          />
                        </svg>
                      </span>
                      <span className='text-base font-medium'>
                        <span className='block text-sm'> Watch Demo </span>
                        See how it works
                      </span>
                    </a> */}
                  </div>
                </div>
              </div>

              <div className='w-full px-4 lg:w-5/12'>
                <div
                  className='wow fadeInUp relative z-10 mx-auto w-full max-w-[530px] pt-8 lg:mr-0'
                  data-wow-delay='.3s'>
                  <img
                    src='/images/home/hero/hero-light.png'
                    alt='hero image'
                    className='mx-auto max-w-full'
                  />
                  <div className='max-auto absolute top-0 left-0 right-0 -z-10 aspect-square w-full rounded-full bg-redpraha'>
                    <div className='absolute bottom-10 left-0'></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id='about' className='relative pt-[150px]'>
          <div className='container lg:max-w-[1120px]'>
            <div>
              <div className='-mx-4 flex flex-wrap items-center justify-between'>
                <div className='w-full px-4 lg:w-1/2'>
                  <div
                    className='wow fadeInUp relative z-10 mx-auto mb-14 w-full max-w-[470px] pb-6 lg:mx-0 lg:mb-0'
                    data-wow-delay='.2s'>
                    <img
                      src='/images/home/about/about-1-light.png'
                      alt='about image'
                      className='mx-auto max-w-full'
                    />
                  </div>
                </div>

                <div className='w-full px-4 lg:w-1/2'>
                  <div className='wow fadeInUp lg:ml-auto lg:max-w-[510px]' data-wow-delay='.3s'>
                    <h2 className='mb-4 text-3xl font-bold text-black  sm:text-4xl md:text-[44px] md:leading-tight'>
                      powerful tools for authenticating the truth
                    </h2>
                    <div className='mb-[30px] flex items-center'>
                      <div className='shrink-0 mr-3 flex h-[60px] w-[60px] items-center justify-center rounded-full border border-stroke text-xl font-semibold text-black text-center '>
                        01
                      </div>
                      <div>
                        <h5 className='text-xl font-medium text-black '>
                          combating AI-based misinformation campaigns
                        </h5>
                        <p className='text-base text-body'>
                          it's now easier than ever to create images that evidence fake events or
                          inaccurate depictions of the truth. AI has caused us to question our
                          reality in a way that we didn't have to before - this has caused many
                          issues for news organizations. many major publications have been caught
                          accidentally posting images that were creted or doctored by AI. now, with
                          Proof of Photo, publications can guarantee that photos were not doctored,
                          regardless of their origin.
                        </p>
                      </div>
                    </div>

                    <div className='flex items-center'>
                      <div className='shrink-0 mr-3 flex h-[60px] w-[60px] items-center justify-center rounded-full border border-stroke text-xl font-semibold text-black  '>
                        02
                      </div>
                      <div>
                        <h5 className='text-xl font-medium text-black '>
                          empowering activist reporting
                        </h5>
                        <p className='text-base text-body'>
                          in the past, it was hard for publications to accept photographs taken by
                          reporters that the publication didn't have a prior relationship with. this
                          is because the authenticity of photos was difficult to proove. now,
                          publications can accept images from anyone thanks to C2PA technology and
                          Proof of Photo.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='absolute right-0 top-36 -z-10'>
            <svg
              width='95'
              height='190'
              viewBox='0 0 95 190'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <circle cx='95' cy='95' r='77' stroke='url(#paint0_linear_47_27)' strokeWidth='36' />
              <defs>
                <linearGradient
                  id='paint0_linear_47_27'
                  x1='0'
                  y1='0'
                  x2='224.623'
                  y2='130.324'
                  gradientUnits='userSpaceOnUse'>
                  <stop stopColor='#FF8FE8' />
                  <stop offset='1' stopColor='#FFC960' />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </section>

        <section id='features' className='relative z-10 pt-[110px]'>
          <div className='container'>
            <div
              className='wow fadeInUp mx-auto mb-14 max-w-[690px] text-center lg:mb-[70px]'
              data-wow-delay='.2s'>
              <div
                className='wow fadeInUp relative mx-auto mb-10 w-full max-w-[530px]'
                data-wow-delay='.3s'>
                <img src='/logo-text-dark.png' alt='hero image' className='mx-auto max-w-full' />
              </div>
              <h2 className='mb-4 text-3xl font-bold text-black  sm:text-4xl md:text-[44px] md:leading-tight'>
                the marketplace empowering organizations to source and validate hard-to-get images
              </h2>
              <p className='text-base text-body'>
                Proof of Photo is a marketplace where news organizations can request photos of
                specific events, local photographers can upload and verify images - earning from
                each photo they submit.
              </p>
            </div>
          </div>

          <div className='container max-w-[1390px]'>
            <div className='rounded-2xl bg-white px-5 pt-14 pb-14 shadow-md md:pb-1 lg:pt-20 lg:pb-5 xl:px-10'>
              <div className='-mx-4 flex flex-wrap'>
                <div className='w-full px-4 md:w-1/2 lg:w-1/3'>
                  <div
                    className='wow fadeInUp group mx-auto mb-[60px] max-w-[310px] text-center'
                    data-wow-delay='.4s'>
                    <div className='mx-auto mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-3xl bg-redpraha bg-opacity-20 text-redpraha duration-300 group-hover:bg-redpraha group-hover:text-white   '>
                      <BriefcaseIcon width={48} height={48} />
                    </div>
                    <h3 className='mb-4 text-xl font-semibold text-black  sm:text-[22px] xl:text-[26px]'>
                      news orgs post requests for photos they need
                    </h3>
                    <p className='text-base text-body'>
                      instead of sending reporters to conflict zones, news orgs can make photo
                      requests, which are then searchable by locals in the target geography
                    </p>
                  </div>
                </div>

                <div className='w-full px-4 md:w-1/2 lg:w-1/3'>
                  <div
                    className='wow fadeInUp group mx-auto mb-[60px] max-w-[310px] text-center'
                    data-wow-delay='.3s'>
                    <div className='mx-auto mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-3xl bg-redpraha bg-opacity-20 text-redpraha duration-300 group-hover:bg-redpraha group-hover:text-white   '>
                      <img
                        src='/logo.png'
                        alt='author'
                        className='h-full w-full object-cover object-center'
                      />
                    </div>
                    <h3 className='mb-4 text-xl font-semibold text-black  sm:text-[22px] xl:text-[26px]'>
                      C2PA anti-AI image verification
                    </h3>
                    <p className='text-base text-body'>
                      C2PA is an image validation standard that helps us validate if an image was AI
                      generated or not, and if it came from a specific location
                    </p>
                  </div>
                </div>
                <div className='w-full px-4 md:w-1/2 lg:w-1/3'>
                  <div
                    className='wow fadeInUp group mx-auto mb-[60px] max-w-[310px] text-center'
                    data-wow-delay='.2s'>
                    <div className='mx-auto mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-3xl bg-redpraha bg-opacity-20 text-redpraha duration-300 group-hover:bg-redpraha group-hover:text-white   '>
                      <BanknotesIcon width={48} height={48} />
                    </div>
                    <h3 className='mb-4 text-xl font-semibold text-black  sm:text-[22px] xl:text-[26px]'>
                      secured escrow to pay out photographers
                    </h3>
                    <p className='text-base text-body'>
                      photographers can earn cryptocurrency - this means that even when banking
                      infra is down in conflice zones, people can still earn a living
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='absolute top-0 right-0 -z-10'>
            <svg
              width='602'
              height='1154'
              viewBox='0 0 602 1154'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <g opacity='0.25' filter='url(#filter0_f_26_84)'>
                <circle cx='577' cy='577' r='317' fill='url(#paint0_linear_26_84)' />
              </g>
              <defs>
                <filter
                  id='filter0_f_26_84'
                  x='0'
                  y='0'
                  width='1154'
                  height='1154'
                  filterUnits='userSpaceOnUse'
                  colorInterpolationFilters='sRGB'>
                  <feFlood floodOpacity='0' result='BackgroundImageFix' />
                  <feBlend
                    mode='normal'
                    in='SourceGraphic'
                    in2='BackgroundImageFix'
                    result='shape'
                  />
                  <feGaussianBlur stdDeviation='130' result='effect1_foregroundBlur_26_84' />
                </filter>
                <linearGradient
                  id='paint0_linear_26_84'
                  x1='183.787'
                  y1='894'
                  x2='970.173'
                  y2='346.491'
                  gradientUnits='userSpaceOnUse'>
                  <stop stopColor='#8EA5FE' />
                  <stop offset='0.541667' stopColor='#BEB3FD' />
                  <stop offset='1' stopColor='#90D1FF' />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className='absolute left-0 -bottom-1/2 -z-10 hidden md:block'>
            <svg
              width='622'
              height='1236'
              viewBox='0 0 622 1236'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <g opacity='0.2' filter='url(#filter0_f_26_85)'>
                <circle cx='4' cy='618' r='368' fill='url(#paint0_linear_26_85)' />
              </g>
              <defs>
                <filter
                  id='filter0_f_26_85'
                  x='-614'
                  y='0'
                  width='1236'
                  height='1236'
                  filterUnits='userSpaceOnUse'
                  colorInterpolationFilters='sRGB'>
                  <feFlood floodOpacity='0' result='BackgroundImageFix' />
                  <feBlend
                    mode='normal'
                    in='SourceGraphic'
                    in2='BackgroundImageFix'
                    result='shape'
                  />
                  <feGaussianBlur stdDeviation='125' result='effect1_foregroundBlur_26_85' />
                </filter>
                <linearGradient
                  id='paint0_linear_26_85'
                  x1='-364'
                  y1='250'
                  x2='506.12'
                  y2='754.835'
                  gradientUnits='userSpaceOnUse'>
                  <stop stopColor='#FF8FE8' />
                  <stop offset='1' stopColor='#FFC960' />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </section>

        <section id='work-process' className='relative z-10 pt-[110px]'>
          <div className='container'>
            <div
              className='wow fadeInUp mx-auto mb-14 max-w-[690px] text-center lg:mb-[70px]'
              data-wow-delay='.2s'>
              <h2 className='mb-4 text-3xl font-bold text-black  sm:text-4xl md:text-[44px] md:leading-tight'>
                combining innovative technologies for a global impact
              </h2>
            </div>
          </div>

          <div className='container max-w-[1390px]'>
            <div className='rounded-2xl bg-white px-5 pt-14 pb-14 shadow-md md:pb-1 lg:pt-20 lg:pb-5 xl:px-10'>
              <div className='-mx-4 flex flex-wrap justify-center'>
                <div className='w-full px-4 md:w-1/2 lg:w-1/3'>
                  <div
                    className='wow fadeInUp group mx-auto mb-[60px] max-w-[310px] text-center'
                    data-wow-delay='.2s'>
                    <div className='mx-auto mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-3xl bg-redpraha bg-opacity-20 text-redpraha duration-300 group-hover:bg-redpraha group-hover:text-white   '>
                      <img
                        src='/logo.png'
                        alt='author'
                        className='h-full w-full object-cover object-center'
                      />
                    </div>
                    <h3 className='mb-4 text-xl font-semibold text-black  sm:text-[22px] xl:text-[26px]'>
                      Request Network
                    </h3>
                    <p className='text-base text-body'>
                      All the code is fully open source, you can use it for any purposes,{' '}
                      <a
                        className='underline'
                        target='_blank'
                        href='https://docs.talentlayer.org/get-a-platform-id'>
                        it's here
                      </a>
                    </p>
                  </div>
                </div>

                <div className='w-full px-4 md:w-1/2 lg:w-1/3'>
                  <div
                    className='wow fadeInUp group mx-auto mb-[60px] max-w-[310px] text-center'
                    data-wow-delay='.3s'>
                    <div className='mx-auto mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-3xl bg-redpraha bg-opacity-20 text-redpraha duration-300 group-hover:bg-redpraha group-hover:text-white   '>
                      <img
                        src='/logo.png'
                        alt='author'
                        className='h-full w-full object-cover object-center'
                      />
                    </div>
                    <h3 className='mb-4 text-xl font-semibold text-black  sm:text-[22px] xl:text-[26px]'>
                      C2PA
                    </h3>
                    <p className='text-base text-body'>
                      Setup your local environnement by copying the .env.example and adjust the
                      variables
                    </p>
                  </div>
                </div>

                <div className='w-full px-4 md:w-1/2 lg:w-1/3'>
                  <div
                    className='wow fadeInUp group mx-auto mb-[60px] max-w-[310px] text-center'
                    data-wow-delay='.4s'>
                    <div className='mx-auto mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-3xl bg-redpraha bg-opacity-20 text-redpraha duration-300 group-hover:bg-redpraha group-hover:text-white   '>
                      <img
                        src='/logo.png'
                        alt='author'
                        className='h-full w-full object-cover object-center'
                      />
                    </div>
                    <h3 className='mb-4 text-xl font-semibold text-black  sm:text-[22px] xl:text-[26px]'>
                      TalentLayer
                    </h3>
                    <p className='text-base text-body'>
                      You can now start coding and improve the basic messaging system with your
                      incredible features!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='absolute -top-28 left-0 -z-10 hidden md:block'>
            <svg
              width='632'
              height='1179'
              viewBox='0 0 632 1179'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <g opacity='0.25' filter='url(#filter0_f_38_24)'>
                <circle cx='42.5' cy='589.5' r='329.5' fill='url(#paint0_linear_38_24)' />
              </g>
              <defs>
                <filter
                  id='filter0_f_38_24'
                  x='-547'
                  y='0'
                  width='1179'
                  height='1179'
                  filterUnits='userSpaceOnUse'
                  colorInterpolationFilters='sRGB'>
                  <feFlood floodOpacity='0' result='BackgroundImageFix' />
                  <feBlend
                    mode='normal'
                    in='SourceGraphic'
                    in2='BackgroundImageFix'
                    result='shape'
                  />
                  <feGaussianBlur stdDeviation='130' result='effect1_foregroundBlur_38_24' />
                </filter>
                <linearGradient
                  id='paint0_linear_38_24'
                  x1='-366.218'
                  y1='919'
                  x2='451.176'
                  y2='349.901'
                  gradientUnits='userSpaceOnUse'>
                  <stop stopColor='#8EA5FE' />
                  <stop offset='0.541667' stopColor='#BEB3FD' />
                  <stop offset='1' stopColor='#90D1FF' />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className='absolute right-0 top-20 -z-10'>
            <svg
              width='637'
              height='1277'
              viewBox='0 0 637 1277'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <g opacity='0.2' filter='url(#filter0_f_38_23)'>
                <circle cx='638.5' cy='638.5' r='388.5' fill='url(#paint0_linear_38_23)' />
              </g>
              <defs>
                <filter
                  id='filter0_f_38_23'
                  x='0'
                  y='0'
                  width='1277'
                  height='1277'
                  filterUnits='userSpaceOnUse'
                  colorInterpolationFilters='sRGB'>
                  <feFlood floodOpacity='0' result='BackgroundImageFix' />
                  <feBlend
                    mode='normal'
                    in='SourceGraphic'
                    in2='BackgroundImageFix'
                    result='shape'
                  />
                  <feGaussianBlur stdDeviation='125' result='effect1_foregroundBlur_38_23' />
                </filter>
                <linearGradient
                  id='paint0_linear_38_23'
                  x1='250'
                  y1='250'
                  x2='1168.59'
                  y2='782.957'
                  gradientUnits='userSpaceOnUse'>
                  <stop stopColor='#FF8FE8' />
                  <stop offset='1' stopColor='#FFC960' />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </section>

        <section id='testimonials' className='relative z-10 pt-[110px] pb-[60px]'>
          <div className='container'>
            <div
              className='wow fadeInUp mx-auto mb-14 max-w-[690px] text-center lg:mb-[70px]'
              data-wow-delay='.2s'>
              <h2 className='mb-4 text-3xl font-bold text-black  sm:text-4xl md:text-[44px] md:leading-tight'>
                What Dev's Say
              </h2>
              <p className='text-base text-body'>
                We highly value feedback from our users as it plays a crucial role in enhancing our
                starter kit, refining the user experience, and continuously improving the features
                and functionality to meet the evolving needs of our community.
              </p>
            </div>
          </div>

          <div className='container overflow-hidden lg:max-w-[1160px]'>
            <div className='-mx-6 flex flex-wrap'>
              <div className='w-full px-6 lg:w-1/2'>
                <div
                  className='wow fadeInUp mb-[50px] rounded-lg bg-white py-9 px-7 shadow-md sm:px-9 lg:px-7 xl:px-9'
                  data-wow-delay='.2s'>
                  <div className='mb-5 border-b border-stroke'>
                    <p className='pb-9 text-base text-body'>
                      The integration process of the TalentLayer and XMTP protocols was seamless
                      using your starter kit. It saved us a significant amount of time and effort,
                      allowing us to focus more on building unique features for our dapp. The
                      documentation provided was clear and comprehensive, making it easy for our
                      development team to understand and utilize the kit effectively.
                    </p>
                  </div>

                  <div className='items-center justify-between sm:flex lg:block xl:flex'>
                    <div className='mb-4 flex items-center sm:mb-0 lg:mb-4 xl:mb-0'>
                      <div className='mr-4 h-[56px] w-full max-w-[56px] rounded-full'>
                        <img
                          src='/images/home/testimonials/author-1.png'
                          alt='author'
                          className='h-full w-full object-cover object-center'
                        />
                      </div>
                      <div>
                        <h5 className='text-base font-medium text-black '>Martin</h5>
                        <p className='text-sm text-body'>Fullstack dev</p>
                      </div>
                    </div>

                    <div className='flex items-center space-x-3 sm:justify-end lg:justify-start xl:justify-end'>
                      <p className='text-base font-medium text-black '>5.0</p>
                      <div className='flex items-center space-x-[6px]'>
                        <span>
                          <svg
                            width='20'
                            height='20'
                            viewBox='0 0 20 20'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'>
                            <g clipPath='url(#clip0_49_480)'>
                              <path
                                d='M10 15.2171L4.1225 18.5071L5.435 11.9004L0.489166 7.32712L7.17833 6.53378L10 0.417114L12.8217 6.53378L19.5108 7.32712L14.565 11.9004L15.8775 18.5071L10 15.2171Z'
                                fill='#EABF23'
                              />
                            </g>
                            <defs>
                              <clipPath id='clip0_49_480'>
                                <rect
                                  width='20'
                                  height='20'
                                  fill='white'
                                  transform='translate(0 0.000488281)'
                                />
                              </clipPath>
                            </defs>
                          </svg>
                        </span>
                        <span>
                          <svg
                            width='20'
                            height='20'
                            viewBox='0 0 20 20'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'>
                            <g clipPath='url(#clip0_49_480)'>
                              <path
                                d='M10 15.2171L4.1225 18.5071L5.435 11.9004L0.489166 7.32712L7.17833 6.53378L10 0.417114L12.8217 6.53378L19.5108 7.32712L14.565 11.9004L15.8775 18.5071L10 15.2171Z'
                                fill='#EABF23'
                              />
                            </g>
                            <defs>
                              <clipPath id='clip0_49_480'>
                                <rect
                                  width='20'
                                  height='20'
                                  fill='white'
                                  transform='translate(0 0.000488281)'
                                />
                              </clipPath>
                            </defs>
                          </svg>
                        </span>
                        <span>
                          <svg
                            width='20'
                            height='20'
                            viewBox='0 0 20 20'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'>
                            <g clipPath='url(#clip0_49_480)'>
                              <path
                                d='M10 15.2171L4.1225 18.5071L5.435 11.9004L0.489166 7.32712L7.17833 6.53378L10 0.417114L12.8217 6.53378L19.5108 7.32712L14.565 11.9004L15.8775 18.5071L10 15.2171Z'
                                fill='#EABF23'
                              />
                            </g>
                            <defs>
                              <clipPath id='clip0_49_480'>
                                <rect
                                  width='20'
                                  height='20'
                                  fill='white'
                                  transform='translate(0 0.000488281)'
                                />
                              </clipPath>
                            </defs>
                          </svg>
                        </span>
                        <span>
                          <svg
                            width='20'
                            height='20'
                            viewBox='0 0 20 20'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'>
                            <g clipPath='url(#clip0_49_480)'>
                              <path
                                d='M10 15.2171L4.1225 18.5071L5.435 11.9004L0.489166 7.32712L7.17833 6.53378L10 0.417114L12.8217 6.53378L19.5108 7.32712L14.565 11.9004L15.8775 18.5071L10 15.2171Z'
                                fill='#EABF23'
                              />
                            </g>
                            <defs>
                              <clipPath id='clip0_49_480'>
                                <rect
                                  width='20'
                                  height='20'
                                  fill='white'
                                  transform='translate(0 0.000488281)'
                                />
                              </clipPath>
                            </defs>
                          </svg>
                        </span>
                        <span>
                          <svg
                            width='20'
                            height='20'
                            viewBox='0 0 20 20'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'>
                            <g clipPath='url(#clip0_49_480)'>
                              <path
                                d='M10 15.2171L4.1225 18.5071L5.435 11.9004L0.489166 7.32712L7.17833 6.53378L10 0.417114L12.8217 6.53378L19.5108 7.32712L14.565 11.9004L15.8775 18.5071L10 15.2171Z'
                                fill='#EABF23'
                              />
                            </g>
                            <defs>
                              <clipPath id='clip0_49_480'>
                                <rect
                                  width='20'
                                  height='20'
                                  fill='white'
                                  transform='translate(0 0.000488281)'
                                />
                              </clipPath>
                            </defs>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='w-full px-6 lg:w-1/2'>
                <div
                  className='wow fadeInUp mb-[50px] rounded-lg bg-white py-9 px-7 shadow-md sm:px-9 lg:px-7 xl:px-9'
                  data-wow-delay='.3s'>
                  <div className='mb-5 border-b border-stroke'>
                    <p className='pb-9 text-base text-body'>
                      We appreciate the value-added features included in your starter kit. The
                      pre-built components and streamlined development environment made it simple to
                      create a great dapp experience quickly. Additionally, the responsiveness of
                      your support team in addressing our queries and providing guidance was
                      outstanding. <br />
                      Thank you :)
                    </p>
                  </div>

                  <div className='items-center justify-between sm:flex lg:block xl:flex'>
                    <div className='mb-4 flex items-center sm:mb-0 lg:mb-4 xl:mb-0'>
                      <div className='mr-4 h-[56px] w-full max-w-[56px] rounded-full'>
                        <img
                          src='/images/home/testimonials/author-2.png'
                          alt='author'
                          className='h-full w-full object-cover object-center'
                        />
                      </div>
                      <div>
                        <h5 className='text-base font-medium text-black '>Tonio</h5>
                        <p className='text-sm text-body'>Entreprener</p>
                      </div>
                    </div>

                    <div className='flex items-center space-x-3 sm:justify-end lg:justify-start xl:justify-end'>
                      <p className='text-base font-medium text-black '>5.0</p>
                      <div className='flex items-center space-x-[6px]'>
                        <span>
                          <svg
                            width='20'
                            height='20'
                            viewBox='0 0 20 20'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'>
                            <g clipPath='url(#clip0_49_480)'>
                              <path
                                d='M10 15.2171L4.1225 18.5071L5.435 11.9004L0.489166 7.32712L7.17833 6.53378L10 0.417114L12.8217 6.53378L19.5108 7.32712L14.565 11.9004L15.8775 18.5071L10 15.2171Z'
                                fill='#EABF23'
                              />
                            </g>
                            <defs>
                              <clipPath id='clip0_49_480'>
                                <rect
                                  width='20'
                                  height='20'
                                  fill='white'
                                  transform='translate(0 0.000488281)'
                                />
                              </clipPath>
                            </defs>
                          </svg>
                        </span>
                        <span>
                          <svg
                            width='20'
                            height='20'
                            viewBox='0 0 20 20'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'>
                            <g clipPath='url(#clip0_49_480)'>
                              <path
                                d='M10 15.2171L4.1225 18.5071L5.435 11.9004L0.489166 7.32712L7.17833 6.53378L10 0.417114L12.8217 6.53378L19.5108 7.32712L14.565 11.9004L15.8775 18.5071L10 15.2171Z'
                                fill='#EABF23'
                              />
                            </g>
                            <defs>
                              <clipPath id='clip0_49_480'>
                                <rect
                                  width='20'
                                  height='20'
                                  fill='white'
                                  transform='translate(0 0.000488281)'
                                />
                              </clipPath>
                            </defs>
                          </svg>
                        </span>
                        <span>
                          <svg
                            width='20'
                            height='20'
                            viewBox='0 0 20 20'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'>
                            <g clipPath='url(#clip0_49_480)'>
                              <path
                                d='M10 15.2171L4.1225 18.5071L5.435 11.9004L0.489166 7.32712L7.17833 6.53378L10 0.417114L12.8217 6.53378L19.5108 7.32712L14.565 11.9004L15.8775 18.5071L10 15.2171Z'
                                fill='#EABF23'
                              />
                            </g>
                            <defs>
                              <clipPath id='clip0_49_480'>
                                <rect
                                  width='20'
                                  height='20'
                                  fill='white'
                                  transform='translate(0 0.000488281)'
                                />
                              </clipPath>
                            </defs>
                          </svg>
                        </span>
                        <span>
                          <svg
                            width='20'
                            height='20'
                            viewBox='0 0 20 20'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'>
                            <g clipPath='url(#clip0_49_480)'>
                              <path
                                d='M10 15.2171L4.1225 18.5071L5.435 11.9004L0.489166 7.32712L7.17833 6.53378L10 0.417114L12.8217 6.53378L19.5108 7.32712L14.565 11.9004L15.8775 18.5071L10 15.2171Z'
                                fill='#EABF23'
                              />
                            </g>
                            <defs>
                              <clipPath id='clip0_49_480'>
                                <rect
                                  width='20'
                                  height='20'
                                  fill='white'
                                  transform='translate(0 0.000488281)'
                                />
                              </clipPath>
                            </defs>
                          </svg>
                        </span>
                        <span>
                          <svg
                            width='20'
                            height='20'
                            viewBox='0 0 20 20'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'>
                            <g clipPath='url(#clip0_49_480)'>
                              <path
                                d='M10 15.2171L4.1225 18.5071L5.435 11.9004L0.489166 7.32712L7.17833 6.53378L10 0.417114L12.8217 6.53378L19.5108 7.32712L14.565 11.9004L15.8775 18.5071L10 15.2171Z'
                                fill='#EABF23'
                              />
                            </g>
                            <defs>
                              <clipPath id='clip0_49_480'>
                                <rect
                                  width='20'
                                  height='20'
                                  fill='white'
                                  transform='translate(0 0.000488281)'
                                />
                              </clipPath>
                            </defs>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id='faq' className='relative z-10 bg-[#F8FAFB] py-[110px] '>
          <div className='container'>
            <div
              className='wow fadeInUp mx-auto mb-14 max-w-[690px] text-center lg:mb-[70px]'
              data-wow-delay='.2s'>
              <h2 className='mb-4 text-3xl font-bold text-black  sm:text-4xl md:text-[44px] md:leading-tight'>
                Frequently Asked Questions
              </h2>
              <p className='text-base text-body'>
                Find answers to commonly asked questions about our Next.js starter kit for
                TalentLayer and XMTP integration, helping you navigate through the implementation
                process and make the most out of the powerful features provided.
              </p>
            </div>

            <div
              className='faqs wow fadeInUp mx-auto w-full max-w-[785px] rounded-lg bg-white px-6 py-[6px] shadow-car'
              data-wow-delay='.3s'>
              <div className='faq border-b border-stroke last-of-type:border-none'>
                <button className='faq-btn relative flex w-full justify-between pt-6 pb-1 px-[18px] text-left text-base font-medium text-black  sm:px-[26px] sm:text-lg'>
                  Are there any specific requirements or dependencies for using the starter kit?
                </button>
                <div className='pb-4 h-auto overflow-hidden px-[18px] sm:px-[26px]'>
                  <p className='text-base text-body'>Just NodeJS & npm</p>
                </div>
              </div>

              <div className='faq border-b border-stroke last-of-type:border-none'>
                <button className='faq-btn relative flex w-full justify-between pt-6 pb-1 px-[18px] text-left text-base font-medium text-black  sm:px-[26px] sm:text-lg'>
                  Do I need an admin account for XMTP?
                </button>
                <div className='pb-4 h-auto overflow-hidden px-[18px] sm:px-[26px]'>
                  <p className='text-base text-body'>
                    No, you do not need an admin account to use XMTP. The XMTP protocol is designed
                    to be plug and play, allowing users to seamlessly integrate and utilize its
                    functionality without the need for an admin account.
                  </p>
                </div>
              </div>

              <div className='faq border-b border-stroke last-of-type:border-none'>
                <button className='faq-btn relative flex w-full justify-between pt-6 pb-1 px-[18px] text-left text-base font-medium text-black  sm:px-[26px] sm:text-lg'>
                  Can I extend the review system to include additional criteria or metrics?
                </button>
                <div className='pb-4 h-auto overflow-hidden px-[18px] sm:px-[26px]'>
                  <p className='text-base text-body'>
                    Yes, TalentLayer the minimum viable for interoperability. You can add any other
                    fields in the IPFS json linked to a review. This is also the case for user
                    profile and service data.
                  </p>
                </div>
              </div>

              <div className='faq border-b border-stroke last-of-type:border-none'>
                <button className='faq-btn relative flex w-full justify-between pt-6 pb-1 px-[18px] text-left text-base font-medium text-black  sm:px-[26px] sm:text-lg'>
                  Do I need a TalentLayer platform Id?
                </button>
                <div className='pb-4 h-auto overflow-hidden px-[18px] sm:px-[26px]'>
                  <p className='text-base text-body'>
                    Yes it's better to mint your platformId, it will let you configure your
                    platform, define fees and other important setup.{' '}
                    <a className='underline' href='https://docs.talentlayer.org/get-a-platform-id'>
                      See more here
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='absolute right-0 -top-24 -z-10'>
            <svg
              width='95'
              height='190'
              viewBox='0 0 95 190'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <circle cx='95' cy='95' r='77' stroke='url(#paint0_linear_49_603)' strokeWidth='36' />
              <defs>
                <linearGradient
                  id='paint0_linear_49_603'
                  x1='0'
                  y1='0'
                  x2='224.623'
                  y2='130.324'
                  gradientUnits='userSpaceOnUse'>
                  <stop stopColor='#FF8FE8' />
                  <stop offset='1' stopColor='#FFC960' />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className='absolute left-0 -bottom-24 -z-10'>
            <svg
              width='95'
              height='190'
              viewBox='0 0 95 190'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <circle cy='95' r='77' stroke='url(#paint0_linear_52_83)' strokeWidth='36' />
              <defs>
                <linearGradient
                  id='paint0_linear_52_83'
                  x1='-117.84'
                  y1='190'
                  x2='117.828'
                  y2='25.9199'
                  gradientUnits='userSpaceOnUse'>
                  <stop stopColor='#0f172a' />
                  <stop stopColor='#FF8FE8' />
                  <stop offset='1' stopColor='#FFC960' />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </section>

        <section id='support' className='pt-[100px] pb-[110px]'>
          <div className='container'>
            <div
              className='wow fadeInUp mx-auto mb-10 max-w-[690px] text-center'
              data-wow-delay='.2s'>
              <h2 className='mb-4 text-3xl font-bold text-black  sm:text-4xl md:text-[44px] md:leading-tight'>
                Need any help?
              </h2>
              <p className='text-base text-body'>
                Please contact us on the hackhathon discords or direclty inside the dapp using xmtp
                support conversation :)
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className='wow fadeInUp bg-redpraha py-7' data-wow-delay='.2s'>
          <div className='container max-w-[1390px]'>
            <div className='-mx-3 flex flex-wrap'>
              <div className='order-last w-full px-3 lg:order-first lg:w-1/3'>
                <p className='mt-4 text-center text-base text-white lg:mt-0 lg:text-left'>
                  &copy; 2023 Proof of Picture
                </p>
              </div>

              <div className='w-full px-3 md:w-1/2 lg:w-1/3'>
                <div className='mb-4 flex items-center justify-center space-x-5 md:mb-0 md:justify-start lg:justify-center'>
                  <a
                    href='https://twitter.com/TalentLayer'
                    className='text-white opacity-70 hover:opacity-100'
                    target='_blank'
                    aria-label='social icon'>
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'>
                      <g clipPath='url(#clip0_53_166)'>
                        <path
                          d='M22.162 5.65593C21.3986 5.99362 20.589 6.2154 19.76 6.31393C20.6337 5.79136 21.2877 4.96894 21.6 3.99993C20.78 4.48793 19.881 4.82993 18.944 5.01493C18.3146 4.34151 17.4804 3.89489 16.571 3.74451C15.6615 3.59413 14.7279 3.74842 13.9153 4.18338C13.1026 4.61834 12.4564 5.30961 12.0771 6.14972C11.6978 6.98983 11.6067 7.93171 11.818 8.82893C10.1551 8.74558 8.52833 8.31345 7.04329 7.56059C5.55824 6.80773 4.24813 5.75098 3.198 4.45893C2.82629 5.09738 2.63095 5.82315 2.632 6.56193C2.632 8.01193 3.37 9.29293 4.492 10.0429C3.82801 10.022 3.17863 9.84271 2.598 9.51993V9.57193C2.5982 10.5376 2.93237 11.4735 3.54385 12.221C4.15533 12.9684 5.00648 13.4814 5.953 13.6729C5.33661 13.84 4.69031 13.8646 4.063 13.7449C4.32987 14.5762 4.85001 15.3031 5.55059 15.824C6.25118 16.345 7.09713 16.6337 7.97 16.6499C7.10248 17.3313 6.10918 17.8349 5.04688 18.1321C3.98458 18.4293 2.87413 18.5142 1.779 18.3819C3.6907 19.6114 5.9161 20.2641 8.189 20.2619C15.882 20.2619 20.089 13.8889 20.089 8.36193C20.089 8.18193 20.084 7.99993 20.076 7.82193C20.8949 7.2301 21.6016 6.49695 22.163 5.65693L22.162 5.65593Z'
                          fill='white'
                        />
                      </g>
                      <defs>
                        <clipPath id='clip0_53_166'>
                          <rect width='24' height='24' fill='white' />
                        </clipPath>
                      </defs>
                    </svg>
                  </a>

                  <a
                    href='https://twitter.com/xmtp_'
                    className='text-white opacity-70 hover:opacity-100'
                    target='_blank'
                    aria-label='social icon'
                    style={{ transform: `rotateY(180deg)` }}>
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'>
                      <g clipPath='url(#clip0_53_166)'>
                        <path
                          d='M22.162 5.65593C21.3986 5.99362 20.589 6.2154 19.76 6.31393C20.6337 5.79136 21.2877 4.96894 21.6 3.99993C20.78 4.48793 19.881 4.82993 18.944 5.01493C18.3146 4.34151 17.4804 3.89489 16.571 3.74451C15.6615 3.59413 14.7279 3.74842 13.9153 4.18338C13.1026 4.61834 12.4564 5.30961 12.0771 6.14972C11.6978 6.98983 11.6067 7.93171 11.818 8.82893C10.1551 8.74558 8.52833 8.31345 7.04329 7.56059C5.55824 6.80773 4.24813 5.75098 3.198 4.45893C2.82629 5.09738 2.63095 5.82315 2.632 6.56193C2.632 8.01193 3.37 9.29293 4.492 10.0429C3.82801 10.022 3.17863 9.84271 2.598 9.51993V9.57193C2.5982 10.5376 2.93237 11.4735 3.54385 12.221C4.15533 12.9684 5.00648 13.4814 5.953 13.6729C5.33661 13.84 4.69031 13.8646 4.063 13.7449C4.32987 14.5762 4.85001 15.3031 5.55059 15.824C6.25118 16.345 7.09713 16.6337 7.97 16.6499C7.10248 17.3313 6.10918 17.8349 5.04688 18.1321C3.98458 18.4293 2.87413 18.5142 1.779 18.3819C3.6907 19.6114 5.9161 20.2641 8.189 20.2619C15.882 20.2619 20.089 13.8889 20.089 8.36193C20.089 8.18193 20.084 7.99993 20.076 7.82193C20.8949 7.2301 21.6016 6.49695 22.163 5.65693L22.162 5.65593Z'
                          fill='white'
                        />
                      </g>
                      <defs>
                        <clipPath id='clip0_53_166'>
                          <rect width='24' height='24' fill='white' />
                        </clipPath>
                      </defs>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
