import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function SearchServiceButton(props?: { value?: string }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setSearchQuery(props!.value || '');
  }, [props!.value]);

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    const formElm = e.target as HTMLFormElement;
    const searchQueryRef = formElm.querySelector('input')!.value;
    if (searchQueryRef.length > 0) {
      router.push({
        pathname: '/work',
        query: { search: searchQueryRef },
      });
    } else router.push('/work');
  }, []);

  return (
    <form onSubmit={e => handleSubmit(e)} className='flex w-full'>
      <div className='flex bg-base-100 py-2 px-4 sm:px-2 justify-center items-center flex-row rounded-xl w-full bg-base-200 border border-info'>
        <div className='sm:px-6 flex flex-row items-center'>
          <span className='text-base-content opacity-50'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth='2'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
          </span>
          <input
            className='text-base-content opacity-50 py-2 focus:ring-0 outline-none text-sm sm:text-lg border-0'
            type='text'
            placeholder='Search by title'
            onChange={e => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
        </div>
        <div className='sm:px-4 flex flex-row  sm:space-x-4 justify-between items-center'>
          <button
            type='submit'
            className='px-5 py-2  rounded-xl hover:text-content hover:bg-base-100 text-base-content bg-base-300'>
            Search
          </button>
        </div>
      </div>
    </form>
  );
}

export default SearchServiceButton;
