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
  profilePicture,
}: {
  handle?: string;
  description?: string;
  profilePicture?: string;
}) {
  const { account, user } = useContext(TalentLayerContext);
  const talentLayerClient = useTalentLayerClient();
  const chainId = useChainId();
  const publicClient = usePublicClient({ chainId });
  const callBack = async () => {
    if ((profilePicture || description) && talentLayerClient && account?.address) {
      const user = await talentLayerClient.profile.getByAddress(account.address);
      const profile = {
        title: user.title,
        role: user.role,
        image_url: profilePicture,
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
