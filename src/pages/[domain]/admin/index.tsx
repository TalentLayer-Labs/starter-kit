import Link from 'next/link';

import { GetServerSidePropsContext } from 'next';
import { sharedGetServerSideProps } from '../../../utils/sharedGetServerSideProps';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return sharedGetServerSideProps(context);
}

export default function AdminDashboard() {
  return (
    <div>
      <h1>Admin</h1>
      <Link href='/admin/custom-domain'>Go to domain settings</Link>
    </div>
  );
}
