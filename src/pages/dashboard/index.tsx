import { useContext } from 'react';
import Steps from '../../components/Steps';
import UserBadges from '../../modules/Sismo/components/UserBadges';
import UserDetail from '../../components/UserDetail';
import UserGains from '../../components/UserGains';
import UserPayments from '../../components/UserPayments';
import UserProposals from '../../components/UserProposals';
import UserServices from '../../components/UserServices';
import StarterKitContext from '../../context/starterKit';

function Dashboard() {
  const { account, user } = useContext(StarterKitContext);

  if (!account?.isConnected) {
    return <Steps />;
  }

  return (
    <div className='max-w-7xl mx-auto text-gray-200 sm:px-4 lg:px-0'>
      <div className=' -mx-6 -mt-6 '>
        <p className='flex py-2 px-6 items-center text-2xl font-medium tracking-wider mb-8 border-b w-full border-gray-700 md:px-8 '>
          Your <span className='text-gray-100 ml-1'> dashboard </span>
        </p>
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
