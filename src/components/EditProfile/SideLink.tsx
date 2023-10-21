import { usePathname, useRouter } from 'next/navigation';
import { CheckIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

function SideLink({
  children,
  href,
  isCompleted,
}: {
  children: React.ReactNode;
  href: string;
  isCompleted: boolean;
}) {
  const router = useRouter();
  const path = usePathname();
  const isDashboard = href == '/dashboard/profile/edit';
  let className = isDashboard
    ? path === href
      ? 'text-primary-500 bg-redpraha'
      : ''
    : path && path.includes(href)
    ? 'text-primary-500 bg-redpraha'
    : '';

  className +=
    ' hover:text-muted-200 hover:bg-muted-700/50 flex items-center gap-2 rounded-lg p-3 transition-colors duration-300';

  const handleClick = (e: any) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
      {isCompleted && (
        <span>
          <CheckIcon width={20} height={20} className='bg-white p-1 text-redpraha rounded-full' />
        </span>
      )}
    </Link>
  );
}

export default SideLink;
