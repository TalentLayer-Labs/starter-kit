import { getBuilderPlace } from '../../../modules/BuilderPlace/queries';

export async function getServerSideProps({ params }: any) {
  return await getBuilderPlace(params.domain);
}

export default function EmbedPlace() {
  return (
    <div>
      <h1>Embed your place</h1>
    </div>
  );
}
