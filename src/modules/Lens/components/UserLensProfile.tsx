import Image from 'next/image';
import { buildMediaUrl } from '../utils/ipfs';
import { IlensUser } from '../utils/types';
interface IProps {
  lensUser: IlensUser;
}

function UserLensProfile({ lensUser }: IProps) {
  return (
    <>
      {lensUser?.id && (
        <div className='card bg-base-100 border border-info rounded'>
          {lensUser?.picture.original.url && (
            <img
              width={200}
              height={200}
              className='w-32 pt-2  mx-auto rounded-full border-8 border-white'
              src={buildMediaUrl(lensUser?.picture.original.url)}
              alt=''
            />
          )}
          <div className='text-center text-base-content text-lg font-medium'>{lensUser?.name}</div>
          <div className='text-center text-success text-sm'>@{lensUser?.handle}</div>
          <span id='lens-follow-small' data-handle={'nader.lens'} />
          <div className='px-2 text-center mt-2 font-light text-sm'>
            <p>
              <strong>{lensUser?.bio} </strong>
            </p>
          </div>
          <div className='p-4 text-center'>
            <a
              href={`https://lenster.xyz/u/${lensUser.handle}`}
              target='_blank'
              className='bg-info hover:bg-success text-base-content font-bold py-2 px-4 rounded'>
              Follow me
            </a>
          </div>
          <div className='flex p-3'>
            <div className='w-1/2 text-center'>
              <span className='font-bold'>{lensUser?.stats.totalFollowers}</span> Followers
            </div>
            <div className='w-0 border border-info'></div>
            <div className='w-1/2 text-center'>
              <span className='font-bold'>{lensUser?.stats.totalFollowing}</span> Following
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default UserLensProfile;
