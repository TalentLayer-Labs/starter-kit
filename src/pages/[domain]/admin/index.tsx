import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div>
      <h1>Admin</h1>
      <Link href='/admin/custom-domain'>Go to domain settings</Link>
    </div>
  );
}
