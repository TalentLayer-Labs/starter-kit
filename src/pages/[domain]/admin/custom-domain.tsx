import React, { useContext, useEffect, useState } from 'react';
import SpaceContext from '../../../modules/MultiDomain/context/SpaceContext';
import { useUpdateSpaceDomain } from '../../../modules/MultiDomain/hooks/UseUpdateSpaceDomain';
import DomainConfiguration from '../../../modules/MultiDomain/components/DomainConfiguration';
import { GetServerSideProps } from 'next';
import { useGetSpace } from '../../../modules/MultiDomain/hooks/UseGetSpace';
import { getSpaceByDomain } from '../../../modules/MultiDomain/actions';

export default function CustomDomain() {
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

  if (loading) return (<div>loading...</div>)
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
  const domain = params.domain;
  let space;
  try {
    const res = await getSpaceByDomain(domain as string);
    space = JSON.stringify(res)
    if (res.error) {
      return { notFound: true };
    }
  } catch (error) {
    console.error('An error occurred:', error);
    return { notFound: true };
  }

  return {
    props: {
      space
    }
  }
}
