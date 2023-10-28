import React, { useContext, useState } from 'react';
import TalentLayerContext from '../../../context/talentLayer';
import { useRouter } from 'next/router';
import Steps from '../../../modules/BuilderPlace/components/Steps';
import { useGetBuilderPlace } from '../../../modules/BuilderPlace/hooks/UseGetBuilderPlace';
import { useSetBuilderPlaceOwner } from '../../../modules/BuilderPlace/hooks/UseSetBuilderPlaceOwner';
import OnboardingSteps from '../../../components/OnboardingSteps';

function onboardingStep2() {
  const { account, user, loading } = useContext(TalentLayerContext);
  const router = useRouter();
  const { subdomain } = router.query;
  const { data } = useGetBuilderPlace({ domain: subdomain as string });
  const setOwner = useSetBuilderPlaceOwner();
  const [subdomainState, setSubdomainState] = useState<string>('');

  if (!account?.isConnected || !user) {
    return <Steps handle={data?.name} description={data?.presentation} image={data?.logo} />;
  }

  const handleUpdateDomainOwner = async () => {
    if (account.address && (subdomain || subdomainState)) {
      let subdomainParam = '';
      if (subdomain && typeof subdomain === 'string') {
        subdomainParam = subdomain;
      } else {
        subdomainParam = subdomainState;
      }
      try {
        await setOwner.mutate({
          /**
           * @dev: If the user modified his name, we must update it with his on-chain handle & regenerate the domain name
           */
          name: user.handle,
          subdomain: subdomainParam,
          owners: [account.address],
          ownerTalentLayerId: user.id,
        });
        router.push('/onboarding/step3');
      } catch (error) {
        console.error('Error updating domain:', error);
      }
    }
  };
  //TODO message si déjà updaté

  return (
    <>
      <OnboardingSteps currentStep={2} type='Hirer' />
      <div className='flex flex-col items-center justify-center'>
        <p className='pb-10 pt-5 text-5xl font-bold mt-6 text-center'>Hello {user.handle} 👋</p>
        {subdomain ? (
          <p>You are about to link your TalentLayer ID to your domain: {subdomain}</p>
        ) : (
          <div className='flex flex-col items-center justify-center sm:flex-row mb-5'>
            <p className='text-2xl font-semibold text-center sm:mr-4'>
              Please input your domain name:
            </p>
            <input
              type='text'
              id='custom-domain'
              value={subdomainState}
              className='border border-gray-300 rounded-xl p-2 m-2'
              onChange={e => setSubdomainState(e.target.value)}
            />
          </div>
        )}
        <p className='text-content-400 text-xl text-center max-w-3xl'>
          If you would like to use a different TalentLayer ID, please connect a different wallet.
          You’ll then be prompted to create a new ID.
        </p>
        <button
          className='grow px-5 py-2 rounded-xl bg-pink-500 text-white text-stone-800 mt-4'
          onClick={() => {
            handleUpdateDomainOwner();
          }}>
          Use this ID
        </button>
      </div>
    </>
  );
}

export default onboardingStep2;
