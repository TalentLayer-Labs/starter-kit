import { getBuilderPlace } from '../../../modules/BuilderPlace/queries';
import AccessDenied from '../../../components/AccessDenied';
import { useContext } from 'react';
import BuilderPlaceContext from '../../../modules/BuilderPlace/context/BuilderPlaceContext';

export async function getServerSideProps({ params }: any) {
  return await getBuilderPlace(params.domain);
}

export default function HirerProfile() {
  const { isBuilderPlaceOwner } = useContext(BuilderPlaceContext);

  if (!isBuilderPlaceOwner) {
    return <AccessDenied />;
  }

  return (
    <div>
      <h1>organization profile</h1>
    </div>
  );
}
