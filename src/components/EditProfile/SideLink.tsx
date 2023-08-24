import { useRouter } from 'next/router';

function SideLink({ children, href }: { children: React.ReactNode; href: string }) {
  const router = useRouter();
  const isDashboard = href == '/dashboard/profile/edit';
  let className = isDashboard
    ? router.asPath === href
      ? 'text-primary-500 bg-redpraha/70'
      : ''
    : router.asPath.includes(href)
    ? 'text-primary-500 bg-redpraha/70'
    : '';

  className +=
    ' hover:text-muted-200 hover:bg-muted-700/50 flex items-center gap-2 rounded-lg p-3 transition-colors duration-300';

  const handleClick = (e: any) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}

export default SideLink;
