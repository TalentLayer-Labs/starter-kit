import ServiceList from '../../components/ServiceList';

import { GetServerSidePropsContext } from 'next';
import OrganizationHeader from '../../components/OrganizationHeader';
import { sharedGetServerSideProps } from '../../utils/sharedGetServerSideProps';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return sharedGetServerSideProps(context);
}

export default function BuilderPlaceHome() {
  return (
    <div className='max-w-7xl mx-auto text-base-content'>
      <OrganizationHeader />

      <div className='-mx-6 -mt-6 sm:mx-0 sm:mt-0'>
        <div className='flex py-2 px-6 sm:px-0 justify-center items-center text-center w-full mb-3'>
          <p className='text-2xl sm:text-4xl font-bold mt-12'>opportunities in our ecosystem</p>
        </div>
        <div className='flex py-2 px-6 sm:px-0 justify-center items-center text-center w-full sm:mb-8'>
          <p className='text-sm mb-2'>explore the open-source missions we need help with</p>
        </div>
      </div>
      <ServiceList />
    </div>
  );
}
