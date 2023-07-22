import { useContext, useState } from 'react';
import Steps from '../../components/Steps';
import UserDetail from '../../components/UserDetail';
import StarterKitContext from '../../context/starterKit';
import Link from 'next/link';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import Attestations from "../../modules/Eas/components/Attestations";

function Dashboard() {
  const { account, user } = useContext(StarterKitContext);

  if (!user) {
    return <Steps />;
  }

  return (
    <div className='max-w-7xl mx-auto text-gray-200 sm:px-4 lg:px-0'>
      <div className=' -mx-6 -mt-6 '>
        <div className='flex py-2 px-6 items-center border-b w-full border-gray-700 mb-8'>
          <p className='text-2xl font-medium flex-1'>
            Get started with your <span className='text-gray-100 ml-1'> Husky-Attestation </span>!
          </p>
          <Link
            href={`/dashboard/profile/edit`}
            className=' hover:bg-endnight text-white bg-endnight px-3 py-2 text-sm flex items-center rounded-xl'>
            <PencilSquareIcon className='w-[18px] h-[18px] text-redpraha mr-2' />
            Edit
          </Link>
        </div>
      </div>

      {account?.isConnected && user && (
        <div>
          {/* -------------------------- */}
          <div className='mb-6'>
            <UserDetail user={user} />
          </div>
          <div>
            <Attestations />
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
