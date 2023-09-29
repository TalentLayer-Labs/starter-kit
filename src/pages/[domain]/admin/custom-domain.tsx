import React, { useContext, useEffect, useState } from 'react';
import SpaceContext from '../../../modules/MultiDomain/context/SpaceContext';
import { useUpdateSpaceDomain } from '../../../modules/MultiDomain/hooks/UseUpdateSpaceDomain';
import DomainConfiguration from '../../../modules/MultiDomain/components/DomainConfiguration';

export default function CustomDomain() {
  const { space, loading } = useContext(SpaceContext);
  const [customDomain, setCustomDomain] = useState('');

  useEffect(() => {
    if (space?.customDomain) {
      setCustomDomain(space.customDomain);
    }
  }, [space]);

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