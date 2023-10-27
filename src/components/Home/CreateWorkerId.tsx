import { useContext } from 'react';
import TalentLayerContext from '../../context/talentLayer';

function CreateWorkerId() {
  const { user } = useContext(TalentLayerContext);

  if (user) {
    return null;
  }

  return (
    <>
      <div className='max-w-7xl mx-auto text-base-content sm:px-4 lg:px-0 py-20'>
        <div className='flex flex-col items-center justify-center gap-10'>
          <p className='text-5xl sm:text-6xl font-bold tracking-wider max-w-5xl text-center'>
            Create Your self-owned <br /> worker identity
          </p>

          <p className='text-content-400 text-center'>
            Details about TLIDs and benefits to hirers and workers, on chain reputation and other
            details about this.
            <br />
            Explain how blockchain/wallets let you own your reputation fovever. Maybe link to an
            other info center about benfits.
          </p>
        </div>
      </div>
    </>
  );
}

export default CreateWorkerId;
