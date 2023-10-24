import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useDisconnect } from 'wagmi';
import TalentLayerContext from '../context/talentLayer';
import { truncateAddress } from '../utils';
import Link from 'next/link';

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
      className='divide-stone-300 bg-midnight mt-2 w-64 origin-top-right divide-y rounded-md focus:outline-none'>
      <div className='p-6 text-center' role='none'>
        <div
          className='relative mx-auto flex h-20 w-20 items-center justify-center rounded-full'
          role='none'>
          <Image
            src={`/images/default-avatar-${Number(user?.id) % 9}.jpeg`}
            className='max-w-full rounded-full object-cover shadow-sm'
            width={80}
            height={80}
            alt='default avatar'
          />
        </div>
        <div className='mt-3' role='none'>
          <h6
            className='font-heading text-stone-400 text-sm font-medium dark:text-stone-800'
            role='none'>
            {' '}
            {user?.handle}{' '}
          </h6>
          <p className='text-stone-600 mb-4 font-sans text-xs' role='none'>
            {account?.address && truncateAddress(account.address)}
          </p>
          {user && (
            <Link
              href='/profiles/edit'
              className='mt-2 border border-redpraha rounded-xl hover:bg-endnight text-stone-800 bg-midnight px-5 py-2 w-full'
              role='none'>
              Manage Account
            </Link>
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
          className={`rounded-xl is-button-default w-full`}>
          Log out
        </button>
      </div>
    </div>
  );
}

export default UserSubMenu;
