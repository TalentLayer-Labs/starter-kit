import React from 'react';
import { Container } from './container';

export const Footer = () => {
  return (
    <footer>
      <Container>
        <div className='flex items-center justify-center border-t border-base-300/50 py-6 text-sm'>
          <p className='order-1 basis-full text-center md:order-none md:basis-auto'>
            COPYRIGHT © 2023 TRUSTKY
          </p>
        </div>
        <div className='flex  items-center justify-center border-t border-base-300/50 py-6 text-sm'>
          <a className='me-2 btn-primary btn-sm btn my-2 mr-2' href='https://talentlayer.org'>
            Learn About TalentLayer
          </a>
        </div>
      </Container>
    </footer>
  );
};
