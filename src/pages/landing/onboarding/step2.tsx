import React, { useContext, useState } from 'react';
import TalentLayerContext from '../../../context/talentLayer';
import { useRouter } from 'next/router';
import Steps from '../../../modules/BuilderPlace/components/Steps';
import { useGetBuilderPlace } from '../../../modules/BuilderPlace/hooks/UseGetBuilderPlace';
import { useSetBuilderPlaceOwner } from '../../../modules/BuilderPlace/hooks/UseSetBuilderPlaceOwner';

function onboardingStep2() {
  const { account, user, loading } = useContext(TalentLayerContext);
  const router = useRouter();
  const { subdomain } = router.query;
  const { data } = useGetBuilderPlace({ domain: subdomain as string });
  console.log('data', data);
  const setOwner = useSetBuilderPlaceOwner();
  const [subdomainState, setSubdomainState] = useState<string>('');

  if (!account?.isConnected || !user) {
    return <Steps handle={data?.name} description={data?.presentation} image={data?.imageUrl} />;
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
          subdomain: subdomainParam,
          owners: [account.address],
          ownerTalentLayerId: user.id,
        });
        router.push('/onboarding/step3');
      } catch (error) {
        //TODO: Issue: On error we never go here
        console.error('Error updating domain:', error);
      }
    }
  };
  //TODO message si déjà updaté

  return (
    <>
      <div className={'flex flex-col items-center justify-center'}>
        <h1>Hello {user.handle}</h1>
        {subdomain ? (
          <p>You area about to like your TalentLayer ID to your domain: {subdomain}</p>
        ) : (
          <div className={'flex flex-row items-center justify-center'}>
            <p>Please input your domain name:</p>
            <input
              type='text'
              id='custom-domain'
              value={subdomainState}
              onChange={e => setSubdomainState(e.target.value)}
            />
          </div>
        )}
        <p>
          if you would like to use a different TalentLayer ID, please connect a different wallet.
          you’ll then be prompted to create a new ID
        </p>
        <button
          onClick={() => {
            handleUpdateDomainOwner();
          }}>
          Use this Id
        </button>
      </div>
    </>
  );
}

export default onboardingStep2;
