import AccessDenied from '../../../components/AccessDenied';
import { useContext } from 'react';
import BuilderPlaceContext from '../../../modules/BuilderPlace/context/BuilderPlaceContext';
import CollaboratorForm from '../../../components/Form/CollaboratorForm';
import TalentLayerContext from '../../../context/talentLayer';
import { GetServerSidePropsContext } from 'next';
import { sharedGetServerSideProps } from '../../../utils/sharedGetServerSideProps';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return sharedGetServerSideProps(context);
}

export default function AddCollaborators() {
  const { isBuilderPlaceOwner, builderPlace } = useContext(BuilderPlaceContext);
  const { user } = useContext(TalentLayerContext);
  // const delegates = useDelegates(builderPlace?.ownerTalentLayerId);
  const delegates = ['0xzetgzertg', '0xzetgzertg', '0xzetgzertg', '0xzetgzertg'];

  if (user?.id !== builderPlace?.ownerTalentLayerId) {
    return <AccessDenied />;
  }

  return (
    <div>
      <h1>Add / Remove collaborators</h1>
      <div className={'flex flex-col'}>
        <CollaboratorForm />
        {!!delegates && (
          <div className={'flew flex-row'}>
            {delegates.map(value => (
              <p>{value}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
