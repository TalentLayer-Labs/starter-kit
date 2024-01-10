import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useDisconnect } from 'wagmi';
import TalentLayerContext from '../context/talentLayer';
import { truncateAddress } from '../utils';
import ProfileImage from './ProfileImage';
import DelegatedTransactionCounter from './DelegatedTransactionCounter';

function UserSubMenu() {
  const { account, user } = useContext(TalentLayerContext);
  const router = useRouter();
  const { disconnect } = useDisconnect();

  if (!user) {
    return null;
  }

  return (
    <div
      role='menu'
      className='divide-stone-300 bg-base-200 mt-2 w-64 origin-top-right divide-y rounded-md focus:outline-none'>
      <div className='p-6 text-center' role='none'>
        <div
          className='relative mx-auto flex h-20 w-20 items-center justify-center rounded-full'
          role='none'>
          <ProfileImage size={50} url={user?.description?.image_url} />
        </div>
        <div className='mt-3' role='none'>
          <h6
            className='font-heading text-base-content opacity-50 text-sm font-medium dark:text-base-content'
            role='none'>
            {' '}
            {user?.handle}{' '}
          </h6>
          <p className='text-base-content mb-4 font-sans text-xs' role='none'>
            {account?.address && truncateAddress(account.address)}
          </p>
          {user && (
            <div>
              <Link
                href='/profiles/edit'
                className='mt-2 border border-info rounded-xl hover:bg-base-300 text-base-content bg-base-200 px-5 py-2 w-full'
                role='none'>
                manage account
              </Link>
              {process.env.NEXT_PUBLIC_DELEGATE_ADDRESS && <DelegatedTransactionCounter />}
            </div>
          )}
        </div>
      </div>
      <div className='p-3' role='none'>
        <button
          onClick={event => {
            event.preventDefault();
            disconnect();
            router.push('/');
          }}
          className={`text-error bg-error hover:opacity-80 px-5 py-2.5 rounded-xl text-md relative w-full`}>
          log out
        </button>
      </div>
    </div>
  );
}

export default UserSubMenu;
