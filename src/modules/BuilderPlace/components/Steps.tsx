import React, { useContext } from 'react';
import MintTlidFormStep2 from '../../../modules/BuilderPlace/components/form/MintTlidFormStep2';
import ConnectBlock from '../../../components/ConnectBlock';
import TalentLayerContext from '../../../context/talentLayer';

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
      {account?.isConnected && !user && (
        <MintTlidFormStep2 handle={handle} description={description} image={image} />
      )}
    </>
  );
}

export default Steps;
