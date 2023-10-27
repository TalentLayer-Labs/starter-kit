import React from 'react';
import { useChainId, useSwitchNetwork } from 'wagmi';
import { NetworkEnum } from '../../../types';

function Web3mailStep1() {
  const chainId = useChainId();
  const { switchNetwork } = useSwitchNetwork();

  const isCompleted = chainId === NetworkEnum.IEXEC;

  if (isCompleted) {
    return null;
  }

  return (
    <div className='pb-6'>
      <label className='block'>
        <div className='mb-2 ml-0.5'>
          <div className='flex justify-between'>
            <div>
              <p className='font-heading text-base-content font-medium leading-none'>
                Step1: Switch to web3mail chain
              </p>
              <p className='font-sans text-xs font-normal leading-normal text-base-content mt-0.5'>
                iExec sidechain is used to setup your email and protect it.
              </p>
            </div>
          </div>
        </div>
      </label>
      <button
        onClick={() => switchNetwork && switchNetwork(NetworkEnum.IEXEC)}
        className='grow px-5 py-2 rounded-xl bg-info text-base-content hover:bg-base-200 inline-flex align-center justify-center '>
        <span>Switch to iExec chain</span>
      </button>
    </div>
  );
}

export default Web3mailStep1;
