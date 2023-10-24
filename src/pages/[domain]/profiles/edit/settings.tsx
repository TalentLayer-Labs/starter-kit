import { Cog8ToothIcon } from '@heroicons/react/24/outline';
import Layout from '../../../../components/EditProfile/Layout';
import { getBuilderPlace } from '../../../../modules/BuilderPlace/queries';

export async function getServerSideProps({ params }: any) {
  return await getBuilderPlace(params.domain);
}

function EditSettings() {
  return (
    <Layout>
      <h2 className='text-stone-800 text-xl font-bold text-center my-4'>Comming soon</h2>
      <div className='bg-midnight relative flex flex-1 items-center justify-center bg-gradient-to-br p-5 shadow-xl rounded-xl'>
        <div className='relative z-20 flex flex-col gap-3'>
          <p className=''>
            <span className='text-stone-400'>
              {' '}
              Customize your interface
              <br />
              Choose your language
              <br />
              And more
              <br />
            </span>
          </p>
          <a
            aria-current='page'
            href='#'
            className='text-sm text-stone-400 underline-offset-4 underline'>
            {' '}
            Learn More{' '}
          </a>
        </div>
        <div className='absolute right-2 bottom-2 z-10 flex h-14 w-14 items-center justify-center text-redpraha'>
          <Cog8ToothIcon width={56} height={56} />
        </div>
      </div>
    </Layout>
  );
}

export default EditSettings;
