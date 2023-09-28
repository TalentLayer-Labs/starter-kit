import { useContext } from 'react';
import Steps from '../../components/Steps';
import UserBadges from '../../modules/Sismo/components/UserBadges';
import UserDetail from '../../components/UserDetail';
import UserGains from '../../components/UserGains';
import UserPayments from '../../components/UserPayments';
import UserProposals from '../../components/UserProposals';
import UserServices from '../../components/UserServices';
import TalentLayerContext from '../../context/talentLayer';
import Link from 'next/link';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

function Dashboard() {
  const { account, user } = useContext(TalentLayerContext);

  if (!user) {
    return <Steps />;
  }

  return (
    <div className='max-w-7xl mx-auto text-gray-200 sm:px-4 lg:px-0'>
      <div className='-mx-6 -mt-6 sm:mx-0 sm:mt-0'>
        <div className='flex py-2 px-6 sm:px-0 items-center border-b w-full border-gray-700 mb-8'>
          <p className='text-2xl font-medium flex-1'>
            Your <span className='text-gray-100 ml-1'> dashboard </span>
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
          <div className='mb-6'>
            <UserDetail user={user} />
          </div>
          <div className='mb-6'>
            <UserBadges user={user} />
          </div>
          <div className='mb-6'>
            <UserPayments user={user} />
          </div>
          <div className='mb-6'>
            <UserGains user={user} />
          </div>
          <div className='mb-6'>
            <UserServices user={user} type='buyer' />
          </div>
          <div className='mb-6'>
            <UserServices user={user} type='seller' />
          </div>
          <div className='mb-6'>
            <UserProposals user={user} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
