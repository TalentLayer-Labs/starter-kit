import React, { useContext, useState } from 'react';
import TalentLayerContext from '../../../context/talentLayer';
import { useRouter } from 'next/router';
import Steps from '../../../modules/BuilderPlace/components/Steps';
import { slugify } from '../../../modules/BuilderPlace/utils';
import Loading from '../../../components/Loading';
import HirerProfileLayout from '../../../components/HirerProfileLayout';
import { useGetBuilderPlaceById } from '../../../modules/BuilderPlace/hooks/UseGetBuilderPlaceById';
import { useSetBuilderPlaceAndHirerOwner } from '../../../modules/BuilderPlace/hooks/UseSetBuilderPlaceAndHirerOwner';
import { showErrorTransactionToast } from '../../../utils/toast';

function onboardingStep2() {
  const { account, user, refreshWorkerProfile, loading } = useContext(TalentLayerContext);
  const router = useRouter();
  const { builderPlaceId, userId } = router.query;
  const builderPlaceData = useGetBuilderPlaceById(builderPlaceId as string);
  const { mutateAsync: setBuilderPlaceAndHirerOwner } = useSetBuilderPlaceAndHirerOwner();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!account?.isConnected || !user) {
    return (
      <HirerProfileLayout step={2}>
        <div className='flex flex-col items-center justify-center'>
          <Steps handle={slugify(builderPlaceData?.name)} />
        </div>
      </HirerProfileLayout>
    );
  }

  if (loading) {
    return (
      <HirerProfileLayout step={2}>
        <div className='flex flex-col mt-5 pb-8'>
          <Loading />
        </div>
      </HirerProfileLayout>
    );
  }

  if (!builderPlaceData) {
    return (
      <HirerProfileLayout step={2}>
        <div className={'flex items-center justify-center'}>
          <span>
            You first need to{' '}
            <strong
              className={`cursor-pointer text-pink-500`}
              onClick={() => router.push(`/onboarding`)}>
              {' '}
              create a BuilderPlace
            </strong>
          </span>
        </div>
      </HirerProfileLayout>
    );
  }

  const handleSubmit = async () => {
    if (account.address && builderPlaceId && user.id && userId) {
      setIsSubmitting(true);
      try {
        const response = await setBuilderPlaceAndHirerOwner({
          builderPlaceId: builderPlaceId as string,
          hirerId: userId as string,
          ownerAddress: account.address,
          ownerTalentLayerId: user.id,
        });

        if (response.error) {
          throw new Error(response.error);
        }

        if (response?.hirerId && response?.builderPlaceId) {
          router.push({
            pathname: '/onboarding/step3',
            query: { builderPlaceId: response.builderPlaceId, userId: response.hirerId },
          });
        }
      } catch (error: any) {
        showErrorTransactionToast(error.message);
      } finally {
        refreshWorkerProfile();
        setIsSubmitting(false);
      }
    }
  };

  return (
    <>
      <HirerProfileLayout step={2}>
        <div className='flex flex-col items-center justify-center'>
          <p className=' pb-5 sm:pb-10 pt-5 text-3xl sm:text-5xl font-bold mt-6 text-center'>
            Hello {user.handle} 👋
          </p>
          <div className='grid grid-cols-1 gap-3 sm:gap-4'>
            <p className='text-center'>
              You are about to link your TalentLayer ID to your BuilderPlace{' '}
              {builderPlaceData?.name}
            </p>
            {isSubmitting ? (
              <button
                disabled
                type='submit'
                className='grow px-5 py-2 rounded-xl bg-pink-300 text-white'>
                Loading...
              </button>
            ) : (
              <button
                type='submit'
                onClick={() => handleSubmit()}
                className='grow px-5 py-2 rounded-xl bg-pink-500 text-white'>
                Use this Id
              </button>
            )}
          </div>
        </div>
      </HirerProfileLayout>
    </>
  );
}

export default onboardingStep2;
