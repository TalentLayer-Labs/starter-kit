import Link from 'next/link';
import { useServices } from '@talentlayer/react/dist';
import { IUser } from '../types';
import UserServiceItem from './UserServiceItem';

interface IProps {
  user: IUser;
  type: 'buyer' | 'seller';
}

function UserServices({ user, type }: IProps) {
  const [services, loading] = useServices({
    serviceStatus: undefined,
    buyerId: type == 'buyer' ? user.id : undefined,
    sellerId: type == 'seller' ? user.id : undefined,
  });

  if (services.items.length === 0) {
    return null;
  }

  return (
    <>
      <h2 className='mb-6 pb-4 border-b border-gray-gray-200 text-gray-100 font-medium break-all'>
        {type == 'buyer' ? 'Gigs posted' : 'Gigs applied'}
      </h2>
      
      {!loading && (
        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4'>
          {services.items.map((service, i) => {
            return <UserServiceItem user={user} service={service} key={i} />;
          })}
        </div>
      )}

      {services.items.length === 20 && (
        <Link
          href='#'
          className='px-5 py-2  border border-zinc-600 rounded-full text-zinc-600 hover:text-white hover:bg-midnight'>
          Load More
        </Link>
      )}
    </>
  );
}

export default UserServices;
