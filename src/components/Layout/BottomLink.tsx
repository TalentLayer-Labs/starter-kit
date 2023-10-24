import { useRouter } from 'next/router';

function BottomLink({ children, href }: { children: React.ReactNode; href: string }) {
  const router = useRouter();
  const isRootPages = href == '/dashboard' || href === '/';
  let className = isRootPages
    ? router.asPath === href
      ? 'bg-midnight'
      : ''
    : router.asPath.includes(href)
    ? 'bg-midnight'
    : '';

  className +=
    ' inline-flex font-light text-stone-800 flex-col items-center justify-center px-2 hover:bg-redpraha group my-2 rounded-xl';

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

export default BottomLink;
