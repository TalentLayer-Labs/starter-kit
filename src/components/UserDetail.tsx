import { useContext } from 'react';
import TalentLayerContext from '../context/talentLayer';
import useUserById from '../hooks/useUserById';
import PohModule from '../modules/Poh/PohModule';
import { IUser } from '../types';
import Loading from './Loading';
import Stars from './Stars';
import DelegateModal from './Modal/DelegateModal';
import Link from 'next/link';
import { renderTokenAmountFromConfig } from '../utils/conversion';
import ClaimReferralBalanceModal from './Modal/ClaimReferralBalanceModal';
import { useChainId } from '../hooks/useChainId';

function UserDetail({ user }: { user: IUser }) {
  const chainId = useChainId();
  const { user: currentUser } = useContext(TalentLayerContext);
  const userDescription = user?.id ? useUserById(user?.id)?.description : null;

  if (!user?.id) {
    return <Loading />;
  }

  const hasClaimableBalance = () => {
    let hasBalance = false;
    currentUser?.referralGains?.forEach(gain => {
      if (Number(gain.availableBalance) > 0) {
        hasBalance = true;
      }
    });
    return hasBalance;
  };

  return (
    <div className='rounded-xl p-4 border border-gray-700 text-white bg-endnight'>
      <div className='w-full'>
        <div className='flex flex-col justify-start items-start gap-4'>
          <div className='flex items-center justify-start mb-4'>
            <img
              src={
                user?.description?.image_url
                  ? user?.description?.image_url
                  : `/images/default-avatar-${Number(user?.id ? user.id : '1') % 9}.jpeg`
              }
              className='w-10 mr-4 rounded-full'
              width={50}
              height={50}
              alt='default avatar'
            />
            <div className='flex flex-col'>
              <p className='text-gray-100 font-medium break-all'>{user?.handle}</p>
              <p className='text-gray-400 text-xs'>{userDescription?.title}</p>
            </div>
            <div className=''>
              <PohModule address={user.address} />
            </div>
          </div>
        </div>
        <Stars rating={Number(user.rating)} numReviews={user.userStat.numReceivedReviews} />
      </div>
      <div className='flex flex-row'>
        <div className='border-t border-gray-100 pt-4 w-full'>
          <p className='text-m text-gray-600 mt-4'>
            <strong>User Data</strong>
          </p>
          {userDescription?.name && (
            <p className='text-sm text-gray-500 mt-4'>
              <strong>Name:</strong> {userDescription?.name}
            </p>
          )}
          <p className='text-sm text-gray-500 mt-4'>
            <strong>Skills:</strong> {userDescription?.skills_raw}
          </p>
          <p className='text-sm text-gray-500 mt-4'>
            <strong>About:</strong> {userDescription?.about}
          </p>
          {userDescription?.role && (
            <p className='text-sm text-gray-500 mt-4'>
              <strong>Role:</strong> {userDescription?.role}
            </p>
          )}
        </div>

        <div className='border-t border-gray-100 pt-4 w-full'>
          {!!Number(user?.userStat.numReferredUsers) && (
            <>
              <p className='text-m text-gray-600 mt-4'>
                <strong>Referral data</strong>
              </p>
              {!!Number(user?.userStat.averageReferredRating) && (
                <p className='text-sm text-gray-500 mt-4'>
                  <strong>Referred users:</strong> {user?.userStat.numReferredUsers}
                </p>
              )}
              {!!Number(user?.userStat.averageReferredRating) && (
                <p className='text-sm text-gray-500 mt-4'>
                  <strong>Average rating for referred services:</strong>{' '}
                  {user?.userStat.averageReferredRating}
                </p>
              )}
            </>
          )}
          {currentUser?.id == user.id &&
            currentUser?.referralGains &&
            currentUser?.referralGains.length > 0 && (
              <>
                <div className='flex flex-row mt-4'>
                  <div className=''>
                    <p className='text-m text-gray-600'>
                      <strong>Referral gains</strong>
                    </p>
                    {currentUser?.referralGains.map(gain => (
                      <p className='text-sm text-gray-500'>
                        {'->'} {renderTokenAmountFromConfig(chainId, gain.token.address, gain.totalGain)}{' '}
                      </p>
                    ))}
                  </div>
                  {hasClaimableBalance() && (
                    <div className='ml-2 self-start text-indigo-600 bg-indigo-50 text-xs hover:bg-indigo-500 hover:text-white px-3 py-1 rounded-lg'>
                      {
                        <ClaimReferralBalanceModal
                          userId={currentUser.id}
                          referralGains={currentUser.referralGains}
                        />
                      }
                    </div>
                  )}
                </div>
              </>
            )}
        </div>
      </div>

      {currentUser?.id === user.id && (
        <div className=' border-t border-gray-700 pt-4 w-full mt-4'>
          <div className='flex flex-row gap-4 justify-end items-center'>
            <Link
              className='text-zinc-600 bg-white hover:bg-zinc-200 hover:text-white px-5 py-2.5 rounded-xl text-sm'
              href={`/dashboard/profile/incomes`}>
              Your incomes
            </Link>
            {process.env.NEXT_PUBLIC_ACTIVE_DELEGATE === 'true' && <DelegateModal />}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDetail;
