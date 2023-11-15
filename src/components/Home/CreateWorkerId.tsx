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
            create your <br /> contributor identity
          </p>

          <p className='text-content-400 text-center'>
            mint a soul-bound work ID - the beginning of your on-chian work history.
            <br />
            your projects completed, reviews, and other stats are linked to your on-chain work ID.
          </p>
        </div>
      </div>
    </>
  );
}

export default CreateWorkerId;
