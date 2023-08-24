import { useContext } from 'react';
import Layout from '../../../../components/EditProfile/Layout';
import Web3MailContext from '../../../../modules/Web3mail/context/web3mail';
import Web3mailForm from '../../../../modules/Web3mail/components/Web3mailForm';
import Web3mailPreferencesForm from '../../../../modules/Web3mail/components/Web3mailPreferencesForm';

function EditPrivacy() {
  const { platformHasAccess, protectEmailAndGrantAccess } = useContext(Web3MailContext);

  console.log('EditPrivacy', { platformHasAccess, protectEmailAndGrantAccess });

  return <Layout>{platformHasAccess ? <Web3mailPreferencesForm /> : <Web3mailForm />}</Layout>;
}

export default EditPrivacy;
