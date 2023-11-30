import React, { useContext, useState } from 'react';
import TalentLayerContext from '../../../context/talentLayer';
import { useRouter } from 'next/router';
import Steps from '../../../modules/BuilderPlace/components/Steps';
import { useSetBuilderPlaceOwner } from '../../../modules/BuilderPlace/hooks/UseSetBuilderPlaceOwner';
import { slugify } from '../../../modules/BuilderPlace/utils';
import Loading from '../../../components/Loading';
import HirerProfileLayout from '../../../components/HirerProfileLayout';
import { useGetBuilderPlaceById } from '../../../modules/BuilderPlace/hooks/UseGetBuilderPlaceById';

function onboardingStep2() {
  const { account, user, loading } = useContext(TalentLayerContext);
  const router = useRouter();
  const { id } = router.query;
  const builderPlaceData = useGetBuilderPlaceById(id as string);
  const { mutateAsync: setOwner } = useSetBuilderPlaceOwner();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!account?.isConnected || !user) {
    return (
      <HirerProfileLayout step={2}>
        <div className='flex flex-col items-center justify-center'>
          <Steps
            handle={slugify(builderPlaceData?.name)}
            description={builderPlaceData?.presentation}
            profilePicture={builderPlaceData?.profilePicture}
          />
        </div>
      </HirerProfileLayout>
    );
  }

  if (loading) {
    return (
      <div className='flex flex-col mt-5 pb-8'>
        <Loading />
      </div>
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
    if (account.address && id && user.id) {
      setIsSubmitting(true);
      try {
        const response = await setOwner({
          id: id as string,
          owners: [account.address],
          ownerTalentLayerId: user.id,
        });
        if (response?.id) {
          router.push('/onboarding/step3');
        }
      } catch (error) {
        console.error('Error updating domain:', error);
      } finally {
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
