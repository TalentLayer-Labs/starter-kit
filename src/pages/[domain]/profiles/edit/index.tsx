import ProfileForm from '../../../../components/Form/ProfileForm';
import Layout from '../../../../components/EditProfile/Layout';
import { getBuilderPlace } from '../../../../modules/BuilderPlace/queries';

export async function getServerSideProps({ params }: any) {
  return await getBuilderPlace(params.domain);
}

function EditProfile() {
  return (
    <Layout>
      <ProfileForm />
    </Layout>
  );
}

export default EditProfile;
