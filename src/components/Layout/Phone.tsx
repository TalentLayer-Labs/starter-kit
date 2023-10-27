import Image from 'next/image';
import Link from 'next/link';

function Phone({ theme = 'dark' }: { theme?: 'dark' | 'light' }) {
  return (
    <h1 className={`text-1xl ${theme == 'light' ? 'text-base-content' : 'text-primary'}`}>
      <Link href='/' className='flex items-center'>
        <Image
          src={'/phone.png'}
          width={180}
          height={36}
          alt='phone image'
          className='-ml-2 sm:ml-0'
        />
      </Link>
    </h1>
  );
}

export default Phone;
