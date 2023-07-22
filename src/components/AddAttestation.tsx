import { useContext } from 'react';
import { createAttestation } from './request';

import StarterKitContext from '../context/starterKit';
import GithubLoginButton from '../modules/Eas/Github/componens/LoginButton';
import { useSession } from 'next-auth/react';

function AddAttestation(props: any) {
  const { user } = useContext(StarterKitContext);
  const { data } = useSession();

  if (!user) {
    return null;
  }

  return (
    <>
      {props.type === 'github' && <GithubLoginButton />}
      {props.type === 'github' && data && (
        <>
          <hr />
          <div className='flex align-middle justify-center align-middle'>
            <button
              onClick={() =>
                createAttestation(user.address, data.accessToken, data.user?.id || 'missing-id')
              }
              className='mt-3 block text-blue-600 bg-red-50 hover:bg-redpraha hover:text-white rounded-xl px-5 py-2.5 text-center'
              type='button'
              data-modal-toggle='defaultModal'>
              Create Attestation
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default AddAttestation;
