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
import { getBuilderPlace } from '../../modules/BuilderPlace/queries';

export async function getServerSideProps({ params }: any) {
  return await getBuilderPlace(params.domain);
}

function Dashboard() {
  const { account, user } = useContext(TalentLayerContext);

  if (!user) {
    return <Steps />;
  }

  return (
    <div className='max-w-7xl mx-auto text-stone-800'>
      <div className='-mx-6 -mt-6 sm:mx-0 sm:mt-0'>
        <div className='flex py-2 px-6 sm:px-0 items-center w-full mb-8'>
          <p className='text-2xl font-bold flex-1 mt-6'>
            Your <span className='text-stone-800 ml-1'> dashboard </span>
          </p>
          <Link
            href={`/profiles/edit`}
            className=' hover:bg-endnight text-stone-800 bg-endnight px-3 py-2 text-sm flex items-center rounded-xl'>
            <PencilSquareIcon className='w-[18px] h-[18px] text-stone-600 mr-2' />
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
