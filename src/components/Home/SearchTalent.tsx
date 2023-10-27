import SearchTalentButton from '../Form/SearchTalentButton';

function SearchTalent() {
  return (
    <div className='bg-base-100'>
      <div className='max-w-7xl mx-auto text-base-content px-4'>
        <div className='flex justify-center items-center gap-10 flex-col py-20'>
          <p className='text-5xl sm:text-7xl font-medium tracking-wider max-w-lg text-center'>
            Search a <span className='text-base-content'>Talent </span>
          </p>
          <p className='text-base-content opacity-50'>
            Hire the best freelance, verified their reviews and start working together.
          </p>
          <SearchTalentButton value={''} />
        </div>
      </div>
    </div>
  );
}

export default SearchTalent;
