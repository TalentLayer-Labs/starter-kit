import Link from 'next/link';
import { getBuilderPlace } from '../../../modules/BuilderPlace/queries';

export async function getServerSideProps({ params }: any) {
  return await getBuilderPlace(params.domain);
}

export default function ConfigurePlace() {
  return (
    <div>
      <h1>Configure your place</h1>
      <Link href='/admin/custom-domain'>Setup your own domain</Link>
    </div>
  );
}
