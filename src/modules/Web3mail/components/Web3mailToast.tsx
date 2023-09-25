import { ArrowSmallRightIcon } from '@heroicons/react/24/outline';

function Web3mailToast() {
  return (
    <div className='flex flex-row items-center rounded-2xl p-4'>
      <div className='mt-6 grow sm:mt-0'>
        <div className='pb-4 text-center sm:pb-0 sm:text-left'>
          <p className='font-heading text-md font-semibold leading-normal mb-2 opacity-90'>
            <span className='text-4xl block'>🪄</span>
            <span> Active email notification now!</span>
          </p>
          <p className='font-alt text-sm font-normal leading-normal max-w-sm opacity-70'>
            <span>
              {' '}
              Your email will never be stored in a database, with iExec web3mail, you can allow your
              email to be used without being disclosed to anyone, including us{' '}
            </span>
          </p>
          <div className='mt-3'>
            <a
              href='/dashboard/profile/edit/privacy'
              className='px-5 py-2 rounded-xl bg-redpraha hover:bg-gray-200 text-white hover:text-gray-900 inline-flex items-center text-xs'>
              <span>Active now</span>
              <ArrowSmallRightIcon width='16' height='16' className='ml-2' />
            </a>

            <a
              href='/dashboard/profile/edit/privacy'
              className='px-3 py-1 underline text-gray-900 hover:text-gray-600 inline-flex items-center text-xs'>
              <span>Learn more</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Web3mailToast;
