import { Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import { Fragment, useEffect, useState } from 'react';
import { useNetwork, useSwitchNetwork } from 'wagmi';
import NetworkLink from './NetworkLink';
import { NetworkEnum } from '../types';

function NetworkSwitch() {
  const network = useNetwork();
  const { chains } = network;
  const [loading, setLoading] = useState(true);
  const { switchNetwork: switchToDefaultNetwork } = useSwitchNetwork({
    chainId: process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID as unknown as number,
  });

  // Tips to prevent nextJs error: Hydration failed because the initial UI does not match what was rendered on the server.
  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return null;
  }

  if (network?.chain === undefined) {
    return null;
  }

  const needToSwitch =
    network.chain.id != (process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID as unknown as NetworkEnum);

  if (needToSwitch) {
    return (
      <button
        onClick={() => switchToDefaultNetwork && switchToDefaultNetwork()}
        className='text-error text-xs italic'>
        wrong network, <span className='underline hover:text-red-700'>switch now</span>
      </button>
    );
  }

  return (
    <Menu as='div' className='relative text-left flex items-center'>
      <Menu.Button
        type='button'
        className='hover:ring-muted-700 border-info bg-muted-800 ring-offset-muted-900 flex h-9 w-9 items-center justify-center rounded-full border bg-base-300 ring-1 ring-transparent transition-all duration-300 hover:ring-offset-4'>
        <Image
          width={28}
          height={28}
          className='h-7 w-7 rounded-full'
          src={`/images/blockchain/${network.chain?.id}.png`}
          alt={`${network.chain?.name}  icon`}
        />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'>
        <Menu.Items className='absolute right-0 top-[60px] z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-info bg-base-300'>
          <div className='py-1 '>
            {chains.map(
              chain =>
                chain.id ==
                  (process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID as unknown as NetworkEnum) && (
                  <Menu.Item key={chain.id}>
                    <NetworkLink chaindId={chain.id} chainName={chain.name} />
                  </Menu.Item>
                ),
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default NetworkSwitch;
