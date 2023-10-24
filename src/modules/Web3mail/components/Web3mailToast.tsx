import { ArrowSmallRightIcon } from '@heroicons/react/24/outline';

function Web3mailToast() {
  return (
    <div className='flex flex-row items-center rounded-2xl p-4'>
      <div className='mt-6 grow sm:mt-0'>
        <div className='pb-4 text-center sm:pb-0 sm:text-left'>
          <p className='font-heading text-md font-semibold leading-normal mb-2 opacity-90'>
            <span className='text-4xl block'>🪄</span>
            <span> Activate email notifications now !</span>
          </p>
          <p className='font-alt text-sm font-normal leading-normal max-w-sm opacity-70'>
            <span>
              {' '}
              Your email will never be stored by us or TalentLayer. With iExec web3mail, you can
              allow your email to be used without being disclosed to us.{' '}
            </span>
          </p>
          <div className='mt-3'>
            <a
              href='/profiles/edit/privacy'
              className='px-5 py-2 rounded-xl bg-redpraha hover:bg-midnight text-stone-800 hover:text-stone-800 inline-flex items-center text-xs'>
              <span>Activate now</span>
              <ArrowSmallRightIcon width='16' height='16' className='ml-2' />
            </a>

            <a
              href='/profiles/edit/privacy'
              className='px-3 py-1 underline text-stone-800 hover:text-stone-400 inline-flex items-center text-xs'>
              <span>Learn more</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Web3mailToast;
