import { useRouter } from 'next/router';

function SideLink({ children, href }: { children: React.ReactNode; href: string }) {
  const router = useRouter();
  const isRootPages = href == '/dashboard' || href === '/profiles' || href === '/';
  let className = isRootPages
    ? router.asPath === href
      ? 'bg-base-200'
      : ''
    : router.asPath.includes(href)
    ? 'bg-base-200'
    : '';

  className +=
    ' hover:bg-base-200 text-base-content group flex items-center px-3 py-2 text-base-content rounded-xl';

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
