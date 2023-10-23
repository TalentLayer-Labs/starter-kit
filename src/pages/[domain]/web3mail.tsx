import React from 'react';
import Web3mailForm from '../../modules/Web3mail/components/Web3mailForm';
import { Web3MailProvider } from '../../modules/Web3mail/context/web3mail';
import Web3mailCard from '../../modules/Web3mail/components/Web3mailCard';

export default function web3mail() {
  return (
    <div className='max-w-7xl mx-auto text-stone-800 sm:px-4 lg:px-0'>
      <div className='flex items-center justify-center w-full flex-col'>
        <Web3MailProvider>
          <div className='grid grid-cols-1 gap-6'>
            <Web3mailCard />
            <Web3mailForm />
          </div>
        </Web3MailProvider>
      </div>
    </div>
  );
}
