import { useContext } from 'react';
import Layout from '../../../../components/EditProfile/Layout';
import Web3mailForm from '../../../../modules/Web3mail/components/Web3mailForm';
import Web3mailPreferencesForm from '../../../../modules/Web3mail/components/Web3mailPreferencesForm';
import Web3MailContext from '../../../../modules/Web3mail/context/web3mail';

function EditPrivacy() {
  const { platformHasAccess } = useContext(Web3MailContext);

  return <Layout>{platformHasAccess ? <Web3mailPreferencesForm /> : <Web3mailForm />}</Layout>;
}

export default EditPrivacy;
