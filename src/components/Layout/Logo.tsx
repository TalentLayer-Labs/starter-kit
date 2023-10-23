import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import SpaceContext from '../../modules/MultiDomain/context/SpaceContext';

function Logo({ theme = 'dark' }: { theme?: 'dark' | 'light' }) {
  const { space } = useContext(SpaceContext);

  return (
    <div>
      <Link href='/' className='flex items-end'>
        <h1 className='text-stone-800 text-3xl font-bold'>{space?.name}</h1>
        <p className='text-stone-800 mb-[2px] ml-1'>builder place</p>
        {/* <Image
          src={'/logo-text-stone-800.png'}
          width={180}
          height={36}
          alt='BuilderPlace logo'
          className='-ml-2 sm:ml-0'
        /> */}
      </Link>
    </div>
  );
}

export default Logo;
