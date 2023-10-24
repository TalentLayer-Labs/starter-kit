import { InferGetServerSidePropsType } from 'next';
import Error from 'next/error';
import { useContext, useEffect, useState } from 'react';
import { getBuilderPlaceByDomain } from '../../../modules/BuilderPlace/actions';
import DomainConfiguration from '../../../modules/BuilderPlace/components/DomainConfiguration';
import BuilderPlaceContext from '../../../modules/BuilderPlace/context/BuilderPlaceContext';
import { useUpdateBuilderPlaceDomain } from '../../../modules/BuilderPlace/hooks/UseUpdateBuilderPlaceDomain';

export default function CustomDomain(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  console.log('Parsed props ', props);
  if (!props.found) return <Error statusCode={404} />;

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
