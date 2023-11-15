import Image from 'next/image';
import { useState } from 'react';
import { IntroducationSecion } from '../../components/introduction-section';

function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className='bg-white text-black'>
      <header className='navbar fixed top-0 left-0 z-50 w-full border-stroke bg-white duration-300'>
        <div className='container relative lg:max-w-[1305px] lg:px-10'>
          <div className='flex items-center justify-between'>
            <div className='block py-4 lg:py-0'>
              <a href='/' className='block max-w-[145px] sm:max-w-[200px]'>
                <Image src='/logo-text-dark.png' alt='logo' width={256} height={41} />
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
                      href='#video'
                      className='menu-scroll inline-flex items-center text-base font-medium text-black hover:text-redpraha   lg:py-7'>
                      about
                    </a>
                  </li>
                  <li className='menu-item'>
                    <a
                      onClick={() => setIsOpen(false)}
                      href='#features'
                      className='menu-scroll inline-flex items-center text-base font-medium text-black hover:text-redpraha   lg:py-7'>
                      features
                    </a>
                  </li>
                  <li className='menu-item'>
                    <a
                      onClick={() => setIsOpen(false)}
                      href='#pricing'
                      className='menu-scroll inline-flex items-center text-base font-medium text-black hover:text-redpraha   lg:py-7'>
                      pricing
                    </a>
                  </li>
                  <li className='menu-item'>
                    <a
                      onClick={() => setIsOpen(false)}
                      href='#contact'
                      className='menu-scroll inline-flex items-center text-base font-medium text-black hover:text-redpraha   lg:py-7'>
                      support
                    </a>
                  </li>
                  <li>
                    <a
                      href='/'
                      className='rounded-md text-center bg-redpraha py-[6px] px-[12px] xl:py-[10px] xl:px-[30px] text-base font-bold text-stone-800 hover:bg-opacity-60'>
                      i'm an open-source project
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section id='home' className='pt-[100px] md:pt-[200px] lg:pt-[120px]'>
          <div className='container lg:max-w-[1305px] lg:px-10'>
            <div className='-mx-4 flex flex-wrap items-center'>
              <div className='w-full px-4  lg:w-5/12 mb-20'>
                <div className='fadeInUp mb-0 lg:mb-0 lg:max-w-[570px]' data-wow-delay='.2s'>
                  <h1 className='text-center mb-6 text-3xl md:text-5xl font-bold leading-tight text-black  sm:text-[50px] md:text-[60px] lg:text-[50px] lext-left xl:text-[70px] md:text-left'>
                    contribute<br></br>
                    <span className='inline bg-landingprimary bg-clip-text text-transparent'>
                      meaningful{' '}
                    </span>
                    open-source work
                  </h1>
                  <p className='mb-10 first-letter:max-w-[475px] text-base leading-relaxed text-body text-center md:text-left'>
                    build a reputation by helping open-source projects that need you
                  </p>

                  <div className='flex justify-center md:justify-start gap-4'>
                    <a
                      href='https://tally.so/r/319k9Q'
                      target='_blank'
                      className='max-w-[200px] flex-1 rounded-md font-bold text-center bg-landingprimary py-[6px] px-[12px] xl:py-[10px] xl:px-[30px] text-base text-white hover:bg-opacity-60'>
                      get alerts <br></br>for new missions
                    </a>
                    <a
                      href='#work-process'
                      className='max-w-[186px] flex-1 text-center rounded-md bg-redpraha py-[6px] px-[12px] xl:py-[10px] xl:px-[30px] text-base text-stone-800 font-bold hover:bg-opacity-60'>
                      contribute to <br />
                      projects
                    </a>
                  </div>
                  <div className='w-full px-4  pb-10 pt-5 block md:hidden lg:hidden'>
                    <div
                      className='wow fadeInUp relative z-10 mx-auto w-full max-w-[300px] pt-8 lg:mr-0'
                      data-wow-delay='.3s'>
                      <img src='/images/brib.png' alt='hero image' />
                    </div>
                  </div>
                </div>
              </div>

              <div className='w-full pt-4  pr-20 pb-10 lg:w-7/12 hidden lg:block'>
                <div
                  className='wow fadeInUp relative z-10 mx-auto w-full max-w-[430px] pt-8 md:pt-12 lg:mr-0'
                  data-wow-delay='.3s'>
                  <img src='/images/brib.png' alt='hero image' />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id='features' className='relative pt-[0px]'>
          <div className='container'>
            <div
              className='wow fadeInUp mx-auto mb-14 max-w-[780px] text-center lg:mb-[70px]'
              data-wow-delay='.2s'>
              <h2 className='mb-0 mt-10 text-3xl font-bold text-black  sm:text-4xl md:text-[44px] md:leading-tight'>
                finding <a className='text-landingprimary'>open-source opportunities</a>
                <br></br>
                shouldn't be hard
              </h2>
              <p className='text-center text-md mt-3'>
                have you ever…
                <span className='flex bg-[#fef4e8] p-2 mt-3'>
                  <span className='text-center flex-1'>
                    <span className='mr-2'>🕒</span>
                    spent endless hours sifting through open issues on Github to find open-source
                    projects to help
                  </span>
                </span>
                <span className='flex bg-[#fef4e8] p-2 mt-3'>
                  <span className='text-center flex-1'>
                    <span className='mr-2'>🤔</span>
                    struggled to figure out unclear policies on bounties for contributions
                  </span>
                </span>
                <span className='flex bg-[#fef4e8] p-2 mt-3'>
                  <span className='text-center flex-1'>
                    <span className='mr-2'>😞</span>
                    discovered only bug-bounties available when you hoped to contribute in a bigger
                    way
                    <br></br>
                  </span>
                </span>
                <br></br>
                <span className='font-semibold'>
                  we’ve been there! BuilderPlace is a network of open-source ecosystems that need
                  your help, built by open-source contributors for open-source contributors.
                </span>
              </p>
              <img
                src='/images/stats.png'
                alt='about image'
                className='mt-[60px] mx-auto max-w-full'
              />
            </div>
          </div>
        </section>

        <section id='work-process' className='relative pt-[40px]'>
          <div className='container'>
            <div
              className='wow fadeInUp mx-auto mb-5 max-w-[690px] text-center lg:mb-[10px]'
              data-wow-delay='.2s'>
              <h2 className='mb-0 mt-10 text-3xl font-bold text-black  sm:text-4xl md:text-[44px] md:leading-tight'>
                projects that <br></br>
                <a className='text-landingprimary'>need your help</a>
              </h2>
              <p className='text-base text-body mt-5 mb-10'>
                BuilderPlace is currently in alpha. there are open-source missions live today for
                you to contribute to.
              </p>
            </div>
          </div>

          <div className='container max-w-[1390px]'>
            <div className='rounded-2xl bg-white px-5 pt-0 pb-14 md:pb-1 lg:pt-20 lg:pb-5 xl:px-10'>
              <div className='-mx-4 flex flex-wrap justify-center'>
                <div className='w-full px-4 md:w-1/2 lg:w-1/2'>
                  <div
                    className='wow fadeInUp group mx-auto max-w-[510px] text-center pt-4 pb-1 wow fadeInUp mb-[50px] bg-redpraha bg-opacity-60 shadow-lg hover:bg-opacity-20 rounded-3xl'
                    data-wow-delay='.3s'>
                    <div className='mx-auto mb-4 flex h-[230px] w-[250px] items-center justify-center bg-opacity-20 text-redpraha duration-300   '>
                      <img
                        src='/images/talentlayer.png'
                        alt='about image'
                        className='mx-auto max-w-full'
                      />
                    </div>
                    <h3 className='mb-4 text-xl font-semibold text-black  sm:text-[22px] xl:text-[26px]'>
                      TalentLayer
                    </h3>
                    <p className='text-base text-body pb-5 px-5'>
                      an API and infra layer for marketplace platforms
                    </p>
                    <div className='flex justify-center gap-4'>
                      <a
                        href='https://www.talentlayer.builder.place'
                        className='max-w-[250px] flex-1 mb-5 rounded-md text-center bg-landingprimary py-[6px] px-[12px] xl:py-[10px] xl:px-[30px] text-base text-white font-bold hover:bg-opacity-60'>
                        talentlayer.builder.place
                      </a>
                      {/* <a
                        href='https://www.talentlayer.org'
                        className='max-w-[250px] flex-1 mb-5 rounded-md text-center bg-landingprimary py-[6px] px-[12px] xl:py-[10px] xl:px-[30px] text-base text-white font-bold hover:bg-opacity-60'>
                        meet the project
                      </a> */}
                    </div>
                  </div>
                </div>
                {/* <div className='w-full px-4 md:w-1/2 lg:w-1/2'>
                  <div
                    className='wow fadeInUp group mx-auto max-w-[510px] text-center pt-4 pb-1 wow fadeInUp mb-[50px] bg-redpraha bg-opacity-60 shadow-lg hover:bg-opacity-20 rounded-3xl'
                    data-wow-delay='.3s'>
                    <div className='mx-auto mb-4 flex h-[230px] w-[250px] items-center justify-center bg-opacity-20 text-redpraha duration-300   '>
                      <img
                        src='/images/workx.png'
                        alt='about image'
                        className='mx-auto max-w-full'
                      />
                    </div>
                    <h3 className='mb-4 text-xl font-semibold text-black  sm:text-[22px] xl:text-[26px]'>
                      WorkX
                    </h3>
                    <p className='text-base text-body pb-5 px-5'>
                      an AI powered hiring network and marketplace
                    </p>
                    <div className='flex justify-center gap-4'>
                      <a
                        href='#'
                        className='max-w-[250px] flex-1 mb-5 rounded-md text-center bg-landingprimary py-[6px] px-[12px] xl:py-[10px] xl:px-[30px] text-base text-white font-bold hover:bg-opacity-60'>
                        workx.builder.place
                      </a>
                    </div>
                  </div>
                </div> */}
                <div className='w-full px-4 md:w-1/2 lg:w-1/2'>
                  <div
                    className='wow fadeInUp group mx-auto max-w-[510px] text-center pt-4 pb-1 wow fadeInUp mb-[50px] bg-redpraha bg-opacity-60 shadow-lg hover:bg-opacity-20 rounded-3xl'
                    data-wow-delay='.3s'>
                    <div className='mx-auto mb-4 flex h-[230px] w-[250px] items-center justify-center bg-opacity-20 text-redpraha duration-300   '>
                      <img
                        src='/images/thebadge.png'
                        alt='about image'
                        className='mx-auto max-w-full'
                      />
                    </div>
                    <h3 className='mb-4 text-xl font-semibold text-black  sm:text-[22px] xl:text-[26px]'>
                      The Badge
                    </h3>
                    <p className='text-base text-body pb-5 px-5'>
                      a peer-to-peer information curation and attestation protocol
                    </p>
                    <div className='flex justify-center gap-4'>
                      <a
                        href='https://www.thebadge.builder.place'
                        className='max-w-[250px] flex-1 mb-5 rounded-md text-center bg-landingprimary py-[6px] px-[12px] xl:py-[10px] xl:px-[30px] text-base text-white font-bold hover:bg-opacity-60'>
                        thebadge.builder.place
                      </a>
                      {/* <a
                        href='https://www.thebadge.xyz'
                        className='max-w-[250px] flex-1 mb-5 rounded-md text-center bg-landingprimary py-[6px] px-[12px] xl:py-[10px] xl:px-[30px] text-base text-white font-bold hover:bg-opacity-60'>
                        meet the project
                      </a> */}
                    </div>
                  </div>
                </div>
                {/* <div className='w-full px-4 md:w-1/2 lg:w-1/2'>
                  <div
                    className='wow fadeInUp group mx-auto max-w-[510px] text-center pt-4 pb-1 wow fadeInUp mb-[50px] rounded-lg bg-redpraha bg-opacity-60 shadow-lg hover:bg-opacity-20'
                    data-wow-delay='.3s'>
                    <div className='mx-auto mb-4 flex h-[230px] w-[250px] items-center justify-center bg-opacity-20 text-redpraha duration-300   '>
                      <img
                        src='/images/brian.png'
                        alt='about image'
                        className='mx-auto max-w-full'
                      />
                    </div>
                    <h3 className='mb-4 text-xl font-semibold text-black  sm:text-[22px] xl:text-[26px]'>
                      Brian
                    </h3>
                    <p className='text-base text-body pb-5 px-5'>
                      A non-custodial AI assistant for performing transactions by prompting
                    </p>
                    <div className='flex justify-center gap-4'>
                      <a
                        href='#'
                        className='max-w-[250px] flex-1 mb-5 rounded-md text-center bg-landingprimary py-[6px] px-[12px] xl:py-[10px] xl:px-[30px] text-base text-white font-bold hover:bg-opacity-60'>
                        brian.builder.place
                      </a>
                    </div>
                  </div>
                </div> */}
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

        <section id='testimonials' className='relative z-10 pt-[40px] pb-[60px]'>
          <div className='container'>
            <div
              className='wow fadeInUp mx-auto mb-14 max-w-[740px] text-center lg:mb-[70px]'
              data-wow-delay='.2s'>
              <h2 className='mb-4 text-3xl font-bold text-black  sm:text-4xl md:text-[44px] md:leading-tight'>
                open-source impact
              </h2>
              <p className='text-base text-body'>
                contributors are making an impact helping open-source projects move forward their
                mission
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
                      Open source helps me make a big difference in public good software. It's not
                      just code; it's about working together for a common goal. I can share my
                      skills and time with others to create technology that helps people. It's not
                      just about my code, but all of us coming together to make the world better
                      with technology.
                    </p>
                  </div>

                  <div className='items-center justify-between sm:flex lg:block xl:flex'>
                    <div className='mb-4 flex items-center sm:mb-0 lg:mb-4 xl:mb-0'>
                      <div className='mr-4 h-[56px] w-full max-w-[56px] rounded-full'>
                        <img
                          src='/images/bribpfp.png'
                          alt='author'
                          className='h-full w-full object-cover object-center'
                        />
                      </div>
                      <div>
                        <h5 className='text-base font-medium text-black '>Dercio H.</h5>
                        <p className='text-sm text-body'>data engineer</p>
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
                      Open source contributions gave me a big boost in learning new skills quickly
                      and opened up many opportunities for remote work. It's like a superhighway for
                      personal and professional growth!
                    </p>
                  </div>

                  <div className='items-center justify-between sm:flex lg:block xl:flex'>
                    <div className='mb-4 flex items-center sm:mb-0 lg:mb-4 xl:mb-0'>
                      <div className='mr-4 h-[56px] w-full max-w-[56px] rounded-full'>
                        <img
                          src='/images/gathin.png'
                          alt='author'
                          className='h-full w-full object-cover object-center'
                        />
                      </div>
                      <div>
                        <h5 className='text-base font-medium text-black '>Gathin T.</h5>
                        <p className='text-sm text-body'>full-stack engineer</p>
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

        <section id='about' className='relative pt-[40px]'>
          <div
            className='wow fadeInUp mx-auto mb-14 max-w-[740px] text-center lg:mb-[70px]'
            data-wow-delay='.2s'>
            <h2 className='mb-4 mt-10 text-3xl font-bold text-black  sm:text-4xl md:text-[44px] md:leading-tight'>
              start contributing <a className='text-landingprimary'>in less than 5 minutes</a>
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
                      src='/images/make-profile.png'
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
                      start your reputation
                    </h2>
                    <p className='mb-[30px] text-base leading-relaxed text-body'>
                      set up your profile and get ready to work. you can set up your profile on any
                      team's builder.place platform - you'll be able to use it across all in-network
                      platforms.
                    </p>

                    <div className='mb-[30px] flex items-center'>
                      <div className='shrink-0 mr-3 flex h-[60px] w-[60px] items-center justify-center rounded-full border border-stroke text-xl font-semibold text-black text-center '>
                        01
                      </div>
                      <div>
                        <h5 className='text-xl font-medium text-black '>
                          set up your contributor profile
                        </h5>
                        <p className='text-base text-body'>
                          tell the world a bit about you and what types of projects you care about.
                          link your github, portofolio, and other sites. reputation.
                        </p>
                      </div>
                    </div>

                    <div className='mb-[30px] flex items-center'>
                      <div className='shrink-0 mr-3 flex h-[60px] w-[60px] items-center justify-center rounded-full border border-stroke text-xl font-semibold text-black  '>
                        02
                      </div>
                      <div>
                        <h5 className='text-xl font-medium text-black '>
                          start your on-chain work reputation
                        </h5>
                        <p className='text-base text-body'>
                          mint a soul-bound work ID - the beginning of your on-chian work history.
                          your jobs completed, reviews, and other stats are linked to your on-chain
                          work ID.
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
                      src='/images/search.png'
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
                      explore missions
                    </h2>
                    <p className='mb-[30px] text-base leading-relaxed text-body'>
                      visit different team's BuilderPlaces and see what they need help with.
                    </p>

                    <div className='mb-[30px] flex items-center'>
                      <div className='shrink-0 mr-3 flex h-[60px] w-[60px] items-center justify-center rounded-full border border-stroke text-xl font-semibold text-black text-center '>
                        01
                      </div>
                      <div>
                        <h5 className='text-xl font-medium text-black '>
                          find projects that resonate with you
                        </h5>
                        <p className='text-base text-body'>
                          discover missions ranging from app development and solidity programming to
                          graphic design and copywriting.
                        </p>
                      </div>
                    </div>

                    <div className='flex items-center'>
                      <div className='shrink-0 mr-3 flex h-[60px] w-[60px] items-center justify-center rounded-full border border-stroke text-xl font-semibold text-black  '>
                        02
                      </div>
                      <div>
                        <h5 className='text-xl font-medium text-black '>
                          submit applications to projects you want to work on
                        </h5>
                        <p className='text-base text-body'>
                          one contributor is white-listed to handle each task - that way there’s no
                          duplicative work, and you know you'll get paid for what you complete (no
                          more battling for bug bounties).
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
                      src='/images/reviews.png'
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
                      earn bounties and grow your reputation
                    </h2>

                    <div className='mb-[30px] flex items-center'>
                      <div className='shrink-0 mr-3 flex h-[60px] w-[60px] items-center justify-center rounded-full border border-stroke text-xl font-semibold text-black text-center '>
                        01
                      </div>
                      <div>
                        <h5 className='text-xl font-medium text-black '>
                          earn rewards in USDC, MATIC, or WETH on Polygon
                        </h5>
                        <p className='text-base text-body'>
                          Do you have a token you'd like to see supported?{' '}
                          <a href='#contact' className='underline'>
                            Contact our team
                          </a>
                          .
                        </p>
                      </div>
                    </div>

                    <div className='mb-[30px] flex items-center'>
                      <div className='shrink-0 mr-3 flex h-[60px] w-[60px] items-center justify-center rounded-full border border-stroke text-xl font-semibold text-black  '>
                        02
                      </div>
                      <div>
                        <h5 className='text-xl font-medium text-black '>
                          get reviews to build a reputation
                        </h5>
                        <p className='text-base text-body'>
                          through completing work, contributors grow a strong reputation that's
                          visible across all BuilderPlace open-source ecosystems
                        </p>
                      </div>
                    </div>
                    <div className='flex items-center'>
                      <div className='shrink-0 mr-3 flex h-[60px] w-[60px] items-center justify-center rounded-full border border-stroke text-xl font-semibold text-black  '>
                        03
                      </div>
                      <div>
                        <h5 className='text-xl font-medium text-black '>
                          manage dispute resolution and make sure everyone’s happy
                        </h5>
                        <p className='text-base text-body'>
                          BuilderPlace platforms use Kleros for decentralized dispute resolution.
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
                      explore other open-source projects
                    </h2>
                    <p className='mb-[30px] text-base leading-relaxed text-body'>
                      contribute to projects from beyond your ecosystem
                    </p>

                    <div className='mb-[30px] flex items-center'>
                      <div className='shrink-0 mr-3 flex h-[60px] w-[60px] items-center justify-center rounded-full border border-stroke text-xl font-semibold text-black text-center '>
                        01
                      </div>
                      <div>
                        <h5 className='text-xl font-medium text-black '>
                          explore missions on a network of third-party hiring platforms
                        </h5>
                        <p className='text-base text-body'>
                          visit marketplace platforms like{' '}
                          <a href='https://workx.io' target='_blank' className='underline'>
                            WorkX
                          </a>{' '}
                          and others in the{' '}
                          <a href='https://talentlayer.org' target='_blank' className='underline'>
                            TalentLayer
                          </a>{' '}
                          network to explore even more missions.
                        </p>
                      </div>
                    </div>

                    <div className='flex items-center'>
                      <div className='shrink-0 mr-3 flex h-[60px] w-[60px] items-center justify-center rounded-full border border-stroke text-xl font-semibold text-black  '>
                        02
                      </div>
                      <div>
                        <h5 className='text-xl font-medium text-black '>
                          watch out for new open-source communities joining BuilderPlace
                        </h5>
                        <p className='text-base text-body'>
                          new teams are joining BuilderPlace in the coming months! get ready to help
                          them.
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

        {/* <section id='faq' className='relative z-10 bg-redpraha bg-opacity-50 py-[110px] '>
          <div className='container'>
            <div
              className='wow fadeInUp mx-auto mb-14 max-w-[740px] text-center lg:mb-[70px]'
              data-wow-delay='.2s'>
              <h2 className='mb-4 text-3xl font-bold text-black  sm:text-4xl md:text-[44px] md:leading-tight'>
                frequently asked questions
              </h2>
              <p className='text-base text-body'>
                find answers to some common questions about BuilderPlace
              </p>
            </div>

            <div
              className='faqs wow fadeInUp mx-auto w-full max-w-[785px] rounded-lg bg-white px-6 py-[6px] shadow-car'
              data-wow-delay='.3s'>
              <div className='faq border-b border-stroke last-of-type:border-none'>
                <button className='faq-btn relative flex w-full justify-between pt-6 pb-1 px-[18px] text-left text-base font-medium text-black  sm:px-[26px] sm:text-lg'>
                  what currencies does the escrow system support?
                </button>
                <div className='pb-4 h-auto overflow-hidden px-[18px] sm:px-[26px]'>
                  <p className='text-base text-body'>
                    BuilderPlace's escrow system supports USDC, WETH, and MATIC on the Polygon
                    network. Do you have a token you'd like to see supported?{' '}
                    <a href='#contact' className='underline'>
                      Contact our team
                    </a>
                    .
                  </p>
                </div>
              </div>

              <div className='faq border-b border-stroke last-of-type:border-none'>
                <button className='faq-btn relative flex w-full justify-between pt-6 pb-1 px-[18px] text-left text-base font-medium text-black  sm:px-[26px] sm:text-lg'>
                  what types of work can I post on my team's BuilderPlace?
                </button>
                <div className='pb-4 h-auto overflow-hidden px-[18px] sm:px-[26px]'>
                  <p className='text-base text-body'>
                    teams have had open-source contributors work on everything from building proof
                    of concepts to creating a full-fledged SDK for an infra product. you can make a
                    post for whatever scope of work you prefer. open-source is more than just
                    development - try making posts for design, QA testing, and more.
                  </p>
                </div>
              </div>

              <div className='faq border-b border-stroke last-of-type:border-none'>
                <button className='faq-btn relative flex w-full justify-between pt-6 pb-1 px-[18px] text-left text-base font-medium text-black  sm:px-[26px] sm:text-lg'>
                  do I need a crypto wallet to interact with my BuilderPlace platform?
                </button>
                <div className='pb-4 h-auto overflow-hidden px-[18px] sm:px-[26px]'>
                  <p className='text-base text-body'>
                    For now, you do need to manage your own crypto wallet to post and find work on
                    BuilderPlace.
                  </p>
                </div>
              </div>

              <div className='faq border-b border-stroke last-of-type:border-none'>
                <button className='faq-btn relative flex w-full justify-between pt-6 pb-1 px-[18px] text-left text-base font-medium text-black  sm:px-[26px] sm:text-lg'>
                  where will my work posts be distributed?
                </button>
                <div className='pb-4 h-auto overflow-hidden px-[18px] sm:px-[26px]'>
                  <p className='text-base text-body'>
                    posts are distributed across platforms in the TalentLayer network; this
                    currently includes various freelance marketplaces.{' '}
                    <a className='underline' href='https://talentlayer.org'>
                      Learn more about TalentLayer.
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
                  <stop stopColor='#fe71a1' />
                  <stop offset='1' stopColor='#f4dabc' />
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
                  <stop stopColor='#f4dabc' />
                  <stop stopColor='#f4dabc' />
                  <stop offset='1' stopColor='#fe71a1' />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </section> */}

        <section id='contact' className='relative z-10 pt-[20px]'>
          <div className='container'>
            <div
              className='wow fadeInUp mx-auto mb-14 max-w-[740px] text-center lg:mb-[70px]'
              data-wow-delay='.2s'>
              <h2 className='mb-[40px] text-3xl font-bold text-black  sm:text-4xl md:text-[44px] md:leading-tight'>
                start your open-source journey today!
              </h2>
              <div className='flex justify-center gap-4'>
                <a
                  href='#work-process'
                  className='max-w-[286px] flex-1 rounded-md text-center bg-redpraha py-[6px] px-[12px] xl:py-[10px] xl:px-[30px] text-base font-medium text-black font-bold hover:bg-opacity-60'>
                  explore the projects
                </a>
                <a
                  href='https://tally.so/r/319k9Q'
                  target='_blank'
                  className='max-w-[286px] flex-1 rounded-md text-center bg-landingprimary py-[6px] px-[12px] xl:py-[10px] xl:px-[30px] text-base font-medium text-white font-bold hover:bg-opacity-60'>
                  get alerts
                </a>
              </div>
              <div className='pb-6 pt-10 w-1/2'></div>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <div className='wow fadeInUp bg-redpraha py-7' data-wow-delay='.2s'>
          <div className='container text-center max-w-[1390px]'>
            <div className='flex justify-center flex-wrap'>
              <div className='order-last w-full text-center px-3 lg:order-first lg:w-1/3'>
                <p className='text-center text-base text-stone-800'>
                  <a href='#' className='hover:opacity-60'>
                    &copy; 2023 BuilderPlace
                  </a>{' '}
                  |{' '}
                  <a href='/terms' className='underline hover:opacity-60'>
                    terms of service
                  </a>
                </p>
              </div>
            </div>
            <a
              href='https://github.com/TalentLayer-Labs/builder-place'
              target='_blank'
              className='text-landingprimary underline hover:opacity-60'>
              100% opens-source
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
