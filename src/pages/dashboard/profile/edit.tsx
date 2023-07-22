import { useContext } from 'react';
import ProfileForm from '../../../components/Form/ProfileForm';
import Steps from '../../../components/Steps';
import StarterKitContext from '../../../context/starterKit';

function EditProfile() {
  const { account, user } = useContext(StarterKitContext);

  if (!account?.isConnected || !user) {
    return <Steps />;
  }

  return (
    <div className='max-w-7xl mx-auto text-gray-200 sm:px-4 lg:px-0'>
      <div className=' -mx-6 -mt-6 '>
        <div className='flex py-2 px-6 items-center border-b w-full border-gray-700 mb-8'>
          <p className='text-2xl font-medium flex-1'>Edit</p>
        </div>
      </div>

      {account?.isConnected && user && <ProfileForm />}
    </div>
  );
}

export default EditProfile;
