import Link from 'next/link';

export default function ConfigurePlace() {
  return (
    <div>
      <h1>Configure your place</h1>
      <Link href='/admin/custom-domain'>Setup your own domain</Link>
    </div>
  );
}
