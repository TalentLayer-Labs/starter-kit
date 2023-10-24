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
          </div>
        </div>
      </header>

      <main>
        <section id='home' className='pt-[165px]'>
          <div className='container lg:max-w-[1305px] lg:px-10'>
            <div className='-mx-4 flex flex-wrap items-center'>
              <div className='w-full px-4 lg:w-7/12'>
                <div className='wow fadeInUp mb-12 lg:mb-0 lg:max-w-[570px]' data-wow-delay='.2s'>
                  <h1 className='mb-6 text-3xl font-bold leading-tight text-black  sm:text-[40px] md:text-[50px] lg:text-[42px] xl:text-[50px]'>
                    empower
                    <span className='inline bg-landingprimary bg-clip-text text-transparent mx-2'>
                      opens-source contributors
                    </span>
                    to build towards your mission
                  </h1>
                  <p className='mb-10 max-w-[475px] text-base leading-relaxed text-body'>
                    BuilderPlace is your open-source community management platform + contributor
                    discovery engine
                  </p>

                  <div className='flex flex-wrap items-center'>
                    <div className='mr-[60px] flex items-center justify-end lg:mr-0'>
                      <a
                        href='/onboarding'
                        className='rounded-md bg-landingprimary py-[6px] px-[12px] xl:py-[10px] xl:px-[30px] text-base font-medium text-stone-800 hover:bg-opacity-90'>
                        create a BuilderPlace
                      </a>
                      <a
                        href='/worker-onboarding'
                        className='rounded-md bg-endnight ml-2 py-[6px] px-[12px] xl:py-[10px] xl:px-[30px] text-base font-medium text-stone-800 hover:bg-opacity-90'>
                        contribute to projects
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className='w-full px-4 lg:w-5/12'>
                <div
                  className='wow fadeInUp relative z-10 mx-auto w-full max-w-[530px] pt-8 lg:mr-0'
                  data-wow-delay='.3s'>
                  <img
                    src='/images/home/hero/hero-light2.png'
                    alt='hero image'
                    className='hidden lg:block'
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id='work-process' className='relative z-10 pt-[110px]'>
          <div className='container'>
            <div
              className='wow fadeInUp mx-auto mb-14 max-w-[690px] text-center lg:mb-[70px]'
              data-wow-delay='.2s'>
              <h2 className='mb-4 text-3xl font-bold text-black  sm:text-4xl md:text-[44px] md:leading-tight'>
                meet your BuilderPlace
              </h2>
              <p className='text-base text-body'>
                your BuilderPlace helps you kick-start and grow your own passionate community of
                open-source contributors through tools that help new contributors discover you,
                learn your stack, and complete important open work items
              </p>
            </div>
          </div>

          <div className='container max-w-[1390px]'>
            <div className='rounded-2xl bg-white px-5 pt-14 pb-14 shadow-md md:pb-1 lg:pt-20 lg:pb-5 xl:px-10'>
              <div className='-mx-4 flex flex-wrap justify-center'>
                <div className='w-full px-4 md:w-1/2 lg:w-1/2'>
                  <div
                    className='wow fadeInUp group mx-auto mb-[60px] max-w-[510px] text-center'
                    data-wow-delay='.2s'>
                    <div className='mx-auto mb-8 flex h-[250px] w-[350px] items-center justify-center rounded-3 bg-opacity-20 text-redpraha duration-300   '>
                      <img
                        src='/images/iframe.png'
                        alt='about image'
                        className='mx-auto max-w-full'
                      />
                    </div>
                    <h3 className='mb-4 text-xl font-semibold text-black  sm:text-[22px] xl:text-[26px]'>
                      the embed
                    </h3>
                    <p className='text-base text-body pb-5'>
                      an embedable open work board, hosted on your team's own website
                    </p>
                    <div className='pb-6'>
                      <a
                        href='/onboarding'
                        className='rounded-md bg-landingprimary py-[6px] px-[12px] xl:py-[10px] xl:px-[30px] text-base font-medium text-stone-800 hover:bg-opacity-90'>
                        learn more
                      </a>
                    </div>
                    <div
                      className='pt-4 pb-1 wow fadeInUp mb-[50px] rounded-lg bg-endnight shadow-md sm:px-9 lg:px-7 xl:px-9'
                      data-wow-delay='.2s'>
                      <div className='mb-5'>
                        <p className='px-4 text-base text-justify text-body lg:px-0'>
                          🔍 lets contributors find opportunities easily, where they’re already
                          looking
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='w-full px-4 md:w-1/2 lg:w-1/2'>
                  <div
                    className='wow fadeInUp group mx-auto mb-[60px] max-w-[510px] text-center'
                    data-wow-delay='.3s'>
                    <div className='mx-auto mb-8 flex h-[250px] w-[350px] items-center justify-center rounded-3 bg-opacity-20 text-redpraha duration-300   '>
                      <img
                        src='/images/myplace.png'
                        alt='about image'
                        className='mx-auto max-w-full'
                      />
                    </div>
                    <h3 className='mb-4 text-xl font-semibold text-black  sm:text-[22px] xl:text-[26px]'>
                      the place
                    </h3>
                    <p className='text-base text-body pb-5'>
                      a custom-branded open-source contribution center for your community
                    </p>
                    <div className='pb-6'>
                      <a
                        href='/onboarding'
                        className='rounded-md bg-landingprimary py-[6px] px-[12px] xl:py-[10px] xl:px-[30px] text-base font-medium text-stone-800 hover:bg-opacity-90'>
                        learn more
                      </a>
                    </div>
                    <div
                      className='pt-4 pb-1 wow fadeInUp mb-[50px] rounded-lg bg-endnight shadow-md sm:px-9 lg:px-7 xl:px-9'
                      data-wow-delay='.2s'>
                      <div className='mb-5'>
                        <p className='px-4 text-base text-justify text-body lg:px-0'>
                          😄 lets your community have a familiar experience in a place all your own
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='w-full px-4 md:w-1/2 lg:w-1/2'>
                  <div
                    className='wow fadeInUp group mx-auto mb-[60px] max-w-[510px] text-center'
                    data-wow-delay='.4s'>
                    <div className='mx-auto mb-8 flex h-[250px] w-[350px] items-center justify-center rounded-3 bg-opacity-20 text-redpraha duration-300   '>
                      <img
                        src='/images/review.png'
                        alt='about image'
                        className='mx-auto max-w-full'
                      />
                    </div>
                    <h3 className='mb-4 text-xl font-semibold text-black  sm:text-[22px] xl:text-[26px]'>
                      the tools
                    </h3>
                    <p className='text-base text-body pb-5'>
                      evaluate contributors with proposals and reviews, make payments with escrow
                    </p>
                    <div className='pb-6'>
                      <a
                        href='/onboarding'
                        className='rounded-md bg-landingprimary py-[6px] px-[12px] xl:py-[10px] xl:px-[30px] text-base font-medium text-stone-800 hover:bg-opacity-90'>
                        learn more
                      </a>
                    </div>
                    <div
                      className='pt-4 pb-1 wow fadeInUp mb-[50px] rounded-lg bg-endnight shadow-md sm:px-9 lg:px-7 xl:px-9'
                      data-wow-delay='.2s'>
                      <div className='mb-5'>
                        <p className='px-4 text-base text-justify text-body lg:px-0'>
                          💰 get your on secure escrow, with support for all ERC-20 tokens on
                          Polygon
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='w-full px-4 md:w-1/2 lg:w-1/2'>
                  <div
                    className='wow fadeInUp group mx-auto mb-[60px] max-w-[510px] text-center'
                    data-wow-delay='.4s'>
                    <div className='mx-auto mb-8 flex h-[250px] w-[350px] items-center justify-center rounded-3 bg-opacity-20 text-redpraha duration-300   '>
                      <img
                        src='/images/network.png'
                        alt='about image'
                        className='mx-auto max-w-full'
                      />
                    </div>
                    <h3 className='mb-4 text-xl font-semibold text-black  sm:text-[22px] xl:text-[26px]'>
                      the network
                    </h3>
                    <p className='text-base text-body pb-5'>
                      your open work posts are automatically shared across a network of platforms
                    </p>
                    <div className='pb-6'>
                      <a
                        href='/onboarding'
                        className='rounded-md bg-landingprimary py-[6px] px-[12px] xl:py-[10px] xl:px-[30px] text-base font-medium text-stone-800 hover:bg-opacity-90'>
                        learn more
                      </a>
                    </div>
                    <div
                      className='pt-4 pb-1 wow fadeInUp mb-[50px] rounded-lg bg-endnight shadow-md sm:px-9 lg:px-7 xl:px-9'
                      data-wow-delay='.2s'>
                      <div className='mb-5'>
                        <p className='px-4 text-base text-justify text-body lg:px-0'>
                          🌐 this means that more passionate builders can find your open
                          opportunities
                        </p>
                      </div>
                    </div>
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

        <section id='features' className='relative z-10 pt-[110px]'>
          <div className='container'>
            <div
              className='wow fadeInUp mx-auto mb-14 max-w-[690px] text-center lg:mb-[70px]'
              data-wow-delay='.2s'>
              <img src='/images/stats.png' alt='about image' className='mx-auto max-w-full' />
              <h2 className='mb-4 mt-10 text-3xl font-bold text-black  sm:text-4xl md:text-[44px] md:leading-tight'>
                teams like you are onboarding{' '}
                <a class='text-landingprimary'>open-source contributors</a> from across the network
              </h2>
              <img
                src='/images/completed-list.png'
                alt='about image'
                className='mx-auto  mt-10 max-w-full'
              />
            </div>
          </div>
        </section>

        <section id='about' className='relative pt-[150px]'>
          <div
            className='wow fadeInUp mx-auto mb-14 max-w-[690px] text-center lg:mb-[70px]'
            data-wow-delay='.2s'>
            <h2 className='mb-4 mt-10 text-3xl font-bold text-black  sm:text-4xl md:text-[44px] md:leading-tight'>
              create your BuilderPlace <a class='text-landingprimary'>in less than 5 minutes</a>
            </h2>
          </div>
          <div className='container pb-20 lg:max-w-[1120px]'>
            <div>
              <div className='-mx-4 flex flex-wrap items-center justify-between'>
                <div className='w-full px-4 lg:w-1/2'>
                  <div
                    className='wow fadeInUp relative z-10 mx-auto mb-14 w-full max-w-[470px] pb-6 lg:mx-0 lg:mb-0'
                    data-wow-delay='.2s'>
                    <img
                      src='/images/iframe.png'
                      alt='about image'
                      className='mx-auto max-w-full'
                    />
                  </div>
                </div>

                <div className='w-full px-4 lg:w-1/2'>
                  <div className='wow fadeInUp lg:ml-auto lg:max-w-[510px]' data-wow-delay='.3s'>
                    <span className='mb-4 block text-3xl font-medium text-landingprimary md:text-3xl lg:7xl'>
                      step 1
                    </span>
                    <h2 className='mb-4 text-3xl font-bold text-black  sm:text-4xl md:text-[44px] md:leading-tight'>
                      configure your BuilderPlace
                    </h2>
                    <p className='mb-[30px] text-base leading-relaxed text-body'>
                      This project aims to help builders and hackers to start fast on using XMTP and
                      TalentLayer protocols. It contains demo code for all the previous features.
                    </p>

                    <div className='mb-[30px] flex items-center'>
                      <div className='shrink-0 mr-3 flex h-[60px] w-[60px] items-center justify-center rounded-full border border-stroke text-xl font-semibold text-black text-center '>
                        01
                      </div>
                      <div>
                        <h5 className='text-xl font-medium text-black '>
                          In-Chat Bounty Management
                        </h5>
                        <p className='text-base text-body'>
                          a messaging app with native features to manage hiring and paying bounties.
                          Imagine if you could submit your hackathon project, get it approved for a
                          bounty, and receive payment, all with a few DMs, without leaving your
                          messaging app.
                        </p>
                      </div>
                    </div>

                    <div className='flex items-center'>
                      <div className='shrink-0 mr-3 flex h-[60px] w-[60px] items-center justify-center rounded-full border border-stroke text-xl font-semibold text-black  '>
                        02
                      </div>
                      <div>
                        <h5 className='text-xl font-medium text-black '>In-Chat Gig transaction</h5>
                        <p className='text-base text-body'>
                          Imagine an app tailored for freelancers, enabling effortless communication
                          with clients, seamless agreement on gigs, and secure payments all through
                          simple messaging.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='container pb-20 lg:max-w-[1120px]'>
            <div>
              <div className='-mx-4 flex flex-wrap items-center justify-between'>
                <div className='w-full px-4 lg:w-1/2'>
                  <div
                    className='wow fadeInUp relative z-10 mx-auto mb-10 w-full max-w-[470px] lg:mx-0 lg:mb-0'
                    data-wow-delay='.2s'>
                    <img
                      src='/images/myplace.png'
                      alt='about image'
                      className='mx-auto max-w-full'
                    />
                  </div>
                </div>

                <div className='w-full px-4 lg:w-1/2'>
                  <div className='wow fadeInUp lg:ml-auto lg:max-w-[510px]' data-wow-delay='.3s'>
                    <span className='mb-4 block text-3xl font-medium text-landingprimary md:text-3xl lg:7xl'>
                      step 2
                    </span>
                    <h2 className='mb-4 text-3xl font-bold text-black  sm:text-4xl md:text-[44px] md:leading-tight'>
                      post your open work
                    </h2>
                    <p className='mb-[30px] text-base leading-relaxed text-body'>
                      This project aims to help builders and hackers to start fast on using XMTP and
                      TalentLayer protocols. It contains demo code for all the previous features.
                    </p>

                    <div className='mb-[30px] flex items-center'>
                      <div className='shrink-0 mr-3 flex h-[60px] w-[60px] items-center justify-center rounded-full border border-stroke text-xl font-semibold text-black text-center '>
                        01
                      </div>
                      <div>
                        <h5 className='text-xl font-medium text-black '>
                          In-Chat Bounty Management
                        </h5>
                        <p className='text-base text-body'>
                          a messaging app with native features to manage hiring and paying bounties.
                          Imagine if you could submit your hackathon project, get it approved for a
                          bounty, and receive payment, all with a few DMs, without leaving your
                          messaging app.
                        </p>
                      </div>
                    </div>

                    <div className='flex items-center'>
                      <div className='shrink-0 mr-3 flex h-[60px] w-[60px] items-center justify-center rounded-full border border-stroke text-xl font-semibold text-black  '>
                        02
                      </div>
                      <div>
                        <h5 className='text-xl font-medium text-black '>In-Chat Gig transaction</h5>
                        <p className='text-base text-body'>
                          Imagine an app tailored for freelancers, enabling effortless communication
                          with clients, seamless agreement on gigs, and secure payments all through
                          simple messaging.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='container pb-20 lg:max-w-[1120px]'>
            <div>
              <div className='-mx-4 flex flex-wrap items-center justify-between'>
                <div className='w-full px-4 lg:w-1/2'>
                  <div
                    className='wow fadeInUp relative z-10 mx-auto mb-14 w-full max-w-[470px] pb-6 lg:mx-0 lg:mb-0'
                    data-wow-delay='.2s'>
                    <img
                      src='/images/review.png'
                      alt='about image'
                      className='mx-auto max-w-full'
                    />
                  </div>
                </div>

                <div className='w-full px-4 lg:w-1/2'>
                  <div className='wow fadeInUp lg:ml-auto lg:max-w-[510px]' data-wow-delay='.3s'>
                    <span className='mb-4 block text-3xl font-medium text-landingprimary md:text-3xl lg:7xl'>
                      step 3
                    </span>
                    <h2 className='mb-4 text-3xl font-bold text-black  sm:text-4xl md:text-[44px] md:leading-tight'>
                      manage open work and release payments
                    </h2>
                    <p className='mb-[30px] text-base leading-relaxed text-body'>
                      This project aims to help builders and hackers to start fast on using XMTP and
                      TalentLayer protocols. It contains demo code for all the previous features.
                    </p>

                    <div className='mb-[30px] flex items-center'>
                      <div className='shrink-0 mr-3 flex h-[60px] w-[60px] items-center justify-center rounded-full border border-stroke text-xl font-semibold text-black text-center '>
                        01
                      </div>
                      <div>
                        <h5 className='text-xl font-medium text-black '>
                          In-Chat Bounty Management
                        </h5>
                        <p className='text-base text-body'>
                          a messaging app with native features to manage hiring and paying bounties.
                          Imagine if you could submit your hackathon project, get it approved for a
                          bounty, and receive payment, all with a few DMs, without leaving your
                          messaging app.
                        </p>
                      </div>
                    </div>

                    <div className='flex items-center'>
                      <div className='shrink-0 mr-3 flex h-[60px] w-[60px] items-center justify-center rounded-full border border-stroke text-xl font-semibold text-black  '>
                        02
                      </div>
                      <div>
                        <h5 className='text-xl font-medium text-black '>In-Chat Gig transaction</h5>
                        <p className='text-base text-body'>
                          Imagine an app tailored for freelancers, enabling effortless communication
                          with clients, seamless agreement on gigs, and secure payments all through
                          simple messaging.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='container pb-20 lg:max-w-[1120px]'>
            <div>
              <div className='-mx-4 flex flex-wrap items-center justify-between'>
                <div className='w-full px-4 lg:w-1/2'>
                  <div
                    className='wow fadeInUp relative z-10 mx-auto mb-14 w-full max-w-[470px] lg:mx-0 lg:mb-0'
                    data-wow-delay='.2s'>
                    <img
                      src='/images/network.png'
                      alt='about image'
                      className='mx-auto max-w-full'
                    />
                  </div>
                </div>

                <div className='w-full px-4 lg:w-1/2'>
                  <div className='wow fadeInUp lg:ml-auto lg:max-w-[510px]' data-wow-delay='.3s'>
                    <span className='mb-4 block text-3xl font-medium text-landingprimary md:text-3xl lg:7xl'>
                      step 4
                    </span>
                    <h2 className='mb-4 text-3xl font-bold text-black  sm:text-4xl md:text-[44px] md:leading-tight'>
                      grow your contributor community
                    </h2>
                    <p className='mb-[30px] text-base leading-relaxed text-body'>
                      This project aims to help builders and hackers to start fast on using XMTP and
                      TalentLayer protocols. It contains demo code for all the previous features.
                    </p>

                    <div className='mb-[30px] flex items-center'>
                      <div className='shrink-0 mr-3 flex h-[60px] w-[60px] items-center justify-center rounded-full border border-stroke text-xl font-semibold text-black text-center '>
                        01
                      </div>
                      <div>
                        <h5 className='text-xl font-medium text-black '>
                          In-Chat Bounty Management
                        </h5>
                        <p className='text-base text-body'>
                          a messaging app with native features to manage hiring and paying bounties.
                          Imagine if you could submit your hackathon project, get it approved for a
                          bounty, and receive payment, all with a few DMs, without leaving your
                          messaging app.
                        </p>
                      </div>
                    </div>

                    <div className='flex items-center'>
                      <div className='shrink-0 mr-3 flex h-[60px] w-[60px] items-center justify-center rounded-full border border-stroke text-xl font-semibold text-black  '>
                        02
                      </div>
                      <div>
                        <h5 className='text-xl font-medium text-black '>In-Chat Gig transaction</h5>
                        <p className='text-base text-body'>
                          Imagine an app tailored for freelancers, enabling effortless communication
                          with clients, seamless agreement on gigs, and secure payments all through
                          simple messaging.
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

        <section id='work-process' className='relative z-10 pt-[110px]'>
          <div className='container'>
            <div
              className='wow fadeInUp mx-auto mb-14 max-w-[690px] text-center lg:mb-[70px]'
              data-wow-delay='.2s'>
              <h2 className='mb-4 text-3xl font-bold text-black  sm:text-4xl md:text-[44px] md:leading-tight'>
                what is your BuilderPlace?
              </h2>
              <p className='text-base text-body'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis tortor eros.
                Donec vitae tortor lacus. Phasellus aliquam ante in maximus.
              </p>
            </div>
          </div>

          <div className='container max-w-[1390px]'>
            <div className='rounded-2xl bg-white px-5 pt-14 pb-14 shadow-md md:pb-1 lg:pt-20 lg:pb-5 xl:px-10'>
              <div className='-mx-4 flex flex-wrap justify-center'>
                <div className='w-full px-4 md:w-1/2 lg:w-1/3'>
                  <div
                    className='wow fadeInUp group mx-auto mb-[60px] max-w-[310px] text-center'
                    data-wow-delay='.2s'>
                    <div className='mx-auto mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-3xl bg-redpraha bg-opacity-20 text-redpraha duration-300 group-hover:bg-redpraha group-hover:text-stone-800   '>
                      <svg
                        width='40'
                        height='40'
                        viewBox='0 0 40 40'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'>
                        <g clipPath='url(#clip0_40_12)'>
                          <path
                            d='M21.6667 16.6667H30L20 26.6667L10 16.6667H18.3333V5H21.6667V16.6667ZM6.66668 31.6667H33.3333V20H36.6667V33.3333C36.6667 33.7754 36.4911 34.1993 36.1785 34.5118C35.866 34.8244 35.442 35 35 35H5.00001C4.55798 35 4.13406 34.8244 3.8215 34.5118C3.50894 34.1993 3.33334 33.7754 3.33334 33.3333V20H6.66668V31.6667Z'
                            fill='currentColor'
                          />
                        </g>
                        <defs>
                          <clipPath id='clip0_40_12'>
                            <rect width='40' height='40' fill='white' />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <h3 className='mb-4 text-xl font-semibold text-black  sm:text-[22px] xl:text-[26px]'>
                      Fork the code
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
                    <div className='mx-auto mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-3xl bg-redpraha bg-opacity-20 text-redpraha duration-300 group-hover:bg-redpraha group-hover:text-stone-800   '>
                      <svg
                        width='40'
                        height='40'
                        viewBox='0 0 40 40'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'>
                        <g clipPath='url(#clip0_40_15)'>
                          <path
                            d='M20 36.6667C10.795 36.6667 3.33333 29.205 3.33333 20C3.33333 10.795 10.795 3.33337 20 3.33337C29.205 3.33337 36.6667 10.795 36.6667 20C36.6667 29.205 29.205 36.6667 20 36.6667ZM11.6883 30.4267C14.0476 32.3129 16.9795 33.3382 20 33.3334C23.2833 33.3334 26.2883 32.1467 28.6117 30.18C27.5262 29.0663 26.2284 28.1815 24.7951 27.578C23.3617 26.9746 21.8219 26.6647 20.2667 26.6667C18.6543 26.6648 17.0592 26.9981 15.5824 27.6454C14.1057 28.2927 12.7796 29.2398 11.6883 30.4267ZM9.36 28.0334C10.7608 26.5468 12.4511 25.3629 14.3269 24.5546C16.2027 23.7462 18.2241 23.3306 20.2667 23.3334C22.2361 23.3308 24.1866 23.7173 26.0062 24.4707C27.8259 25.224 29.4788 26.3294 30.87 27.7234C32.2968 25.7152 33.1394 23.3511 33.3043 20.8932C33.4692 18.4354 32.9499 15.9798 31.8041 13.7991C30.6584 11.6184 28.9309 9.79775 26.8133 8.53912C24.6957 7.28049 22.2708 6.6331 19.8077 6.66879C17.3445 6.70448 14.9394 7.42185 12.8592 8.7413C10.779 10.0608 9.10493 11.9307 8.02282 14.1437C6.94071 16.3567 6.49282 18.8262 6.72886 21.2783C6.9649 23.7304 7.87562 26.0691 9.36 28.035V28.0334ZM20 21.6667C18.2319 21.6667 16.5362 20.9643 15.286 19.7141C14.0357 18.4638 13.3333 16.7682 13.3333 15C13.3333 13.2319 14.0357 11.5362 15.286 10.286C16.5362 9.03575 18.2319 8.33337 20 8.33337C21.7681 8.33337 23.4638 9.03575 24.714 10.286C25.9643 11.5362 26.6667 13.2319 26.6667 15C26.6667 16.7682 25.9643 18.4638 24.714 19.7141C23.4638 20.9643 21.7681 21.6667 20 21.6667ZM20 18.3334C20.8841 18.3334 21.7319 17.9822 22.357 17.3571C22.9821 16.7319 23.3333 15.8841 23.3333 15C23.3333 14.116 22.9821 13.2681 22.357 12.643C21.7319 12.0179 20.8841 11.6667 20 11.6667C19.1159 11.6667 18.2681 12.0179 17.643 12.643C17.0179 13.2681 16.6667 14.116 16.6667 15C16.6667 15.8841 17.0179 16.7319 17.643 17.3571C18.2681 17.9822 19.1159 18.3334 20 18.3334Z'
                            fill='currentColor'
                          />
                        </g>
                        <defs>
                          <clipPath id='clip0_40_15'>
                            <rect width='40' height='40' fill='white' />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <h3 className='mb-4 text-xl font-semibold text-black  sm:text-[22px] xl:text-[26px]'>
                      Setup
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
                    <div className='mx-auto mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-3xl bg-redpraha bg-opacity-20 text-redpraha duration-300 group-hover:bg-redpraha group-hover:text-stone-800   '>
                      <svg
                        width='40'
                        height='40'
                        viewBox='0 0 40 40'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'>
                        <g clipPath='url(#clip0_40_18)'>
                          <path
                            d='M5.26834 7.44836C7.20178 5.51458 9.79501 4.38351 12.5277 4.28211C15.2603 4.18072 17.9302 5.11651 20.0017 6.9017C22.0713 5.11948 24.7377 4.18475 27.467 4.28463C30.1964 4.38452 32.7873 5.51165 34.7211 7.44037C36.6549 9.3691 37.7888 11.9571 37.8959 14.6862C38.0029 17.4153 37.0751 20.0841 35.2983 22.1584L22.3567 35.1417C21.7621 35.7365 20.9646 36.0845 20.1242 36.1161C19.2838 36.1476 18.4625 35.8603 17.825 35.3117L17.6417 35.1434L4.70168 22.1584C2.92583 20.0859 1.99764 17.4195 2.1027 14.6923C2.20776 11.9651 3.33832 9.37805 5.26834 7.44836ZM7.62501 9.80503C6.26208 11.1683 5.47643 13.0041 5.43112 14.9313C5.38581 16.8585 6.08432 18.7292 7.38168 20.155L7.62501 20.4117L20 32.7867L28.8383 23.9467L22.9467 18.055L21.18 19.8217C20.7158 20.2861 20.1646 20.6546 19.558 20.906C18.9514 21.1575 18.3012 21.287 17.6445 21.2871C16.3183 21.2874 15.0463 20.7609 14.1083 19.8234C13.1704 18.8858 12.6432 17.6141 12.6429 16.2879C12.6426 14.9617 13.1691 13.6897 14.1067 12.7517L17.61 9.2467C16.2158 8.13399 14.4707 7.55451 12.6878 7.61224C10.9049 7.66997 9.20099 8.36112 7.88168 9.5617L7.62501 9.80503ZM21.7683 14.5184C22.0809 14.2059 22.5047 14.0304 22.9467 14.0304C23.3886 14.0304 23.8125 14.2059 24.125 14.5184L31.195 21.5884L32.375 20.4117C33.7608 19.0269 34.5497 17.1549 34.5731 15.196C34.5964 13.237 33.8524 11.3467 32.5 9.92929C31.1477 8.51185 29.2944 7.67981 27.3366 7.61112C25.3787 7.54242 23.4717 8.24253 22.0233 9.5617L21.7683 9.80503L16.465 15.1084C16.1761 15.3971 16.0033 15.7818 15.9793 16.1895C15.9554 16.5972 16.0819 16.9995 16.335 17.32L16.465 17.465C16.7537 17.7539 17.1384 17.9267 17.5461 17.9507C17.9538 17.9747 18.3561 17.8481 18.6767 17.595L18.8217 17.465L21.7683 14.5184Z'
                            fill='currentColor'
                          />
                        </g>
                        <defs>
                          <clipPath id='clip0_40_18'>
                            <rect width='40' height='40' fill='white' />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <h3 className='mb-4 text-xl font-semibold text-black  sm:text-[22px] xl:text-[26px]'>
                      Enjoy and code!
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
                builder place, refining the user experience, and continuously improving the features
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
                      using your builder place. It saved us a significant amount of time and effort,
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
                      We appreciate the value-added features included in your builder place. The
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
                Find answers to commonly asked questions about our Next.js builder place for
                TalentLayer and XMTP integration, helping you navigate through the implementation
                process and make the most out of the powerful features provided.
              </p>
            </div>

            <div
              className='faqs wow fadeInUp mx-auto w-full max-w-[785px] rounded-lg bg-white px-6 py-[6px] shadow-car'
              data-wow-delay='.3s'>
              <div className='faq border-b border-stroke last-of-type:border-none'>
                <button className='faq-btn relative flex w-full justify-between pt-6 pb-1 px-[18px] text-left text-base font-medium text-black  sm:px-[26px] sm:text-lg'>
                  Are there any specific requirements or dependencies for using the builder place?
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
                <p className='mt-4 text-center text-base text-stone-800 lg:mt-0 lg:text-left'>
                  &copy; 2023 BuilderPlace | Terms of Service
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
