import { useRouter } from 'next/router';
import { CheckIcon } from '@heroicons/react/24/outline';

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
  const isDashboard = href == '/profiles/edit';
  let className = isDashboard
    ? router.asPath === href
      ? 'text-info bg-info'
      : ''
    : router.asPath.includes(href)
    ? 'text-info bg-info'
    : '';

  className +=
    ' hover:text-primary-focus hover:bg-muted-700/50 flex items-center gap-2 rounded-lg p-3 transition-colors duration-300';

  const handleClick = (e: any) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
      {isCompleted && (
        <span>
          <CheckIcon width={20} height={20} className='bg-base-100 p-1 text-primary rounded-full' />
        </span>
      )}
    </a>
  );
}

export default SideLink;
