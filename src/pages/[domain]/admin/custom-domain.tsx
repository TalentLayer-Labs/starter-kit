import { InferGetServerSidePropsType } from 'next';
import Error from 'next/error';
import { useContext, useEffect, useState } from 'react';
import { getBuilderPlaceByDomain } from '../../../modules/BuilderPlace/actions';
import DomainConfiguration from '../../../modules/BuilderPlace/components/DomainConfiguration';
import BuilderPlaceContext from '../../../modules/BuilderPlace/context/BuilderPlaceContext';
import { useUpdateBuilderPlaceDomain } from '../../../modules/BuilderPlace/hooks/UseUpdateBuilderPlaceDomain';
import { useChainId, useWalletClient } from 'wagmi';
import TalentLayerContext from '../../../context/talentLayer';

export default function CustomDomain(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const chainId = useChainId();
  const { data: walletClient } = useWalletClient({ chainId });
  const { account } = useContext(TalentLayerContext);
  console.log('Parsed props ', props);
  if (!props.found) return <Error statusCode={404} />;

  const { builderPlace, loading } = useContext(BuilderPlaceContext);
  const [customDomain, setCustomDomain] = useState('');

  useEffect(() => {
    if (builderPlace?.customDomain) {
      setCustomDomain(builderPlace.customDomain);
    }
  }, [builderPlace, loading]);

  const updateBuilderPlaceDomainMutation = useUpdateBuilderPlaceDomain();

  const handleUpdateDomainClick = async () => {
    if (!walletClient || !account?.address) return;
    try {
      /**
       * @dev Sign message to prove ownership of the address
       */
      const signature = await walletClient.signMessage({
        account: account?.address,
        message: builderPlace?.subdomain!,
      });

      updateBuilderPlaceDomainMutation.mutate({
        customDomain: customDomain,
        subdomain: builderPlace?.subdomain!,
        signature: signature,
      });
    } catch (error) {
      console.error('Error updating domain:', error);
    }
  };

  return (
    <div>
      <p>BuilderPlace name: {builderPlace?.name}</p>
      <p>{loading}</p>

      <label htmlFor='custom-domain'>Custom Domain:</label>
      <input
        type='text'
        id='custom-domain'
        value={customDomain}
        onChange={e => setCustomDomain(e.target.value)}
      />
      <button onClick={handleUpdateDomainClick}>Update Domain</button>

      <DomainConfiguration domain={customDomain} />
    </div>
  );
}

export async function getServerSideProps({ params }: any) {
  console.log('serverProps', params);
  const domain = params.domain;
  let builderPlace;
  let found = false;

  try {
    builderPlace = await getBuilderPlaceByDomain(domain as string);
    if (builderPlace?.error) {
      found = false;
    } else {
      found = true;
    }
  } catch (error) {
    console.error('An error occurred:', error);
    found = false;
  }
  const serializedBuilderPlace = JSON.parse(JSON.stringify(builderPlace));
  return {
    props: {
      builderPlace: serializedBuilderPlace,
      found,
    },
  };
}
