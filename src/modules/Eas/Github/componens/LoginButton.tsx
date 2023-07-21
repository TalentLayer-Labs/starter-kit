import { useSession, signIn, signOut } from 'next-auth/react';

export default function GithubLoginButton() {
  const { data: session } = useSession();
  if (session?.user) {
    return (
      <>
        Signed in as {session.user.name} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn('github')}>Sign in</button>
    </>
  );
}
