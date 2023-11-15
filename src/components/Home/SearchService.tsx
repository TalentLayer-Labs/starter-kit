import SearchServiceButton from '../Form/SearchServiceButton';

function SearchService() {
  return (
    <div className='bg-info'>
      <div className='max-w-7xl mx-auto text-base-content px-4'>
        <div className='flex justify-center items-center gap-10 flex-col py-20'>
          <p className='text-5xl sm:text-7xl font-medium tracking-wider max-w-lg text-center'>
            Find your <span className='text-base-content'>Next Opportunity </span> Now
          </p>
          <p className='text-base-content opacity-50'>
            Earn money doing what you love. Find a project that fits your skills and schedule.
          </p>
          <SearchServiceButton value={''} />
        </div>
      </div>
    </div>
  );
}

export default SearchService;
