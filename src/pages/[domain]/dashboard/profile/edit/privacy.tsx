import { useContext } from 'react';
import Layout from '../../../../../components/EditProfile/Layout';
import Web3mailForm from '../../../../../modules/Web3mail/components/Web3mailForm';
import Web3mailPreferencesForm from '../../../../../modules/Web3mail/components/Web3mailPreferencesForm';
import Web3MailContext from '../../../../../modules/Web3mail/context/web3mail';

function EditPrivacy() {
  return (
    <Layout>
      <Web3mailPreferencesForm />
    </Layout>
  );
}

export default EditPrivacy;
