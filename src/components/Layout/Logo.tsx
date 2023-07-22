import Image from 'next/image';
import Link from 'next/link';

function Logo({ theme = 'dark' }: { theme?: 'dark' | 'light' }) {
  return (
    <div className={`text-1xl ${theme == 'light' ? 'text-white' : 'text-redpraha'}`}>
      <Link href='/' className='flex items-center'>
        <Image
          src={'/logo-text-white.png'}
          width={180}
          height={36}
          alt='Trustky Logo'
          className='-ml-2 sm:ml-0'
        />
      </Link>
    </div>
  );
}

export default Logo;
