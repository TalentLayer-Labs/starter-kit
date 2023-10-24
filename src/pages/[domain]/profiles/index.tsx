import { useRouter } from 'next/router';
import SearchTalentButton from '../../../components/Form/SearchTalentButton';
import Loading from '../../../components/Loading';
import UserItem from '../../../components/UserItem';
import useUsers from '../../../hooks/useUsers';
import { getBuilderPlace } from '../../../modules/BuilderPlace/queries';

export async function getServerSideProps({ params }: any) {
  return await getBuilderPlace(params.domain);
}

function Profiles() {
  const PAGE_SIZE = 36;
  const router = useRouter();
  const query = router.query;
  const searchQuery = query.search as string;
  const { users, hasMoreData, loading, loadMore } = useUsers(
    searchQuery?.toLocaleLowerCase(),
    PAGE_SIZE,
  );

  return (
    <div className='max-w-7xl mx-auto text-stone-800'>
      <div className='-mx-6 -mt-6 sm:mx-0 sm:mt-0'>
        <p className='flex py-2 items-center text-2xl font-bold tracking-wider mb-6 w-full px-6 sm:px-0 mt-6 '>
          All <span className='text-stone-800 ml-1'> Profiles </span>
        </p>
      </div>

      {searchQuery && users.length > 0 && (
        <p className='text-xl font-medium tracking-wider mb-8'>
          Search results for <span className='text-stone-800'>{searchQuery}</span>
        </p>
      )}
      {searchQuery && users.length === 0 && (
        <p className='text-xl font-medium tracking-wider mb-8'>
          No search results for <span className='text-stone-800'>{searchQuery}</span>
        </p>
      )}

      <div className='flex justify-center items-center gap-10 flex-col pb-5'>
        <SearchTalentButton value={searchQuery} />
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4'>
        {users.map((user, i) => {
          return <UserItem user={user} key={i} />;
        })}
      </div>

      {users.length > 0 && hasMoreData && !loading && (
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
      {!hasMoreData && (
        <div className='flex justify-center items-center gap-10 flex-col pb-5 mt-5'>
          <p>No more Users...</p>
        </div>
      )}
    </div>
  );
}

export default Profiles;
