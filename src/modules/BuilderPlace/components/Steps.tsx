import React, { useContext } from 'react';
import ConnectBlock from '../../../components/ConnectBlock';
import TalentLayerContext from '../../../context/talentLayer';
import TalentLayerIdForm from '../../../components/Form/TalentLayerIdForm';
import { createMultiStepsTransactionToast } from '../../../utils/toast';
import useTalentLayerClient from '../../../hooks/useTalentLayerClient';
import { useChainId } from '../../../hooks/useChainId';
import { usePublicClient } from 'wagmi';

function Steps({
  handle,
  description,
  image,
}: {
  handle?: string;
  description?: string;
  image?: string;
}) {
  const { account, user } = useContext(TalentLayerContext);
  const talentLayerClient = useTalentLayerClient();
  const chainId = useChainId();
  const publicClient = usePublicClient({ chainId });
  const callBack = async () => {
    if (image && description && talentLayerClient && account?.address) {
      const user = await talentLayerClient.profile.getByAddress(account.address);
      const profile = {
        title: user.title,
        role: user.role,
        image_url: image,
        video_url: user.video_url,
        name: user.name,
        about: description,
        skills: user.skills,
      };

      const res = await talentLayerClient?.profile.update(profile, user.id);

      await createMultiStepsTransactionToast(
        chainId,
        {
          pending: 'Updating profile...',
          success: 'Congrats! Your profile has been updated',
          error: 'An error occurred while updating your profile',
        },
        publicClient,
        res.tx,
        'user',
        res.cid,
      );
    }
  };

  return (
    <>
      <div className={'flex flex-col items-center justify-center'}>
        <h1>2</h1>
        <h1>Create your on-chain identity</h1>
        <p>
          details about TLIDs and benefits to hirers and workers, on chain reputation and other
          details about this.{' '}
        </p>
      </div>
      {!account?.isConnected && (
        <div className='p-8 flex flex-col items-center'>
          <ConnectBlock />
        </div>
      )}
      {account?.isConnected && !user && <TalentLayerIdForm handle={handle} callback={callBack} />}
    </>
  );
}

export default Steps;
