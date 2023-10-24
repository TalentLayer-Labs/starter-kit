import { useContext } from 'react';
import TalentLayerContext from '../context/talentLayer';
import ConnectBlock from './ConnectBlock';
import Loading from './Loading';
import TalentLayerIdForm from './Form/TalentLayerIdForm';

function Steps() {
  const { account, loading, user } = useContext(TalentLayerContext);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='max-w-7xl mx-auto text-stone-800'>
      <div className='flex items-center justify-center w-full flex-col'>
        {!account?.isConnected && (
          <div className='p-8 flex flex-col items-center'>
            <ConnectBlock />
          </div>
        )}
        {account?.isConnected && !user && <TalentLayerIdForm />}
      </div>
    </div>
  );
}

export default Steps;
