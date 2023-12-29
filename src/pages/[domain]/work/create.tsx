import { GetServerSidePropsContext } from 'next';
import { useContext } from 'react';
import AccessDenied from '../../../components/AccessDenied';
import ServiceForm from '../../../components/Form/ServiceForm';
import Steps from '../../../components/Steps';
import TalentLayerContext from '../../../context/talentLayer';
import BuilderPlaceContext from '../../../modules/BuilderPlace/context/BuilderPlaceContext';
import ConnectButton from '../../../modules/Messaging/components/ConnectButton';
import MessagingContext from '../../../modules/Messaging/context/messging';
import { sharedGetServerSideProps } from '../../../utils/sharedGetServerSideProps';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return sharedGetServerSideProps(context);
}

function CreateService() {
  const { account, user } = useContext(TalentLayerContext);
  const { userExists } = useContext(MessagingContext);
  const { isBuilderPlaceCollaborator } = useContext(BuilderPlaceContext);

  if (!user) {
    return <Steps />;
  }

  if (!isBuilderPlaceCollaborator) {
    return <AccessDenied />;
  }

  return (
    <div className='max-w-7xl mx-auto text-base-content'>
      <div className='-mx-6 -mt-6 sm:mx-0 sm:mt-0'>
        <p className='flex py-2 items-center text-2xl font-bold tracking-wider mb-6 w-full px-6 sm:px-0 mt-6 '>
          post a <span className='text-base-content ml-1'>mission </span>
        </p>
      </div>

      {!userExists() && account?.isConnected && user && (
        <div className='border border-info rounded-xl p-8'>
          <p className='text-base-content opacity-50 py-4'>
            First, let's set up decentralized messaging for your organization so that you can
            message with open-source contributors about your missions. decentralized messaging on
            BuilderPlace platforms is powered by{' '}
            <a className='underline' href='https://xmtp.org/' target='_blank'>
              XMTP
            </a>
            .
          </p>
          <ConnectButton />
        </div>
      )}

      {account?.isConnected && user && userExists() && <ServiceForm />}
    </div>
  );
}

export default CreateService;
