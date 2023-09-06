import { useRouter } from 'next/router';
import Loading from '../../../components/Loading';
import useUserById from '../../../hooks/useUserById';
import { useContext, useState } from 'react';
import StarterKitContext from '../../../context/starterKit';
import UserNeedsMoreRights from '../../../components/UserNeedsMoreRights';
import { useConfig } from '../../../hooks/useConfig';
import TalentLayerPlatformID from '../../../contracts/ABI/TalentLayerPlatformID.json';
import { Container } from '../../../components/newlayout/container';
import usePlatform from '../../../hooks/usePlatform';
import { useProvider, useSigner } from 'wagmi';
import { ethers } from 'ethers';
import { useChainId } from '../../../hooks/useChainId';
import { CheckCircle } from 'heroicons-react';
import { ExclamationCircle } from 'heroicons-react';
import { MintStatusEnum } from '../../../types';
import { delegateUpdateMintStatus } from '../../../components/request';
import { createMultiStepsTransactionToast, showErrorTransactionToast } from '../../../utils/toast';
import { useWeb3Modal } from '@web3modal/react';
import Steps from '../../../components/Steps';

function AdminGlobal() {
  const router = useRouter();
  const { id } = router.query;
  const { isAdmin, isActiveDelegate } = useContext(StarterKitContext);
  const user = useUserById(id as string);
  const config = useConfig();
  const platform = usePlatform(id as string);
  const chainId = useChainId();
  const provider = useProvider({ chainId });
  const { open: openConnectModal } = useWeb3Modal();
  const { data: signer } = useSigner({
    chainId,
  });

  const [mintStatus, setMintStatus] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (!user) {
    return <Steps />;
  } else if (!isAdmin) {
    return <UserNeedsMoreRights />;
  }

  if (!config || !platform) {
    return <Loading />;
  }

  if (config && TalentLayerPlatformID && provider) {
    try {
      const talentLayerPlatformIdContract = new ethers.Contract(
        config.contracts.talentLayerPlatformId,
        TalentLayerPlatformID.abi,
        provider,
      );

      const fetchData = async () => {
        const mintStatus = await talentLayerPlatformIdContract.mintStatus();
        setMintStatus(Number(mintStatus));
      };
      fetchData();
    } catch (error) {
      showErrorTransactionToast(error);
    }
  }

  const toggleState = async () => {
    if (user && provider && signer) {
      setIsLoading(true);
      const nextMintStatus =
        Number(mintStatus) === MintStatusEnum['ON_PAUSE']
          ? MintStatusEnum['PUBLIC']
          : MintStatusEnum['ON_PAUSE'];
      try {
        let tx;
        if (isActiveDelegate) {
          const response = await delegateUpdateMintStatus(nextMintStatus, user.address, chainId);
          tx = response.data.transaction;
        } else {
          const contract = new ethers.Contract(
            config.contracts.talentLayerPlatformId,
            TalentLayerPlatformID.abi,
            signer,
          );
          tx = await contract.updateMintStatus(nextMintStatus);
        }

        await createMultiStepsTransactionToast(
          chainId,
          {
            pending: 'Updating platform...',
            success: 'Congrats! Your platform has been updated',
            error: 'An error occurred while updating your platform',
          },
          provider,
          tx,
          'platform',
        );

        setIsLoading(false);
      } catch (error) {
        showErrorTransactionToast(error);
      }
    } else {
      openConnectModal();
    }
  };

  return (
    <Container>
      <p className='text-xl font-medium tracking-wider'>Configuration {'/'} Control Center</p>
      <p className='mb-6 pb-4 border-b border-gray-gray-200 font-medium'>OnChain</p>

      <Container className='w-3/4 grid grid-cols-1 gap-6 border border-gray-700 rounded-xl p-6 bg-endnight'>
        <div className='flex justify-between'>
          <span className='flex'>
            {mintStatus === MintStatusEnum['ON_PAUSE'] ? (
              <>
                <ExclamationCircle className='text-red-500 w-6 h-6 mr-6' />
                <span className='text-gray-100'>Minting is paused</span>
              </>
            ) : (
              <>
                <CheckCircle className='text-green-500 w-6 h-6 mr-6' />
                <span className='text-gray-100'>Minting is live</span>
              </>
            )}
          </span>
          <button onClick={toggleState} className='px-5 py-2 rounded-xl bg-redpraha text-white'>
            {isLoading ?? <Loading />}
            {mintStatus === MintStatusEnum['ON_PAUSE'] ? 'Activate' : 'STOP'}
          </button>
        </div>
      </Container>
    </Container>
  );
}

export default AdminGlobal;
