import { useContext } from 'react';
import ProfileForm from '../../../components/Form/ProfileForm';
import Steps from '../../../components/Steps';
import TalentLayerContext from '../../../context/talentLayer';
import Link from 'next/link';
import { EyeIcon } from '@heroicons/react/24/outline';

function EditProfile() {
  const { account, user } = useContext(TalentLayerContext);

  if (!account?.isConnected || !user) {
    return <Steps />;
  }

  return (
    <div className='max-w-7xl mx-auto text-gray-200 sm:px-4 lg:px-0'>
      <div className=' -mx-6 -mt-6 '>
        <div className='flex py-2 px-6 items-center border-b w-full border-gray-700 mb-8'>
          <p className='text-2xl font-medium flex-1'>Edit</p>

          <Link
            href={`/dashboard/profile/${user.id}`}
            className=' hover:bg-endnight text-white bg-endnight px-3 py-2 text-sm flex items-center rounded-xl'>
            <EyeIcon className='w-[18px] h-[18px] text-redpraha mr-2' />
            Public page
          </Link>
        </div>
      </div>

      {account?.isConnected && user && <ProfileForm />}
    </div>
  );
}

export default EditProfile;
