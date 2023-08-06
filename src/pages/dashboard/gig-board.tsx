import { useRouter } from 'next/router';
import { useContext } from 'react';
import ServiceForm from '../../components/Form/ServiceForm';
import ServiceItem from '../../components/ServiceItem';
import StarterKitContext from '../../context/starterKit';
import useServices from '../../hooks/useServices';
import useUsers from '../../hooks/useUsers';

const GigBoard = () => {
  const PAGE_SIZE = 36;
  const router = useRouter();
  const query = router.query;
  const searchQuery = query.search as string;
  const { users, hasMoreData, loading, loadMore } = useUsers(
    searchQuery?.toLocaleLowerCase(),
    PAGE_SIZE,
  );

  const { account, user } = useContext(StarterKitContext);

  const { services } = useServices(undefined, user?.id, undefined, '', undefined);

  console.log({ account, user, services });

  return (
    <div className='max-w-7xl mx-auto text-gray-200 sm:px-4 lg:px-0'>
      <div className='grid grid-cols-2 gap-2'>
        <div>
          <ServiceForm onChange={event => console.log(event)} />
        </div>
        <div>
          <div className=' border border-gray-700 rounded-xl p-6 bg-endnight'>
            <p className='flex  px-6 items-center text-2xl font-medium tracking-wider mb-8 border-b w-full border-gray-700 md:px-8 '>
              Your <span className='text-gray-100 ml-1'> Gig Board </span>
            </p>
            {services?.map(_service => (
              <ServiceItem service={_service} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GigBoard;
