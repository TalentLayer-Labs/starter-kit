'use client';

import { PlayCircleIcon } from '@heroicons/react/24/solid';
import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import { useState } from 'react';

export const IntroducationSecion = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section
      id='video'
      className='relative bg-base-content py-0 md:py-24 text-center text-base-100'>
      <div className='container'>
        <div
          className='wow fadeInUp mx-auto mb-14 max-w-[740px] text-center lg:mb-[20px]'
          data-wow-delay='.2s'>
          <h2 className='mb-4 pt-10 text-3xl font-bold text-black  sm:text-4xl pt-10 md:text-[44px] md:leading-tight'>
            white-label <span className='text-landingprimary'>open-source management</span> for your
            ecosystem
          </h2>
          <p className='text-base text-body'>
            every open-source movement starts with a first contributor. learn how your BuilderPlace
            helps you grow a coalition around your product.
          </p>
        </div>
      </div>
      <div className='container flex flex-col items-center lg:max-w-[1305px] lg:px-10'>
        <div
          className='group relative text-center cursor-pointer'
          onClick={() => setShowVideo(true)}>
          <Image
            src='/images/video.png'
            width={700}
            height={100}
            alt='TalentLayer'
            className='object-cover group-hover:opacity-80'
          />
          <button className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
            <PlayCircleIcon className='h-20 w-20 text-primary hover:text-primary-focus md:h-36 md:w-36' />
          </button>
        </div>
        {showVideo && (
          <Dialog.Root open={showVideo} onOpenChange={setShowVideo}>
            <Dialog.Portal>
              <Dialog.Overlay className='fixed inset-0 z-20 flex items-center justify-center bg-black/50 dark:bg-gray-700/50'>
                <Dialog.Content className='relative max-h-[90vh] w-[94%] max-w-[76rem] '>
                  <div className='pt-[55%]'>
                    <iframe
                      className='absolute inset-0'
                      width='100%'
                      height='100%'
                      src='https://www.youtube.com/embed/HeWLn6BE9NQ?si=O4PER1AOMpeykVMj?autoplay=1&mute=1'
                      title='YouTube video player'
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                      allowFullScreen></iframe>
                  </div>
                </Dialog.Content>
              </Dialog.Overlay>
            </Dialog.Portal>
          </Dialog.Root>
        )}
      </div>
    </section>
  );
};
