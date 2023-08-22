import { useRouter } from 'next/router';

function SideLink({ children, href }: { children: React.ReactNode; href: string }) {
  const router = useRouter();
  const isActive = (path: string) => {
    if (router.asPath === path) return true;
    if (router.asPath.startsWith(path + '/')) return true;
    return false;
  };

  const isDashboard = href == '/dashboard';
  let className = isDashboard
    ? router.asPath === href
      ? 'bg-redpraha text-white'
      : 'text-zinc-100 hover:bg-midnight'
    : isActive(href)
    ? 'bg-redpraha text-white'
    : 'text-zinc-100 hover:bg-midnight';

  className += ' group flex items-center px-3 py-2 text-base rounded-xl';

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
