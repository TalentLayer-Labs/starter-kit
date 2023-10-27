import { InferGetServerSidePropsType } from 'next';
import { useContext, useEffect, useState } from 'react';
import { useChainId, useWalletClient } from 'wagmi';
import TalentLayerContext from '../../../context/talentLayer';
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
  const chainId = useChainId();
  const { data: walletClient } = useWalletClient({ chainId });
  const { account } = useContext(TalentLayerContext);

  const { builderPlace } = useContext(BuilderPlaceContext);
  const [customDomain, setCustomDomain] = useState('');

  useEffect(() => {
    if (builderPlace?.customDomain) {
      setCustomDomain(builderPlace.customDomain);
    }
  }, [builderPlace]);

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
