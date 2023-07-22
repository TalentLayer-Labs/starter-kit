import { useSession, signIn, signOut } from 'next-auth/react';
import { useState } from 'react';
import Toggle from '../../../../components/Toggle';

export default function GithubLoginButton() {
  const { data: session } = useSession();
  // TODO: load initial state from chain
  const [privateState, setPrivateState] = useState(false);
  function setPrivate() {
    console.log('privateState', privateState);
    // TODO: handle private change from Lint
    setPrivateState(!privateState);
  }

  if (session && session.user) {
    return (
      <>
        <div className='flex gap-2 align-middle justify-center items-center mb-3 border border-gray-700 rounded-xl'>
          <p>✅ Signed in as {session.user.name} </p>
          <button
            className='ml-3 block text-blue-600 bg-red-50 hover:bg-redpraha hover:text-white rounded-xl px-5 py-2.5 text-center'
            type='button'
            onClick={() => signOut()}>
            Sign out
          </button>
        </div>
        <div className={''}>
          <p>
            Keep this information private{' '}
            <Toggle isChecked={privateState} onChange={() => setPrivate()} />
          </p>
          <p className='text-xs mb-3'>
            🔐 Privacy ensured by the{' '}
            <a href='https://litprotocol.com/' className='text-gray-400 hover:text-blue-400' target='_blank'>
              Lit protocol
            </a>
          </p>
        </div>
      </>
    );
  }
  return (
    <div className='flex gap-2 align-middle justify-center align-middle items-center mb-3'>
      <p>Not signed in </p>
      <button
        className='block text-blue-600 bg-red-50 hover:bg-redpraha hover:text-white rounded-xl px-5 py-2.5 text-center'
        type='button'
        onClick={() => signIn('github')}>
        Sign in
      </button>
    </div>
  );
}
