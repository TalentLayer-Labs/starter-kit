import ServiceList from '../../components/ServiceList';
import { getBuilderPlace } from '../../modules/BuilderPlace/queries';

export async function getServerSideProps({ params }: any) {
  return await getBuilderPlace(params.domain);
}

export default function BuilderPlaceHome() {
  return (
    <div className='max-w-7xl mx-auto text-base-content'>
      <div className='-mx-6 -mt-6 sm:mx-0 sm:mt-0'>
        <div className='flex py-2 px-6 sm:px-0 justify-center items-center w-full mb-3'>
          <p className='text-2xl sm:text-4xl font-bold mt-6'>opportunities in our ecosystem</p>
        </div>
        <div className='flex py-2 px-6 sm:px-0 justify-center items-center w-full mb-8'>
          <p className='text-sm mb-2'>explore the open-source missions we need help with</p>
        </div>
      </div>
      <ServiceList />
    </div>
  );
}
