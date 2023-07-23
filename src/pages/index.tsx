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
                {/* <ul className='items-center space-y-3 lg:flex lg:space-x-8 lg:space-y-0 xl:space-x-10'>
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
                </ul> */}
              </nav>
            </div>

            <div className='mr-[60px] flex items-center justify-end lg:mr-0'>
              <a
                href='/dashboard'
                className='rounded-md bg-redpraha py-[6px] px-[12px] xl:py-[10px] xl:px-[30px] text-base font-medium text-white hover:bg-opacity-90'>
                Dapp
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
                  <h1 className='mb-6 text-3xl font-bold leading-tight text-black  sm:text-[40px] md:text-[50px] lg:text-[42px] xl:text-[50px]'>
                    <span className='inline bg-redpraha bg-clip-text text-transparent mx-2'>
                      Join Trustky
                    </span>
                    where pseudonymous resumes foster
                    <span className='inline bg-redpraha bg-clip-text text-transparent mx-2'>
                      freedom
                    </span>{' '}
                  </h1>

                  <div className='flex flex-wrap items-center'>
                    <a
                      target='_blank'
                      href='/dashboard'
                      className='mr-6 mb-6 inline-flex h-[60px] items-center rounded-lg bg-black py-[14px] px-[30px] text-white hover:bg-opacity-90'>
                      <span className='mr-[18px] border-r border-stroke border-opacity-40 pr-[18px] leading-relaxed '>
                        Join 11k+ web3 devs
                      </span>
                      <span>🚀</span>
                    </a>

                    <a
                      href='javascript:void(0)'
                      className='glightbox mb-6 inline-flex items-center py-4 text-black hover:text-primary '></a>
                  </div>
                </div>
              </div>

              <div className='w-full px-4 lg:w-5/12'>
                <div
                  className='wow fadeInUp relative z-10 mx-auto w-full max-w-[530px] pt-8 lg:mr-0'
                  data-wow-delay='.3s'>
                  <img src='logo-text-dark.png' alt='hero image' className='mx-auto max-w-full' />
                  <div className='max-auto absolute top-0 left-0 right-0 -z-10 aspect-square w-full rounded-full bg-redpraha'>
                    <div className='absolute top-5 right-0'>
                      <svg
                        width='72'
                        height='51'
                        viewBox='0 0 72 51'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'>
                        <g clip-path='url(#clip0_5_3665)'>
                          <path
                            d='M22.378 0.4157C22.3814 0.342879 22.3851 0.270712 22.3891 0.199219C22.3857 0.271606 22.382 0.343766 22.378 0.4157C22.0401 7.83785 25.7079 22.0514 43.163 21.2025C36.0333 21.7022 21.9045 26.7677 22.3875 43.0291C22.1659 35.9367 17.5749 21.9221 1.00683 21.8442C0.856728 21.8465 0.709534 21.8469 0.56543 21.8454C0.713499 21.8439 0.86063 21.8435 1.00683 21.8442C8.04005 21.7355 21.4537 17.3609 22.378 0.4157Z'
                            fill='#ff0050'
                          />
                          <path
                            d='M59.3487 24.4888C59.3506 24.4451 59.3528 24.4018 59.3552 24.3589C59.3532 24.4023 59.351 24.4456 59.3487 24.4888C59.1459 28.942 61.3466 37.4702 71.8196 36.9608C67.5418 37.2606 59.0645 40.3 59.3543 50.0568C59.2213 45.8014 56.4667 37.3926 46.5259 37.3459C46.4359 37.3473 46.3475 37.3475 46.261 37.3466C46.3499 37.3457 46.4382 37.3454 46.5259 37.3459C50.7458 37.2807 58.794 34.6559 59.3487 24.4888Z'
                            fill='#1e293b'
                          />
                        </g>
                        <defs>
                          <clipPath id='clip0_5_3665'>
                            <rect
                              width='71.2541'
                              height='49.8779'
                              fill='white'
                              transform='translate(0.56543 0.199219)'
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div className='absolute bottom-10 left-0'>
                      <svg
                        width='65'
                        height='36'
                        viewBox='0 0 65 36'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path
                          fill-rule='evenodd'
                          clip-rule='evenodd'
                          d='M55.4149 1.83203C53.339 1.57898 51.3475 2.4214 49.2904 4.18456C45.9052 7.08611 40.0313 8.52953 34.7368 4.19769C32.4686 2.34195 30.4917 2.04856 28.8583 2.32079C27.1672 2.60264 25.7448 3.50424 24.6267 4.24961C22.8559 5.43014 20.9059 6.67067 18.66 6.9618C16.3417 7.2623 13.8664 6.54246 11.0465 4.19256C8.68539 2.22501 6.66504 1.84655 5.11312 2.08531C3.52522 2.32961 2.288 3.24185 1.57603 4.08328C1.25719 4.46008 0.69326 4.50708 0.316454 4.18824C-0.0603521 3.86941 -0.107346 3.30548 0.21149 2.92867C1.13803 1.83367 2.73868 0.642115 4.84131 0.318626C6.97991 -0.0103986 9.50274 0.579362 12.1908 2.81939C14.7333 4.93815 16.7266 5.40998 18.4302 5.18915C20.2062 4.95894 21.831 3.96513 23.6352 2.76234L24.131 3.50597L23.6352 2.76234C24.7515 2.01814 26.4572 0.908837 28.5644 0.557635C30.7295 0.196804 33.2212 0.648204 35.8687 2.81426C40.3566 6.48615 45.2562 5.28815 48.1272 2.82739C50.3886 0.889088 52.8657 -0.279434 55.6312 0.057691C58.3691 0.391448 61.1615 2.17558 64.1309 5.60179C64.4541 5.9748 64.4138 6.53924 64.0408 6.86252C63.6678 7.18579 63.1034 7.14547 62.7801 6.77246C59.9402 3.49563 57.5184 2.08846 55.4149 1.83203Z'
                          fill='#F76D8D'
                        />
                        <path
                          fill-rule='evenodd'
                          clip-rule='evenodd'
                          d='M55.4149 11.2026C53.339 10.9496 51.3475 11.792 49.2904 13.5552C45.9052 16.4567 40.0312 17.9001 34.7367 13.5683C32.4686 11.7126 30.4916 11.4192 28.8583 11.6914C27.1671 11.9732 25.7447 12.8748 24.6267 13.6202C22.8559 14.8007 20.9058 16.0413 18.66 16.3324C16.3417 16.6329 13.8663 15.9131 11.0464 13.5632C8.68536 11.5956 6.66501 11.2172 5.11309 11.4559C3.52519 11.7002 2.28797 12.6125 1.576 13.4539C1.25716 13.8307 0.69323 13.8777 0.316424 13.5588C-0.0603826 13.24 -0.107377 12.6761 0.211459 12.2993C1.138 11.2043 2.73865 10.0127 4.84128 9.68923C6.97988 9.36021 9.50271 9.94997 12.1907 12.19C14.7333 14.3088 16.7266 14.7806 18.4302 14.5598C20.2061 14.3295 21.831 13.3357 23.6352 12.1329L24.1309 12.8766L23.6352 12.1329C24.7515 11.3887 26.4572 10.2794 28.5644 9.92824C30.7294 9.56741 33.2212 10.0188 35.8686 12.1849C40.3565 15.8568 45.2562 14.6588 48.1271 12.198C50.3885 10.2597 52.8657 9.09117 55.6312 9.4283C58.3691 9.76205 61.1614 11.5462 64.1308 14.9724C64.4541 15.3454 64.4138 15.9098 64.0408 16.2331C63.6678 16.5564 63.1033 16.5161 62.7801 16.1431C59.9401 12.8662 57.5184 11.4591 55.4149 11.2026Z'
                          fill='#F76D8D'
                        />
                        <path
                          fill-rule='evenodd'
                          clip-rule='evenodd'
                          d='M55.4149 20.5825C53.339 20.3295 51.3475 21.1719 49.2904 22.935C45.9052 25.8366 40.0312 27.28 34.7367 22.9482C32.4686 21.0924 30.4916 20.7991 28.8583 21.0713C27.1671 21.3531 25.7447 22.2547 24.6267 23.0001C22.8559 24.1806 20.9058 25.4212 18.66 25.7123C16.3417 26.0128 13.8663 25.293 11.0464 22.9431C8.68536 20.9755 6.66501 20.597 5.11309 20.8358C3.52519 21.0801 2.28797 21.9923 1.576 22.8338C1.25716 23.2106 0.69323 23.2576 0.316424 22.9387C-0.0603826 22.6199 -0.107377 22.056 0.211459 21.6792C1.138 20.5842 2.73865 19.3926 4.84128 19.0691C6.97988 18.7401 9.50271 19.3299 12.1907 21.5699C14.7333 23.6886 16.7266 24.1605 18.4302 23.9396C20.2061 23.7094 21.831 22.7156 23.6352 21.5128L24.1309 22.2565L23.6352 21.5128C24.7515 20.7686 26.4572 19.6593 28.5644 19.3081C30.7294 18.9473 33.2212 19.3987 35.8686 21.5647C40.3565 25.2366 45.2562 24.0386 48.1271 21.5779C50.3885 19.6396 52.8657 18.4711 55.6312 18.8082C58.3691 19.1419 61.1614 20.9261 64.1308 24.3523C64.4541 24.7253 64.4138 25.2897 64.0408 25.613C63.6678 25.9363 63.1033 25.896 62.7801 25.523C59.9401 22.2461 57.5184 20.8389 55.4149 20.5825Z'
                          fill='#F76D8D'
                        />
                        <path
                          fill-rule='evenodd'
                          clip-rule='evenodd'
                          d='M55.4149 29.9619C53.339 29.7089 51.3475 30.5513 49.2904 32.3144C45.9052 35.216 40.0312 36.6594 34.7367 32.3276C32.4686 30.4718 30.4916 30.1784 28.8583 30.4507C27.1671 30.7325 25.7447 31.6341 24.6267 32.3795C22.8559 33.56 20.9058 34.8006 18.66 35.0917C16.3417 35.3922 13.8663 34.6723 11.0464 32.3224C8.68536 30.3549 6.66501 29.9764 5.11309 30.2152C3.52519 30.4595 2.28797 31.3717 1.576 32.2132C1.25716 32.59 0.69323 32.637 0.316424 32.3181C-0.0603826 31.9993 -0.107377 31.4354 0.211459 31.0586C1.138 29.9635 2.73865 28.772 4.84128 28.4485C6.97988 28.1195 9.50271 28.7092 12.1907 30.9493C14.7333 33.068 16.7266 33.5399 18.4302 33.319C20.2061 33.0888 21.831 32.095 23.6352 30.8922L24.1309 31.6359L23.6352 30.8922C24.7515 30.148 26.4572 29.0387 28.5644 28.6875C30.7294 28.3267 33.2212 28.7781 35.8686 30.9441C40.3565 34.616 45.2562 33.418 48.1271 30.9573C50.3885 29.019 52.8657 27.8504 55.6312 28.1876C58.3691 28.5213 61.1614 30.3055 64.1308 33.7317C64.4541 34.1047 64.4138 34.6691 64.0408 34.9924C63.6678 35.3157 63.1033 35.2754 62.7801 34.9023C59.9401 31.6255 57.5184 30.2183 55.4149 29.9619Z'
                          fill='#F76D8D'
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id='features' className='relative z-10 pt-[110px]'>
          <div className='container'>
            <div
              className='wow fadeInUp mx-auto mb-14 max-w-[690px] text-center lg:mb-[70px]'
              data-wow-delay='.2s'>
              <h2 className='mb-4 text-3xl font-bold text-black  sm:text-4xl md:text-[44px] md:leading-tight'>
                Build Your Last Resume with Confidence and Privacy
              </h2>
              <p className='text-base text-body'>
                Are you tired of using resume builders that sacrifice your privacy for convenience?
                Look no further than Trustky - a revolutionary resume-building platform that puts
                your data security first. With Trustky, you can confidently create your perfect
                resume while maintaining full control over who can access your information.
              </p>
            </div>
          </div>

          <div className='container max-w-[1390px]'>
            <div className='rounded-2xl bg-white px-5 pt-14 pb-14 shadow-md md:pb-1 lg:pt-20 lg:pb-5 xl:px-10'>
              <div className='-mx-4 flex flex-wrap'>
                <div className='w-full px-4 md:w-1/2 lg:w-1/3'>
                  <div
                    className='wow fadeInUp group mx-auto mb-[60px] max-w-[310px] text-center'
                    data-wow-delay='.2s'>
                    <div className='mx-auto mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-3xl bg-redpraha bg-opacity-20 text-redpraha duration-300 group-hover:bg-redpraha group-hover:text-white   '>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='44'
                        height='44'
                        viewBox='0 0 487.451 487.451'>
                        <g>
                          <path
                            fill='#ff0050'
                            d='M371.694,63.921h-87.83V88.06c0,4.046-3.281,7.326-7.326,7.326h-59.521c-3.164,0-5.851-2.01-6.876-4.819
		c0.353,0.054,0.71,0.089,1.077,0.089h59.521c4.045,0,7.325-3.28,7.325-7.326V7.326c0-4.045-3.28-7.326-7.325-7.326h-59.521
		c-4.047,0-7.326,3.281-7.326,7.326v56.596h-88.136c-4.046,0-7.326,3.281-7.326,7.326v408.879c0,4.045,3.28,7.324,7.326,7.324
		h255.938c4.046,0,7.326-3.279,7.326-7.324V71.247C379.021,67.203,375.74,63.921,371.694,63.921z M226.48,26.247h28.994
		c5.271,0,9.541,4.271,9.541,9.54s-4.271,9.54-9.541,9.54H226.48c-5.268,0-9.54-4.271-9.54-9.54S221.212,26.247,226.48,26.247z
		 M205.566,169.084l0.293-0.337c1.13-0.82,1.68-2.11,1.464-3.43c-2.823-17.042-0.974-24.141-0.336-25.921
		c4.931-15.135,20.479-22.223,23.53-23.474c0.638-0.248,1.827-0.615,3.082-0.811l0.32-0.075l2.575-0.143l0.014,0.158l0.55-0.045
		l2.183-0.386c0.479,0.003,6.479,0.752,15.52,3.53l6.237,2.14c11.382,3.365,16.676,9.663,17.656,10.922
		c9.139,10.367,6.701,26.012,4.424,34.415c-0.248,0.966-0.098,1.975,0.449,2.796l0.516,0.659c0.834,1.11,1.146,4.843-0.719,11.769
		c-0.383,2.26-1.213,4.094-2.457,5.315c-0.429,0.473-0.75,1.117-0.871,1.807c-3.096,18.125-19.323,38.402-36.438,38.402
		c-14.546,0-31.129-18.662-34.11-38.384c-0.11-0.72-0.417-1.361-0.918-1.912c-1.238-1.285-2.035-3.145-2.518-5.899
		C204.573,174.992,204.429,170.824,205.566,169.084z M172.086,248.342c0.121-0.156,3.497-4.445,11.511-7.504
		c0,0,17.322-6.747,17.646-6.855c9.015-3.272,18.066-10.093,18.066-10.093l0.621,0.539c7.484,6.446,15.589,9.857,23.432,9.857
		c0.045,0,0.091-0.004,0.136-0.006c0,0,0.546,0.006,0.591,0.006c7.843,0,15.947-3.411,23.432-9.857l0.622-0.539
		c0,0,9.051,6.82,18.064,10.093c0.324,0.108,17.646,6.855,17.646,6.855c8.014,3.059,11.391,7.348,11.511,7.504
		c12.41,18.43,14.507,58.693,14.718,63.191c-0.097,6.309-1.885,7.915-2.361,8.238c-26.687,11.939-62.956,16.791-84.223,16.791
		s-57.082-4.852-83.768-16.791c-0.477-0.323-2.265-1.932-2.36-8.238C157.58,307.036,159.677,266.771,172.086,248.342z
		 M285.438,433.861H150.569v-21.553h134.868V433.861L285.438,433.861z M336.882,391.455H150.569v-21.553h186.312V391.455z'
                          />
                        </g>
                      </svg>
                    </div>
                    <h3 className='mb-4 text-xl font-semibold text-black  sm:text-[22px] xl:text-[26px]'>
                      Uncompromising Privacy
                    </h3>
                    <p className='text-base text-body'>
                      fetch your credentials from platforms like GitHub, LinkedIn, and Upwork only
                      with your explicit consent. You decide what information is shown publicly
                    </p>
                  </div>
                </div>

                <div className='w-full px-4 md:w-1/2 lg:w-1/3'>
                  <div
                    className='wow fadeInUp group mx-auto mb-[60px] max-w-[310px] text-center'
                    data-wow-delay='.3s'>
                    <div className='mx-auto mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-3xl bg-redpraha bg-opacity-20 text-redpraha duration-300 group-hover:bg-redpraha group-hover:text-white   '>
                      <ChatBubbleBottomCenterTextIcon width={48} height={48} />
                    </div>
                    <h3 className='mb-4 text-xl font-semibold text-black  sm:text-[22px] xl:text-[26px]'>
                      Cutting-Edge Encryption
                    </h3>
                    <p className='text-base text-body'>
                      Trustky employs state-of-the-art encryption methodslike Lit protocol
                    </p>
                  </div>
                </div>

                <div className='w-full px-4 md:w-1/2 lg:w-1/3'>
                  <div
                    className='wow fadeInUp group mx-auto mb-[60px] max-w-[310px] text-center'
                    data-wow-delay='.4s'>
                    <div className='mx-auto mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-3xl bg-redpraha bg-opacity-20 text-redpraha duration-300 group-hover:bg-redpraha group-hover:text-white   '>
                      <BriefcaseIcon width={48} height={48} />
                    </div>
                    <h3 className='mb-4 text-xl font-semibold text-black  sm:text-[22px] xl:text-[26px]'>
                      Customizable Visibility
                    </h3>
                    <p className='text-base text-body'>
                      Tailor your resume's visibility to your liking. With Trustky, you have the
                      power to choose which sections of your resume are visible to the public and
                      which ones require access approval.
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
                      Your are a human
                    </h3>
                    <p className='text-base text-body'>
                      We use technology like worldcoin or EAS to help you to prove that you are a
                      human
                    </p>
                  </div>
                </div>

                <div className='w-full px-4 md:w-1/2 lg:w-1/3'>
                  <div
                    className='wow fadeInUp group mx-auto mb-[60px] max-w-[310px] text-center'
                    data-wow-delay='.3s'>
                    <div className='mx-auto mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-3xl bg-redpraha bg-opacity-20 text-redpraha duration-300 group-hover:bg-redpraha group-hover:text-white   '>
                      <svg
                        width='40'
                        height='40'
                        viewBox='0 0 40 40'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'>
                        <g clip-path='url(#clip0_211_943)'>
                          <path
                            d='M11.2535 28.9978C11.5633 28.1197 12.1379 27.3593 12.898 26.8215C13.6581 26.2837 14.5663 25.9949 15.4974 25.9949C16.4286 25.9949 17.3368 26.2837 18.0969 26.8215C18.857 27.3593 19.4316 28.1197 19.7414 28.9978H34.9927V31.9971H19.7414C19.4316 32.8751 18.857 33.6355 18.0969 34.1733C17.3368 34.7112 16.4286 35 15.4974 35C14.5663 35 13.6581 34.7112 12.898 34.1733C12.1379 33.6355 11.5633 32.8751 11.2535 31.9971H5V28.9978H11.2535ZM20.2513 18.5004C20.5611 17.6223 21.1357 16.8619 21.8958 16.3241C22.6559 15.7862 23.5641 15.4974 24.4952 15.4974C25.4264 15.4974 26.3346 15.7862 27.0947 16.3241C27.8548 16.8619 28.4294 17.6223 28.7392 18.5004H34.9927V21.4996H28.7392C28.4294 22.3777 27.8548 23.1381 27.0947 23.6759C26.3346 24.2138 25.4264 24.5026 24.4952 24.5026C23.5641 24.5026 22.6559 24.2138 21.8958 23.6759C21.1357 23.1381 20.5611 22.3777 20.2513 21.4996H5V18.5004H20.2513ZM11.2535 8.00294C11.5633 7.12486 12.1379 6.36449 12.898 5.82666C13.6581 5.28882 14.5663 5 15.4974 5C16.4286 5 17.3368 5.28882 18.0969 5.82666C18.857 6.36449 19.4316 7.12486 19.7414 8.00294H34.9927V11.0022H19.7414C19.4316 11.8803 18.857 12.6407 18.0969 13.1785C17.3368 13.7163 16.4286 14.0051 15.4974 14.0051C14.5663 14.0051 13.6581 13.7163 12.898 13.1785C12.1379 12.6407 11.5633 11.8803 11.2535 11.0022H5V8.00294H11.2535Z'
                            fill='currentColor'
                          />
                        </g>
                        <defs>
                          <clipPath id='clip0_211_943'>
                            <rect width='40' height='40' fill='white' />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <h3 className='mb-4 text-xl font-semibold text-black  sm:text-[22px] xl:text-[26px]'>
                      Reputation
                    </h3>
                    <p className='text-base text-body'>Bring back your web2 reputation to web3</p>
                  </div>
                </div>

                <div className='w-full px-4 md:w-1/2 lg:w-1/3 relative'>
                  <div
                    className='wow fadeInUp group mx-auto mb-[60px] max-w-[310px] text-center'
                    data-wow-delay='.4s'>
                    <div className='mx-auto mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-3xl bg-redpraha bg-opacity-20 text-redpraha duration-300 group-hover:bg-redpraha group-hover:text-white   '>
                      <SparklesIcon width={48} height={48} />
                    </div>
                    <h3 className='mb-4 text-xl font-semibold text-black  sm:text-[22px] xl:text-[26px]'>
                      Data Access Requests
                    </h3>
                    {/* <div className='absolute top-[-5px] right-[40px] md:right-[100px] p-2 bg-redpraha text-white text-xs rounded-md'>
                      Coming Soon
                    </div> */}
                    <p className='text-base text-body'>
                      Trustky allows other users to request access to specific parts of your resume.
                      You'll receive a notification and decide whether to grant access or not.
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
                  color-interpolation-filters='sRGB'>
                  <feFlood flood-opacity='0' result='BackgroundImageFix' />
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
                  <stop stop-color='#8EA5FE' />
                  <stop offset='0.541667' stop-color='#BEB3FD' />
                  <stop offset='1' stop-color='#90D1FF' />
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
                  color-interpolation-filters='sRGB'>
                  <feFlood flood-opacity='0' result='BackgroundImageFix' />
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
                  <stop stop-color='#FF8FE8' />
                  <stop offset='1' stop-color='#FFC960' />
                </linearGradient>
              </defs>
            </svg>
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
                      src='/images/home/about/about-1-light-2.png'
                      alt='about image'
                      className='mx-auto max-w-full'
                    />

                    <div className='absolute top-0 right-5 -z-10'>
                      <svg
                        width='72'
                        height='50'
                        viewBox='0 0 72 50'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'>
                        <g clip-path='url(#clip0_33_10)'>
                          <path
                            d='M21.8126 0.216481C21.8159 0.143661 21.8196 0.071493 21.8237 0C21.8203 0.0723874 21.8165 0.144547 21.8126 0.216481C21.4747 7.63863 25.1425 21.8522 42.5976 21.0032C35.4678 21.503 21.3391 26.5685 21.822 42.8298C21.6005 35.7375 17.0094 21.7229 0.441399 21.645C0.291298 21.6473 0.144104 21.6477 0 21.6462C0.148069 21.6447 0.2952 21.6443 0.441399 21.645C7.47462 21.5363 20.8883 17.1617 21.8126 0.216481Z'
                            fill='#ff0050'
                          />
                          <path
                            d='M58.7832 24.2896C58.7851 24.2459 58.7874 24.2025 58.7898 24.1597C58.7878 24.2031 58.7855 24.2464 58.7832 24.2896C58.5804 28.7428 60.7811 37.271 71.2541 36.7616C66.9763 37.0614 58.499 40.1008 58.7888 49.8576C58.6559 45.6022 55.9013 37.1934 45.9605 37.1467C45.8704 37.1481 45.782 37.1482 45.6956 37.1474C45.7844 37.1465 45.8727 37.1462 45.9605 37.1467C50.1803 37.0815 58.2286 34.4567 58.7832 24.2896Z'
                            fill='#1e293b'
                          />
                        </g>
                        <defs>
                          <clipPath id='clip0_33_10'>
                            <rect width='71.2541' height='49.8779' fill='white' />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div className='absolute bottom-0 left-0 -z-10 h-1/2 w-full rounded-[20px] bg-redpraha'>
                      <div className='absolute left-10 -top-12 -z-10'>
                        <svg
                          width='65'
                          height='36'
                          viewBox='0 0 65 36'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'>
                          <path
                            fill-rule='evenodd'
                            clip-rule='evenodd'
                            d='M55.4149 1.83203C53.339 1.57898 51.3475 2.4214 49.2904 4.18456C45.9052 7.08611 40.0313 8.52953 34.7368 4.19769C32.4686 2.34195 30.4917 2.04856 28.8583 2.32079C27.1672 2.60264 25.7448 3.50424 24.6267 4.24961C22.8559 5.43014 20.9059 6.67067 18.66 6.9618C16.3417 7.2623 13.8664 6.54246 11.0465 4.19256C8.68539 2.22501 6.66504 1.84655 5.11312 2.08531C3.52522 2.32961 2.288 3.24185 1.57603 4.08328C1.25719 4.46008 0.69326 4.50708 0.316454 4.18824C-0.0603521 3.86941 -0.107346 3.30548 0.21149 2.92867C1.13803 1.83367 2.73868 0.642115 4.84131 0.318626C6.97991 -0.0103986 9.50274 0.579362 12.1908 2.81939C14.7333 4.93815 16.7266 5.40998 18.4302 5.18915C20.2062 4.95894 21.831 3.96513 23.6352 2.76234L24.131 3.50597L23.6352 2.76234C24.7515 2.01814 26.4572 0.908837 28.5644 0.557635C30.7295 0.196804 33.2212 0.648204 35.8687 2.81426C40.3566 6.48615 45.2562 5.28815 48.1272 2.82739C50.3886 0.889088 52.8657 -0.279434 55.6312 0.057691C58.3691 0.391448 61.1615 2.17558 64.1309 5.60179C64.4541 5.9748 64.4138 6.53924 64.0408 6.86252C63.6678 7.18579 63.1034 7.14547 62.7801 6.77246C59.9402 3.49563 57.5184 2.08846 55.4149 1.83203Z'
                            fill='#ff0050'
                          />
                          <path
                            fill-rule='evenodd'
                            clip-rule='evenodd'
                            d='M55.4149 11.2024C53.339 10.9493 51.3475 11.7918 49.2904 13.5549C45.9052 16.4565 40.0312 17.8999 34.7367 13.5681C32.4686 11.7123 30.4916 11.4189 28.8583 11.6912C27.1671 11.973 25.7447 12.8746 24.6267 13.62C22.8559 14.8005 20.9058 16.041 18.66 16.3322C16.3417 16.6327 13.8663 15.9128 11.0464 13.5629C8.68536 11.5954 6.66501 11.2169 5.11309 11.4557C3.52519 11.7 2.28797 12.6122 1.576 13.4536C1.25716 13.8304 0.69323 13.8774 0.316424 13.5586C-0.0603826 13.2398 -0.107377 12.6758 0.211459 12.299C1.138 11.204 2.73865 10.0125 4.84128 9.68899C6.97988 9.35996 9.50271 9.94972 12.1907 12.1897C14.7333 14.3085 16.7266 14.7803 18.4302 14.5595C20.2061 14.3293 21.831 13.3355 23.6352 12.1327L24.1309 12.8763L23.6352 12.1327C24.7515 11.3885 26.4572 10.2792 28.5644 9.928C30.7294 9.56717 33.2212 10.0186 35.8686 12.1846C40.3565 15.8565 45.2562 14.6585 48.1271 12.1978C50.3885 10.2594 52.8657 9.09093 55.6312 9.42805C58.3691 9.76181 61.1614 11.5459 64.1308 14.9722C64.4541 15.3452 64.4138 15.9096 64.0408 16.2329C63.6678 16.5561 63.1033 16.5158 62.7801 16.1428C59.9401 12.866 57.5184 11.4588 55.4149 11.2024Z'
                            fill='#ff0050'
                          />
                          <path
                            fill-rule='evenodd'
                            clip-rule='evenodd'
                            d='M55.4149 20.5825C53.339 20.3295 51.3475 21.1719 49.2904 22.935C45.9052 25.8366 40.0312 27.28 34.7367 22.9482C32.4686 21.0924 30.4916 20.7991 28.8583 21.0713C27.1671 21.3531 25.7447 22.2547 24.6267 23.0001C22.8559 24.1806 20.9058 25.4212 18.66 25.7123C16.3417 26.0128 13.8663 25.293 11.0464 22.9431C8.68536 20.9755 6.66501 20.597 5.11309 20.8358C3.52519 21.0801 2.28797 21.9923 1.576 22.8338C1.25716 23.2106 0.69323 23.2576 0.316424 22.9387C-0.0603826 22.6199 -0.107377 22.056 0.211459 21.6792C1.138 20.5842 2.73865 19.3926 4.84128 19.0691C6.97988 18.7401 9.50271 19.3299 12.1907 21.5699C14.7333 23.6886 16.7266 24.1605 18.4302 23.9396C20.2061 23.7094 21.831 22.7156 23.6352 21.5128L24.1309 22.2565L23.6352 21.5128C24.7515 20.7686 26.4572 19.6593 28.5644 19.3081C30.7294 18.9473 33.2212 19.3987 35.8686 21.5647C40.3565 25.2366 45.2562 24.0386 48.1271 21.5779C50.3885 19.6396 52.8657 18.4711 55.6312 18.8082C58.3691 19.1419 61.1614 20.9261 64.1308 24.3523C64.4541 24.7253 64.4138 25.2897 64.0408 25.613C63.6678 25.9363 63.1033 25.896 62.7801 25.523C59.9401 22.2461 57.5184 20.8389 55.4149 20.5825Z'
                            fill='#ff0050'
                          />
                          <path
                            fill-rule='evenodd'
                            clip-rule='evenodd'
                            d='M55.4149 29.9622C53.339 29.7091 51.3475 30.5515 49.2904 32.3147C45.9052 35.2162 40.0312 36.6597 34.7367 32.3278C32.4686 30.4721 30.4916 30.1787 28.8583 30.4509C27.1671 30.7328 25.7447 31.6344 24.6267 32.3797C22.8559 33.5603 20.9058 34.8008 18.66 35.0919C16.3417 35.3924 13.8663 34.6726 11.0464 32.3227C8.68536 30.3551 6.66501 29.9767 5.11309 30.2154C3.52519 30.4597 2.28797 31.372 1.576 32.2134C1.25716 32.5902 0.69323 32.6372 0.316424 32.3184C-0.0603826 31.9995 -0.107377 31.4356 0.211459 31.0588C1.138 29.9638 2.73865 28.7722 4.84128 28.4488C6.97988 28.1197 9.50271 28.7095 12.1907 30.9495C14.7333 33.0683 16.7266 33.5401 18.4302 33.3193C20.2061 33.0891 21.831 32.0953 23.6352 30.8925L24.1309 31.6361L23.6352 30.8925C24.7515 30.1483 26.4572 29.039 28.5644 28.6878C30.7294 28.3269 33.2212 28.7783 35.8686 30.9444C40.3565 34.6163 45.2562 33.4183 48.1271 30.9575C50.3885 29.0192 52.8657 27.8507 55.6312 28.1878C58.3691 28.5216 61.1614 30.3057 64.1308 33.7319C64.4541 34.1049 64.4138 34.6694 64.0408 34.9926C63.6678 35.3159 63.1033 35.2756 62.7801 34.9026C59.9401 31.6258 57.5184 30.2186 55.4149 29.9622Z'
                            fill='#ff0050'
                          />
                        </svg>
                      </div>
                      <div className='absolute top-0 left-0 h-full w-full bg-texture'></div>
                    </div>
                  </div>
                </div>

                <div className='w-full px-4 lg:w-1/2'>
                  <div className='wow fadeInUp lg:ml-auto lg:max-w-[510px]' data-wow-delay='.3s'>
                    <h2 className='mb-4 text-3xl font-bold text-black  sm:text-4xl md:text-[44px] md:leading-tight'>
                      Join Trustky Today - Your Resume, Your Privacy
                    </h2>
                    <p className='mb-[30px] text-base leading-relaxed text-body'>
                      Take charge of your resume-building experience with Trustky. Say goodbye to
                      compromising your privacy for the sake of convenience. Embrace a new era of
                      resume building where trust and security go hand in hand.
                      <br /> Ready to build your resume with confidence? Sign up for Trustky now and
                      unlock the power of privacy in the world of resume building. Your privacy
                      matters, and at Trustky, we've got your back every step of the way.
                    </p>
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
              <circle cx='95' cy='95' r='77' stroke='url(#paint0_linear_47_27)' stroke-width='36' />
              <defs>
                <linearGradient
                  id='paint0_linear_47_27'
                  x1='0'
                  y1='0'
                  x2='224.623'
                  y2='130.324'
                  gradientUnits='userSpaceOnUse'>
                  <stop stop-color='#FF8FE8' />
                  <stop offset='1' stop-color='#FFC960' />
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
                Our partners
              </h2>
              <p className='text-base text-body'>
                We leverage amazing technologies to build Trustky
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
                    <img
                      src='/images/sponsors/worldcoin.png'
                      className='mx-auto mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-3xl bg-opacity-20 duration-300'
                      alt=''
                    />
                    <h3 className='mb-4 text-xl font-semibold text-black  sm:text-[22px] xl:text-[26px]'>
                      Worldcoin
                    </h3>
                  </div>
                </div>

                <div className='w-full px-4 md:w-1/2 lg:w-1/3'>
                  <div
                    className='wow fadeInUp group mx-auto mb-[60px] max-w-[310px] text-center'
                    data-wow-delay='.3s'>
                    <img
                      src='/images/sponsors/eas.png'
                      className='mx-auto mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-3xl bg-redpraha bg-opacity-20 text-redpraha duration-300 group-hover:bg-redpraha group-hover:text-white'
                      alt=''
                    />

                    <h3 className='mb-4 text-xl font-semibold text-black  sm:text-[22px] xl:text-[26px]'>
                      EAS
                    </h3>
                  </div>
                </div>

                <div className='w-full px-4 md:w-1/2 lg:w-1/3'>
                  <div
                    className='wow fadeInUp group mx-auto mb-[60px] max-w-[310px] text-center'
                    data-wow-delay='.4s'>
                    <img
                      src='/images/sponsors/lit.png'
                      className='mx-auto mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-3xl bg-redpraha bg-opacity-20 text-redpraha duration-300 group-hover:bg-redpraha group-hover:text-white'
                      alt=''
                    />
                    <h3 className='mb-4 text-xl font-semibold text-black  sm:text-[22px] xl:text-[26px]'>
                      Lit Protocol
                    </h3>
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
                  color-interpolation-filters='sRGB'>
                  <feFlood flood-opacity='0' result='BackgroundImageFix' />
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
                  <stop stop-color='#8EA5FE' />
                  <stop offset='0.541667' stop-color='#BEB3FD' />
                  <stop offset='1' stop-color='#90D1FF' />
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
                  color-interpolation-filters='sRGB'>
                  <feFlood flood-opacity='0' result='BackgroundImageFix' />
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
                  <stop stop-color='#FF8FE8' />
                  <stop offset='1' stop-color='#FFC960' />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </section>

        {/* <section id='testimonials' className='relative z-10 pt-[110px] pb-[60px]'>
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
                            <g clip-path='url(#clip0_49_480)'>
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
                            <g clip-path='url(#clip0_49_480)'>
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
                            <g clip-path='url(#clip0_49_480)'>
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
                            <g clip-path='url(#clip0_49_480)'>
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
                            <g clip-path='url(#clip0_49_480)'>
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
                            <g clip-path='url(#clip0_49_480)'>
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
                            <g clip-path='url(#clip0_49_480)'>
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
                            <g clip-path='url(#clip0_49_480)'>
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
                            <g clip-path='url(#clip0_49_480)'>
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
                            <g clip-path='url(#clip0_49_480)'>
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
        </section> */}

        <section id='faq' className='relative z-10 bg-[#F8FAFB] py-[110px] '>
          <div className='container'>
            <div
              className='wow fadeInUp mx-auto mb-14 max-w-[690px] text-center lg:mb-[70px]'
              data-wow-delay='.2s'>
              <h2 className='mb-4 text-3xl font-bold text-black  sm:text-4xl md:text-[44px] md:leading-tight'>
                Frequently Asked Questions
              </h2>
            </div>

            <div
              className='faqs wow fadeInUp mx-auto w-full max-w-[785px] rounded-lg bg-white px-6 py-[6px] shadow-car'
              data-wow-delay='.3s'>
              <div className='faq border-b border-stroke last-of-type:border-none'>
                <button className='faq-btn relative flex w-full justify-between pt-6 pb-1 px-[18px] text-left text-base font-medium text-black  sm:px-[26px] sm:text-lg'>
                  Why you are so cool ?
                </button>
                <div className='pb-4 h-auto overflow-hidden px-[18px] sm:px-[26px]'>
                  <p className='text-base text-body'>Cause i'm a Husky</p>
                </div>
              </div>

              <div className='faq border-b border-stroke last-of-type:border-none'>
                <button className='faq-btn relative flex w-full justify-between pt-6 pb-1 px-[18px] text-left text-base font-medium text-black  sm:px-[26px] sm:text-lg'>
                  Could we drink a beer together ?
                </button>
                <div className='pb-4 h-auto overflow-hidden px-[18px] sm:px-[26px]'>
                  <p className='text-base text-body'>No i'm Husky</p>
                </div>
              </div>

              <div className='faq border-b border-stroke last-of-type:border-none'>
                <button className='faq-btn relative flex w-full justify-between pt-6 pb-1 px-[18px] text-left text-base font-medium text-black  sm:px-[26px] sm:text-lg'>
                  Do you practice skying ?
                </button>
                <div className='pb-4 h-auto overflow-hidden px-[18px] sm:px-[26px]'>
                  <p className='text-base text-body'>No i'm a Husky</p>
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
              <circle
                cx='95'
                cy='95'
                r='77'
                stroke='url(#paint0_linear_49_603)'
                stroke-width='36'
              />
              <defs>
                <linearGradient
                  id='paint0_linear_49_603'
                  x1='0'
                  y1='0'
                  x2='224.623'
                  y2='130.324'
                  gradientUnits='userSpaceOnUse'>
                  <stop stop-color='#FF8FE8' />
                  <stop offset='1' stop-color='#FFC960' />
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
              <circle cy='95' r='77' stroke='url(#paint0_linear_52_83)' stroke-width='36' />
              <defs>
                <linearGradient
                  id='paint0_linear_52_83'
                  x1='-117.84'
                  y1='190'
                  x2='117.828'
                  y2='25.9199'
                  gradientUnits='userSpaceOnUse'>
                  <stop stop-color='#0f172a' />
                  <stop stop-color='#FF8FE8' />
                  <stop offset='1' stop-color='#FFC960' />
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
              <p className='text-base text-body'>No i'm so tired, i'm a Husky, i'm not a robot</p>
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
                  &copy; 2023 TrustKy
                </p>
              </div>

              <div className='w-full px-3 md:w-1/2 lg:w-1/3'>
                <div className='mb-4 flex items-center justify-center space-x-5 md:mb-0 md:justify-start lg:justify-center'>
                  <a
                    href='https://twitter.com/'
                    className='text-white opacity-70 hover:opacity-100'
                    target='_blank'
                    aria-label='social icon'>
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'>
                      <g clip-path='url(#clip0_53_166)'>
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
                      <g clip-path='url(#clip0_53_166)'>
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
