import { getBuilderPlace } from '../../../modules/BuilderPlace/queries';
import Dashboard from '../../../modules/Messaging/components/Dashboard';

export async function getServerSideProps({ params }: any) {
  return await getBuilderPlace(params.domain);
}

function MessagingAddress() {
  return <Dashboard />;
}

export default MessagingAddress;
