import { useContext } from 'react';
import { createAttestation } from './request';

import StarterKitContext from '../context/starterKit';
import GithubLoginButton from '../modules/Eas/Github/componens/LoginButton';
import { useSession } from 'next-auth/react';

function CreateAttestation() {
  const { user } = useContext(StarterKitContext);
  const { data } = useSession();

  // if (!data?.user) {
  //   return null;
  // }

  if (!user) {
    return null;
  }

  return (
    <>
      <h2>Get your Github Stats</h2>
      <GithubLoginButton />
      <hr />
      <button
        onClick={() => createAttestation(user.address, data?.accessToken, data.user?.id)}
        className='block text-blue-600 bg-red-50 hover:bg-redpraha hover:text-white rounded-xl px-5 py-2.5 text-center'
        type='button'
        data-modal-toggle='defaultModal'>
        Create Attestation
      </button>
    </>
  );
}

export default CreateAttestation;
