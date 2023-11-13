import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function SearchServiceButton(props?: { value?: string }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

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
    <form onSubmit={e => handleSubmit(e)} className='flex'>
      <div className='flex justify-end'>
        <div
          className={`flex flex-row rounded-3xl border ${
            isFocused ? 'opacity-100' : 'opacity-60'
          }`}>
          <div className='px-6 flex flex-row items-center'>
            <input
              className='text-base-content opacity-50 py-3 pl-0 focus:ring-0 outline-none text-sm border-0 bg-base-200'
              type='text'
              placeholder='Search by title'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onFocus={e => setIsFocused(true)}
              onBlur={e => setIsFocused(false)}
            />
          </div>
          <div className='px-2 flex flex-row justify-between items-center'>
            <button
              type='submit'
              className='px-5 py-1 rounded-3xl hover:bg-primary-focus bg-primary text-primary'>
              Search
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default SearchServiceButton;
