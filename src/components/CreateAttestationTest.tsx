import { useContext } from 'react';
import { createAttestation, createTestAttestation } from './request';

import StarterKitContext from '../context/starterKit';
import GithubLoginButton from '../modules/Eas/Github/componens/LoginButton';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

function CreateAttestation() {
  const { user } = useContext(StarterKitContext);
  const { data } = useSession();
  const [wakatimeHandle, setWakatimeHandle] = useState(null);

  if (!user) {
    return null;
  }

  const handleCreateAttestation = async () => {
    const attestationData = await createAttestation(user.address, data?.accessToken, data.user?.id);
    console.log('attestationData', attestationData);
    return attestationData;
  };

  return (
    <>
      <h2>Get your Github Stats</h2>
      <GithubLoginButton />
      <h2>Tell us your wakatime handle!</h2>
      <input
        type='text'
        onChange={e => {
          setWakatimeHandle(e.target.value);
        }}
      />
      <button
        onClick={() =>
          createTestAttestation(user.address, data?.accessToken, data?.user?.id, wakatimeHandle)
        }>
        Test
      </button>
      <hr />
      <h2>Start</h2>
      <button
        onClick={() => handleCreateAttestation()}
        className='block text-blue-600 bg-red-50 hover:bg-redpraha hover:text-white rounded-xl px-5 py-2.5 text-center'
        type='button'
        data-modal-toggle='defaultModal'>
        Create Attestation
      </button>
    </>
  );
}

export default CreateAttestation;
