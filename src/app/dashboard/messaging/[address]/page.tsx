import Dashboard from '../../../../modules/Messaging/components/Dashboard';

export default function MessagingAddress(props: { params: { address: string } }) {
  return <Dashboard address={props.params.address} />;
}
