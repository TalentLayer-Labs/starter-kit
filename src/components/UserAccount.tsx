import { Menu, Transition } from '@headlessui/react';
import { Fragment, useContext, useEffect, useState } from 'react';
import TalentLayerContext from '../context/talentLayer';
import UserSubMenu from './UserSubMenu';

function UserAccount() {
  const { account, user } = useContext(TalentLayerContext);
  const [loading, setLoading] = useState(true);

  // Tips to prevent nextJs error: Hydration failed because the initial UI does not match what was rendered on the server.
  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return null;
  }

  return (
    <div className='flex justify-between'>
      <div className='px-4 flex items-center'>
        {/* Profile dropdown */}
        <Menu as='div' className='relative'>
          <div>
            {account && account.isConnected === true && (
              <div className='flex items-center relative group'>
                <Menu.Button className='group-hover:ring-redpraha ring-offset-midnight inline-flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-transparent transition-all duration-300 group-hover:ring-offset-4'>
                  <span className='sr-only'>Open user menu</span>
                  <img
                    className='h-9 w-9 rounded-full'
                    alt=''
                    src={
                      user?.description?.image_url
                        ? user?.description?.image_url
                        : `/images/default-avatar-${Number(user?.id ? user.id : '1') % 9}.jpeg`
                    }
                    width={50}
                    height={50}
                  />
                </Menu.Button>

                {/* <Menu.Button className='ml-3 text-left'>
                  <p
                    className='text-sm font-medium text-gray-200 group-hover:text-gray-100'
                    style={{ marginBottom: '-3px' }}>
                    {user?.handle ? user.handle : ''}
                  </p>
                  <p className='text-xs text-redpraha group-hover:text-gray-700'>
                    {account.address && truncateAddress(account.address)}
                  </p>
                </Menu.Button> */}
              </div>
            )}
          </div>
          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'>
            <Menu.Items className='absolute right-0 z-50 mt-2 w-64 origin-top-right rounded-xl bg-midnight py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
              <UserSubMenu />
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}

export default UserAccount;
