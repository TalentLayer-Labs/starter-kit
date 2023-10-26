import { InferGetServerSidePropsType } from 'next';
import Error from 'next/error';
import { useContext, useEffect, useState } from 'react';
import DomainConfiguration from '../../../modules/BuilderPlace/components/DomainConfiguration';
import BuilderPlaceContext from '../../../modules/BuilderPlace/context/BuilderPlaceContext';
import { useUpdateBuilderPlaceDomain } from '../../../modules/BuilderPlace/hooks/UseUpdateBuilderPlaceDomain';
import { getBuilderPlace } from '../../../modules/BuilderPlace/queries';

export async function getServerSideProps({ params }: any) {
  return await getBuilderPlace(params.domain);
}

export default function CustomDomain(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const { builderPlace } = useContext(BuilderPlaceContext);
  const [customDomain, setCustomDomain] = useState('');

  useEffect(() => {
    if (builderPlace?.customDomain) {
      setCustomDomain(builderPlace.customDomain);
    }
  }, [builderPlace]);

  const updateBuilderPlaceDomainMutation = useUpdateBuilderPlaceDomain();
  const handleUpdateDomainClick = async () => {
    try {
      updateBuilderPlaceDomainMutation.mutate({
        customDomain: customDomain,
        subdomain: builderPlace?.subdomain!,
      });
    } catch (error) {
      console.error('Error updating domain:', error);
    }
  };

  return (
    <div>
      <p>BuilderPlace name: {builderPlace?.name}</p>

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
