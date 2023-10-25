import Layout from '../../../../components/EditProfile/Layout';
import { getBuilderPlace } from '../../../../modules/BuilderPlace/queries';
import Web3mailPreferencesForm from '../../../../modules/Web3mail/components/Web3mailPreferencesForm';

export async function getServerSideProps({ params }: any) {
  return await getBuilderPlace(params.domain);
}

function EditPrivacy() {
  return (
    <Layout>
      <Web3mailPreferencesForm />
    </Layout>
  );
}

export default EditPrivacy;
