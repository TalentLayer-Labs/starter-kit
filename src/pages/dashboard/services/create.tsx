import { useContext } from 'react';
import ServiceForm from '../../../components/Form/ServiceForm';
import Steps from '../../../components/Steps';
import TalentLayerContext from '../../../context/talentLayer';
import ConnectButton from '../../../modules/Messaging/components/ConnectButton';
import MessagingContext from '../../../modules/Messaging/context/messging';

function CreateService() {
  const { account, user } = useContext(TalentLayerContext);
  const { userExists } = useContext(MessagingContext);

  if (!user) {
    return <Steps />;
  }

  return (
    <div className='max-w-7xl mx-auto text-gray-200 sm:px-4 lg:px-0'>
      <div className='-mx-6 -mt-6 sm:mx-0 sm:mt-0'>
        <p className='flex py-2 px-6 sm:px-0 items-center text-2xl font-medium tracking-wider mb-8 border-b w-full border-gray-700 md:px-8 '>
          Post <span className='text-gray-100 ml-1'> a job </span>
        </p>
      </div>

      {!userExists() && account?.isConnected && user && (
        <div className='border border-redpraha rounded-xl p-8'>
          <p className='text-gray-500 py-4'>
            In order to create a service, you need to be registered to our decentralized messaging
            service Please sign in to our messaging service to verify your identity
          </p>
          <ConnectButton />
        </div>
      )}

      {account?.isConnected && user && userExists() && <ServiceForm />}
    </div>
  );
}

export default CreateService;
