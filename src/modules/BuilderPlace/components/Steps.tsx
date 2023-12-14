import React, { useContext } from 'react';
import ConnectBlock from '../../../components/ConnectBlock';
import TalentLayerContext from '../../../context/talentLayer';
import TalentLayerIdForm from '../../../components/Form/TalentLayerIdForm';

function Steps({ handle }: { handle?: string }) {
  const { account, user } = useContext(TalentLayerContext);

  return (
    <>
      {!account?.isConnected && (
        <div className='p-8 flex flex-col items-center'>
          <ConnectBlock />
        </div>
      )}
      {account?.isConnected && !user && <TalentLayerIdForm handle={handle} />}
    </>
  );
}

export default Steps;
