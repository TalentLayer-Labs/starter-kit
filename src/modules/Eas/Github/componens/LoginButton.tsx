import { useSession, signIn, signOut } from 'next-auth/react';

export default function GithubLoginButton() {
  const { data: session } = useSession();
  if (session && session.user) {
    return (
      <div className='flex gap-2 align-middle justify-center items-center mb-3'>
        <p>Signed in as {session.user.name} </p>
        <button
          className='ml-3 block text-blue-600 bg-red-50 hover:bg-redpraha hover:text-white rounded-xl px-5 py-2.5 text-center'
          type='button'
          onClick={() => signOut()}>
          Sign out
        </button>
      </div>
    );
  }
  return (
    <div className='flex gap-2 align-middle justify-center align-middle items-center'>
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
