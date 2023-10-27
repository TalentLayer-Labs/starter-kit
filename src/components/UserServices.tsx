import { useContext } from 'react';
import useServices from '../hooks/useServices';
import { IUser } from '../types';
import UserServiceItem from './UserServiceItem';
import BuilderPlaceContext from '../modules/BuilderPlace/context/BuilderPlaceContext';

interface IProps {
  user: IUser;
  type: 'buyer' | 'seller';
}

function UserServices({ user, type }: IProps) {
  const { builderPlace } = useContext(BuilderPlaceContext);

  const { services } = useServices(
    undefined,
    builderPlace?.ownerTalentLayerId || undefined,
    type == 'seller' ? user.id : undefined,
  );

  if (services.length === 0) {
    return null;
  }

  return (
    <>
      <h2 className='pb-4 text-base font-bold break-all'>
        {type == 'buyer' ? 'Works posted' : 'Works applied'}
      </h2>
      <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4'>
        {services.map((service, i) => {
          return <UserServiceItem user={user} service={service} key={i} />;
        })}
      </div>

      {services.length === 20 && (
        <a
          href='#'
          className='px-5 py-2  border border-zinc-600 rounded-full text-content hover:text-base hover:bg-base-200'>
          Load More
        </a>
      )}
    </>
  );
}

export default UserServices;
