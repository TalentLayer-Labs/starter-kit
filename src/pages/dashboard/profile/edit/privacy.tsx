import { useContext } from 'react';
import Layout from '../../../../components/EditProfile/Layout';
import Web3MailContext from '../../../../modules/Web3mail/context/web3mail';

function EditPrivacy() {
  const { platformHasAccess, protectEmailAndGrantAccess } = useContext(Web3MailContext);

  console.log('EditPrivacy', { platformHasAccess, protectEmailAndGrantAccess });

  return (
    <Layout>
      <button
        className='text-green-600 bg-green-50 hover:bg-redpraha hover:text-white px-5 py-2 rounded'
        onClick={() => {
          protectEmailAndGrantAccess();
        }}>
        Protect your email
      </button>
    </Layout>
  );
}

export default EditPrivacy;
