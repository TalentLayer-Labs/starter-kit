import { GetServerSidePropsContext } from 'next';
import Layout from '../../../../components/EditProfile/Layout';
import ProfileForm from '../../../../components/Form/ProfileForm';
import { sharedGetServerSideProps } from '../../../../utils/sharedGetServerSideProps';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return sharedGetServerSideProps(context);
}

function EditProfile() {
  return (
    <Layout>
      <ProfileForm />
    </Layout>
  );
}

export default EditProfile;
