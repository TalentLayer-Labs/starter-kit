import { GetServerSidePropsContext } from 'next';
import Dashboard from '../../../modules/Messaging/components/Dashboard';
import { sharedGetServerSideProps } from '../../../utils/sharedGetServerSideProps';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return sharedGetServerSideProps(context);
}

function MessagingAddress() {
  return <Dashboard />;
}

export default MessagingAddress;
