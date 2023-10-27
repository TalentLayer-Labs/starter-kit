import Link from 'next/link';

import { getBuilderPlace } from '../../../modules/BuilderPlace/queries';

export async function getServerSideProps({ params }: any) {
  return await getBuilderPlace(params.domain);
}

export default function AdminDashboard() {
  return (
    <div>
      <h1>Admin</h1>
      <Link href='/admin/custom-domain'>Go to domain settings</Link>
    </div>
  );
}
