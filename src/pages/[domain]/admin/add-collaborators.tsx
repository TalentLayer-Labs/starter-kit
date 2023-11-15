import { getBuilderPlace } from '../../../modules/BuilderPlace/queries';
import AccessDenied from '../../../components/AccessDenied';
import { useContext } from 'react';
import BuilderPlaceContext from '../../../modules/BuilderPlace/context/BuilderPlaceContext';
import CollaboratorForm from '../../../components/Form/CollaboratorForm';
import useDelegates from '../../../hooks/useDelegates';
import TalentLayerContext from '../../../context/talentLayer';

export async function getServerSideProps({ params }: any) {
  return await getBuilderPlace(params.domain);
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
