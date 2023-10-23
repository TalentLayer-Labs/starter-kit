import React, { useContext, useEffect, useState } from 'react';
import SpaceContext from '../../../modules/MultiDomain/context/SpaceContext';
import { useUpdateSpaceDomain } from '../../../modules/MultiDomain/hooks/UseUpdateSpaceDomain';
import DomainConfiguration from '../../../modules/MultiDomain/components/DomainConfiguration';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useGetSpace } from '../../../modules/MultiDomain/hooks/UseGetSpace';
import { getSpaceByDomain } from '../../../modules/MultiDomain/actions';
import Error from 'next/error';

export default function CustomDomain(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log("Parsed props ", props);
  if (!props.found) return <Error statusCode={404} />

  const { space, loading } = useContext(SpaceContext);
  const [customDomain, setCustomDomain] = useState('');

  useEffect(() => {
    if (space?.customDomain) {
      setCustomDomain(space.customDomain);
    }
  }, [space, loading])

  const updateSpaceDomainMutation = useUpdateSpaceDomain();
  const handleUpdateDomainClick = async () => {
    try {
      updateSpaceDomainMutation.mutate({
        customDomain: customDomain, subdomain: space?.subdomain!
      });
    } catch (error) {
      console.error('Error updating domain:', error);
    }
  }

  return (
    <div>
      <p>Space name: {space?.name}</p>
      <p>{loading}</p>

      <label htmlFor="custom-domain">Custom Domain:</label>
      <input type="text" id="custom-domain" value={customDomain} onChange={(e) => setCustomDomain(e.target.value)} />
      <button onClick={handleUpdateDomainClick}>Update Domain</button>

      <DomainConfiguration domain={customDomain} />
    </div>
  );
}

export async function getServerSideProps({ params }: any) {
  console.log("serverProps", params)
  const domain = params.domain;
  let space;
  let found = false;

  try {
    space = await getSpaceByDomain(domain as string);
    if (space?.error) {
      found = false;
    } else {
      found = true
    }
  } catch (error) {
    console.error('An error occurred:', error);
    found = false;
  }
  const serializedSpace = JSON.parse(JSON.stringify(space));
  return {
    props: {
      space: serializedSpace,
      found
    }
  }
}
