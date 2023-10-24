import ServiceList from '../../components/ServiceList';
import { getBuilderPlace } from '../../modules/BuilderPlace/queries';

export async function getServerSideProps({ params }: any) {
  return await getBuilderPlace(params.domain);
}

export default function BuilderPlaceHome() {
  return (
    <div className='max-w-7xl mx-auto text-stone-800 sm:px-4 lg:px-0'>
      <div className='-mx-6 -mt-6 sm:mx-0 sm:mt-0'>
        <div className='flex py-2 px-6 sm:px-0 items-center border-b w-full border-redpraha mb-8'>
          <p className='text-2xl font-medium flex-1'>
            Open <span className='text-stone-800 ml-1'> work </span>
          </p>
        </div>
      </div>
      <ServiceList />
    </div>
  );
}
