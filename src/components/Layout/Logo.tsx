import Link from 'next/link';
import { useContext } from 'react';
import BuilderPlaceContext from '../../modules/BuilderPlace/context/BuilderPlaceContext';

function Logo() {
  const { builderPlace } = useContext(BuilderPlaceContext);

  return (
    <div>
      <Link href='/' className='flex items-end flex-wrap pt-2 pb-2 sm:pt-0 sm:pb-0'>
        <h1 className='text-base-content text-3xl font-bold max-w-[160px]'>
          {builderPlace?.logo ? (
            <img src={builderPlace?.logo} alt={builderPlace.name} className='' />
          ) : (
            builderPlace?.name
          )}
        </h1>
      </Link>
    </div>
  );
}

export default Logo;
