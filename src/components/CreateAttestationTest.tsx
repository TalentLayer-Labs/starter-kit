import { ethers } from 'ethers';
import { useContext } from 'react';
import { createAttestation } from './request';

import StarterKitContext from '../context/starterKit';

function CreateAttestation() {
  const { user } = useContext(StarterKitContext);

  if (!user) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => createAttestation(user.address)}
        className='block text-blue-600 bg-red-50 hover:bg-redpraha hover:text-white rounded-xl px-5 py-2.5 text-center'
        type='button'
        data-modal-toggle='defaultModal'>
        Create Attestation
      </button>
    </>
  );
}

export default CreateAttestation;
