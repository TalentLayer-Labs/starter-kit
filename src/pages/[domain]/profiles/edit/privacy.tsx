import { GetServerSidePropsContext } from 'next';
import Layout from '../../../../components/EditProfile/Layout';
import Web3mailPreferencesForm from '../../../../modules/Web3mail/components/Web3mailPreferencesForm';
import { sharedGetServerSideProps } from '../../../../utils/sharedGetServerSideProps';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return sharedGetServerSideProps(context);
}

function EditPrivacy() {
  return (
    <Layout>
      <Web3mailPreferencesForm />
    </Layout>
  );
}

export default EditPrivacy;
