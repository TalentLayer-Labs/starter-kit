import { useContext } from 'react';
import StarterKitContext from '../context/starterKit';
import ConnectBlock from './ConnectBlock';
import Loading from './Loading';
import TalentLayerIdForm from './Form/TalentLayerIdForm';

function Steps() {
  const { account, loading, user } = useContext(StarterKitContext);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='max-w-7xl mx-auto text-gray-200 sm:px-4 lg:px-0'>
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
