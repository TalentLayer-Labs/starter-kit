import React from 'react';
import useTotalGainByUser from '../hooks/useTotalGainByUser';
import { IUser } from '../types';
import { renderTokenAmount } from '../utils/conversion';
import Link from 'next/link';
import DelegateModal from './Modal/DelegateModal';

interface IProps {
  user: IUser;
}

function UserGains({ user }: IProps) {
  const userGains = useTotalGainByUser(user.id);

  if (userGains.length === 0) {
    return null;
  }

  return (
    <>
      <h2 className='pb-4 text-base-content font-bold break-all'>Your total gain</h2>
      <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4'>
        {userGains.map((gain, i) => {
          return (
            <div
              className='flex items-center p-4 bg-base-100 rounded-xl border border-info'
              key={i}>
              <div className='flex flex-shrink-0 items-center justify-center bg-success h-16 w-16 rounded'>
                <svg
                  className='w-6 h-6 fill-current text-success'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'>
                  <path
                    fillRule='evenodd'
                    d='M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              <div className='flex-grow flex flex-col ml-4'>
                <span className='text-xl font-bold'>
                  {renderTokenAmount(gain.token, gain.totalGain)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default UserGains;
