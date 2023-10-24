import { useContext } from 'react';
import TalentLayerContext from '../../context/talentLayer';
import TalentLayerIdForm from '../Form/TalentLayerIdForm';

function CreateId() {
  const { user } = useContext(TalentLayerContext);

  if (user) {
    return null;
  }

  return (
    <>
      <div className='bg-white'>
        <div className='max-w-7xl mx-auto text-stone-800 py-20'>
          <div className='flex flex-col items-center justify-center gap-10'>
            <p className='text-5xl sm:text-7xl font-medium tracking-wider max-w-lg text-center'>
              Create <span className='text-stone-800'>Your </span> TalentLayer ID
            </p>

            <p className='text-stone-400 text-center'>
              Own your reputation as an independent and anoymous freelancer.
              <br />
              Onboard your clients, leave mutual reviews, and grow your reputation.
            </p>

            <TalentLayerIdForm />
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateId;
