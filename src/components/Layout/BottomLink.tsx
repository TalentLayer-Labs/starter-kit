import { useRouter } from 'next/router';

function BottomLink({ children, href }: { children: React.ReactNode; href: string }) {
  const router = useRouter();
  const isRootPages = href == '/dashboard' || href === '/';
  let className = isRootPages
    ? router.asPath === href
      ? 'bg-base-200'
      : ''
    : router.asPath.includes(href)
    ? 'bg-base-200'
    : '';

  className +=
    ' inline-flex font-light text-base-content flex-col items-center justify-center px-2 group my-2 rounded-xl';

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
