import { ChevronLeft } from 'heroicons-react';
import { useRouter } from 'next/router';

function Back() {
  const router = useRouter();

  return (
    <nav className='flex' aria-label='Back'>
      <ol className='inline-flex items-center space-x-1 md:space-x-3'>
        <li className=''>
          <a
            href='#'
            onClick={() => router.back()}
            className='text-sm font-medium text-base-content inline-flex items-center -ml-1'>
            <ChevronLeft />
            Back
          </a>
        </li>
      </ol>
    </nav>
  );
}

export default Back;
