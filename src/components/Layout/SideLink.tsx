import { useRouter } from 'next/router';

function SideLink({ children, href }: { children: React.ReactNode; href: string }) {
  const router = useRouter();
  const isRootPages = href == '/dashboard' || href === '/';
  let className = isRootPages
    ? router.asPath === href
      ? 'bg-redpraha text-stone-800'
      : 'text-stone-700 hover:bg-midnight'
    : router.asPath.includes(href)
    ? 'bg-redpraha text-stone-800'
    : 'text-stone-700 hover:bg-midnight';

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
