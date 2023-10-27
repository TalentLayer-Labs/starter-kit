import { getBuilderPlace } from '../../../modules/BuilderPlace/queries';

export async function getServerSideProps({ params }: any) {
  return await getBuilderPlace(params.domain);
}

export default function HirerProfile() {
  return (
    <div>
      <h1>hirer profile</h1>
    </div>
  );
}
