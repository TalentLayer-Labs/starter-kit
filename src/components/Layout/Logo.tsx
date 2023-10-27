import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import BuilderPlaceContext from '../../modules/BuilderPlace/context/BuilderPlaceContext';

function Logo({ theme = 'dark' }: { theme?: 'dark' | 'light' }) {
  const { builderPlace } = useContext(BuilderPlaceContext);

  return (
    <div>
      <Link href='/' className='flex items-end flex-wrap'>
        <h1 className='text-base-content text-3xl font-bold'>{builderPlace?.name}</h1>
        <p className='text-base-content mb-[2px] ml-1'>builder place</p>
        {/* <Image
          src={'/logo-text-base-content.png'}
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
