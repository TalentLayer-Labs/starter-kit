import React from 'react';
import Web3mailForm from '../../modules/Web3mail/components/Web3mailForm';
import { Web3MailProvider } from '../../modules/Web3mail/context/web3mail';
import Web3mailCard from '../../modules/Web3mail/components/Web3mailCard';
import { getBuilderPlace } from '../../modules/BuilderPlace/queries';

export async function getServerSideProps({ params }: any) {
  return await getBuilderPlace(params.domain);
}

export default function web3mail() {
  return (
    <div className='max-w-5xl mx-auto text-base-content sm:px-4 lg:px-0 mt-6'>
      <div className='flex items-center justify-center w-full flex-col'>
        <div className='pb-16 border-info relative w-full transition-all duration-300 rounded-md'>
          <div className='border border-info rounded-xl p-6 bg-base-100'>
            <Web3MailProvider>
              <div className='grid grid-cols-1 gap-6'>
                <h1 className='text-2xl font-bold flex-1 mt-6 border-b w-full border-info mb-8'>
                  Setup your web3mail
                </h1>
                <Web3mailCard />
                <Web3mailForm />
              </div>
            </Web3MailProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
