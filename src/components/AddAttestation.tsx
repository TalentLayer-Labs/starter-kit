import { useContext, useState } from 'react';
import { createAttestation } from './request';
import Loading from './Loading';
import StarterKitContext from '../context/starterKit';
import GithubLoginButton from '../modules/Eas/Github/componens/LoginButton';
import { useSession } from 'next-auth/react';

function AddAttestation(props: any) {
  const { user } = useContext(StarterKitContext);
  const { data } = useSession();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  if (!user) {
    return null;
  }

  const handleAttestationCreation = async () => {
    setLoading(true);
    try {
      const result = await createAttestation(
        user.address,
        data?.accessToken || 'missing-token',
        data?.user?.id || 'missing-id',
      );
      console.log('result', result.data.uid);

      if (result.data.uid) {
        setMessage('Attestation created successfully');
        setMessageType('success');
      } else {
        setMessage('Something went wrong. Please try again');
        setMessageType('error');
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred. Please try again later.');
      setMessageType('error');
    }
    setLoading(false);
  };

  const messageClass = messageType === 'success' ? 'text-green-500' : 'text-red-500';

  return (
    <>
      {loading && <Loading />}
      <p className={messageClass}>{message}</p>
      {props.type === 'github' && <GithubLoginButton />}
      {props.type === 'github' && data && (
        <>
          <hr />
          <div className='flex align-middle justify-center align-middle'>
            <button
              onClick={handleAttestationCreation}
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
