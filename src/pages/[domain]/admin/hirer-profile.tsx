import { useContext } from 'react';
import AccessDenied from '../../../components/AccessDenied';
import BuilderPlaceContext from '../../../modules/BuilderPlace/context/BuilderPlaceContext';

import { GetServerSidePropsContext } from 'next';
import { sharedGetServerSideProps } from '../../../utils/sharedGetServerSideProps';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return sharedGetServerSideProps(context);
}

export default function HirerProfile() {
  const { isBuilderPlaceCollaborator } = useContext(BuilderPlaceContext);

  if (!isBuilderPlaceCollaborator) {
    return <AccessDenied />;
  }

  return (
    <div>
      <h1>organization profile</h1>
    </div>
  );
}
