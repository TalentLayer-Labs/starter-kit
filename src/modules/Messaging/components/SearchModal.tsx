import { SearchOutline } from 'heroicons-react';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import TalentLayerContext from '../../../context/talentLayer';

function SearchModal() {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState('');
  const { account } = useContext(TalentLayerContext);
  const router = useRouter();

  const handleChat = () => {
    const chatLink = `/messaging/${search}`;
    router.push(chatLink);
  };

  return (
    <>
      <button
        type='button'
        className=' hover:bg-endnight text-stone-800 bg-endnight px-3 py-2 text-sm flex items-center mr-4 rounded-xl'
        onClick={() => setShow(true)}>
        <SearchOutline className='w-[18px] h-[18px] text-stone-600 mr-2' />
        Search
      </button>

      <div
        className={`${
          !show ? 'hidden' : ''
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal h-full bg-black/90 flex flex-col items-center justify-center`}>
        <div className='relative w-full max-w-2xl h-auto'>
          <div className='relative bg-endnight shadow '>
            <div className='fixed top-0 right-0'>
              <button
                onClick={() => setShow(false)}
                type='button'
                className='text-stone-600 bg-transparent hover:bg-midnight hover:text-stone-800 rounded-xl text-sm p-4 ml-auto inline-flex items-center '
                data-modal-toggle='defaultModal'>
                <svg
                  className='w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    fillRule='evenodd'
                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                    clipRule='evenodd'></path>
                </svg>
                <span>Close</span>
              </button>
            </div>
            <div className='flex flex-col justify-between items-center '>
              <h3 className='text-xl font-semibold text-center py-6'>Search by address</h3>
              <div className='flex justify-center'>
                <input
                  type='text'
                  name='search'
                  className='mt-1 mb-1 block w-full rounded-xl border border-redpraha bg-midnight shadow-sm focus:ring-opacity-50'
                  onChange={e => {
                    setSearch(e.target.value);
                  }}
                  value={search}
                />
              </div>
              <a
                onClick={handleChat}
                className='flex p-3 bg-endnight border-endnight rounded-xl justify-between mt-10 text-stone-800'>
                Chat
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchModal;
