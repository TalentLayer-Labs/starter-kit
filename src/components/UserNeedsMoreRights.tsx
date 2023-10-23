import Link from 'next/link';

function UserNeedsMoreRights() {
  return (
    <div className='flex justify-center items-center flex-col'>
      <span className='mb-8'>You need to be an administrator to access this page</span>
      <Link
        className='text-stone-800 bg-stone-200 hover:bg-stone-300 px-5 py-2.5 rounded-xl text-sm-xl relative'
        href={`/dashboard`}>
        Return to dashboard
      </Link>
    </div>
  );
}

export default UserNeedsMoreRights;
