import React, { useContext } from 'react';
import BuilderPlaceContext from '../modules/BuilderPlace/context/BuilderPlaceContext';
import { useRouter } from 'next/router';
import useFilteredServices from '../hooks/useFilteredServices';
import { IService, ServiceStatusEnum } from '../types';
import Loading from './Loading';
import ServiceItem from './ServiceItem';
import SearchServiceButton from './Form/SearchServiceButton';

function ServiceList() {
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
    <>
      {searchQuery && services.length > 0 && (
        <p className='text-xl font-medium tracking-wider mb-8'>
          Search results for <span className='text-base-content'>{searchQuery}</span>
        </p>
      )}
      {searchQuery && services.length === 0 && (
        <p className='text-xl font-medium tracking-wider mb-8'>
          No search results for <span className='text-base-content'>{searchQuery}</span>
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
            className={`px-5 py-2 mt-5 content-center border border-zinc-600 rounded-full text-content 
                  hover:text-base-content hover:bg-base-200
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
    </>
  );
}

export default ServiceList;
