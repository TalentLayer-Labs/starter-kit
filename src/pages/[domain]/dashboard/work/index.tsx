import { useRouter } from 'next/router';
import SearchServiceButton from '../../../../components/Form/SearchServiceButton';
import Loading from '../../../../components/Loading';
import ServiceItem from '../../../../components/ServiceItem';
import { IService, ServiceStatusEnum } from '../../../../types';
import Link from 'next/link';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import useFilteredServices from '../../../../hooks/useFilteredServices';
import { useContext } from 'react';
import BuilderPlaceContext from '../../../../modules/BuilderPlace/context/BuilderPlaceContext';

function Services() {
  const { builderPlace } = useContext(BuilderPlaceContext);
  const PAGE_SIZE = 30;
  const router = useRouter();
  const query = router.query;
  const searchQuery = query.search as string;

  const { hasMoreData, services, loading, loadMore } = useFilteredServices(
    ServiceStatusEnum.Opened,
    builderPlace?.ownerTalentLayerId,
    undefined,
    searchQuery?.toLocaleLowerCase(),
    PAGE_SIZE,
  );

  return (
    <div className='max-w-7xl mx-auto text-stone-800 sm:px-4 lg:px-0'>
      <div className='-mx-6 -mt-6 sm:mx-0 sm:mt-0'>
        <div className='flex py-2 px-6 sm:px-0 items-center border-b w-full border-redpraha mb-8'>
          <p className='text-2xl font-medium flex-1'>
            All <span className='text-stone-800 ml-1'> posts </span>
          </p>
          <Link
            href={`/dashboard/work/create`}
            className=' hover:bg-endnight text-stone-800 bg-endnight px-3 py-2 text-sm flex items-center rounded-xl'>
            <PlusCircleIcon className='w-[18px] h-[18px] text-stone-600 mr-2' />
            Create Post
          </Link>
        </div>
      </div>
      {searchQuery && services.length > 0 && (
        <p className='text-xl font-medium tracking-wider mb-8'>
          Search results for <span className='text-stone-800'>{searchQuery}</span>
        </p>
      )}
      {searchQuery && services.length === 0 && (
        <p className='text-xl font-medium tracking-wider mb-8'>
          No search results for <span className='text-stone-800'>{searchQuery}</span>
        </p>
      )}

      <div className='flex justify-center items-center gap-10 flex-col pb-5'>
        <SearchServiceButton value={searchQuery} />
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4'>
        {services.map((service: IService, i: number) => {
          return <ServiceItem service={service} key={i} />;
        })}
      </div>

      {services.length > 0 && hasMoreData && !loading && (
        <div className='flex justify-center items-center gap-10 flex-col pb-5'>
          <button
            type='submit'
            className={`px-5 py-2 mt-5 content-center border border-zinc-600 rounded-full text-zinc-600 
              hover:text-stone-800 hover:bg-midnight
            `}
            disabled={!hasMoreData}
            onClick={() => loadMore()}>
            Load More
          </button>
        </div>
      )}
      {loading && (
        <div className='flex justify-center items-center gap-10 flex-col pb-5 mt-5'>
          <Loading />
        </div>
      )}
      {!hasMoreData && !loading && (
        <div className='flex justify-center items-center gap-10 flex-col pb-5 mt-5'>
          <p>No more Services...</p>
        </div>
      )}
    </div>
  );
}

export default Services;
