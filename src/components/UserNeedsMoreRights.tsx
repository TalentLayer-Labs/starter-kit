import Link from 'next/link';

function UserNeedsMoreRights() {
  return (
    <div className='flex justify-center items-center flex-col'>
      <span className='mb-8'>You need to be an administrator to access this page</span>
      <Link
        className='text-zinc-600 bg-zinc-50 hover:bg-zinc-500 hover:text-white px-3 py-2 rounded text-sm'
        href={`/dashboard`}>
        Return to dashboard
      </Link>
    </div>
  );
}

export default UserNeedsMoreRights;
