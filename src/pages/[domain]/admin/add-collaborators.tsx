import AccessDenied from '../../../components/AccessDenied';
import { useContext, useState } from 'react';
import BuilderPlaceContext from '../../../modules/BuilderPlace/context/BuilderPlaceContext';
import CollaboratorForm from '../../../components/Form/CollaboratorForm';
import TalentLayerContext from '../../../context/talentLayer';
import { GetServerSidePropsContext } from 'next';
import { sharedGetServerSideProps } from '../../../utils/sharedGetServerSideProps';
import { useRemoveBuilderPlaceOwnerMutation } from '../../../modules/BuilderPlace/hooks/UseRemoveBuilderPlaceOwner';
import { showErrorTransactionToast } from '../../../utils/toast';
import { toggleDelegation } from '../../../contracts/toggleDelegation';
import { useChainId } from '../../../hooks/useChainId';
import { useConfig } from '../../../hooks/useConfig';
import { usePublicClient, useWalletClient } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import Loading from '../../../components/Loading';
import RemoveButton from '../../../components/Form/RemoveButton';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return sharedGetServerSideProps(context);
}

export default function AddCollaborators() {
  const { user, account, refreshData } = useContext(TalentLayerContext);
  const delegates = user?.delegates;
  const { mutateAsync: removeBuilderPlaceCollaboratorAsync } = useRemoveBuilderPlaceOwnerMutation();
  const chainId = useChainId();
  const config = useConfig();
  const { data: walletClient } = useWalletClient({ chainId });
  const { open: openConnectModal } = useWeb3Modal();
  const { builderPlace } = useContext(BuilderPlaceContext);
  const publicClient = usePublicClient({ chainId });
  const [submitting, setSubmitting] = useState(false);

  if (user?.id !== builderPlace?.ownerTalentLayerId) {
    return <AccessDenied />;
  }

  if (!user?.id) {
    return <Loading />;
  }

  const onRemove = async (address: string): Promise<void> => {
    console.log('onRemove', address);
    try {
      if (walletClient && account?.address && builderPlace?._id) {
        setSubmitting(true);
        /**
         * @dev Sign message to prove ownership of the address
         */
        const signature = await walletClient.signMessage({
          message: user.id,
          account: account.address,
        });

        /**
         * @dev Remove new collaborator from the BuilderPlace
         */
        const response = await removeBuilderPlaceCollaboratorAsync({
          ownerId: user.id,
          builderPlaceId: builderPlace._id,
          newCollaborator: address,
          signature,
        });

        if (response?.error) {
          console.log(response.error);
          showErrorTransactionToast(response.error);
        } else if (user.delegates?.indexOf(address) !== -1) {
          /**
           * @dev Remove the new collaborator as a delegate to the BuilderPlace owner
           */
          await toggleDelegation(
            chainId,
            user.id,
            config,
            address,
            publicClient,
            walletClient,
            false,
          );
        }
      } else {
        openConnectModal();
      }
    } catch (error) {
      console.log(error);
      showErrorTransactionToast(error);
    } finally {
      refreshData();
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Add / Remove collaborators</h1>
      <div className={'flex flex-col'}>
        <CollaboratorForm />
        {!!delegates && (
          <div className={'flew flex-row mt-2'}>
            {delegates.map(delegate => (
              <span key={delegate} className='flex items-center mb-2 bg-gray-100 p-2 rounded'>
                <span className='mr-4 font-mono text-gray-800'>{delegate}</span>
                <RemoveButton isSubmitting={submitting} onClick={() => onRemove(delegate)} />
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
