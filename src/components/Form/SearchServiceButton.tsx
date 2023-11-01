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
      <div className='flex w-full justify-end'>
        <div className='flex flex-row rounded-3xl border'>
          <div className='sm:px-6 flex flex-row items-center'>
            <input
              className='text-base-content opacity-50 py-2 focus:ring-0 outline-none text-sm sm:text-lg border-0'
              type='text'
              placeholder='Search by title'
              onChange={e => setSearchQuery(e.target.value)}
              value={searchQuery}
            />
          </div>
          <div className='sm:px-4 flex flex-row sm:space-x-4 justify-between items-center'>
            <button
              type='submit'
              className='px-5 py-1   rounded-3xl hover:text-content hover:bg-base-100 text-base-content bg-gray-400'>
              Search
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default SearchServiceButton;
