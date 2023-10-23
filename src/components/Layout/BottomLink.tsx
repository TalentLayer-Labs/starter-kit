import { useRouter } from 'next/router';

function BottomLink({ children, href }: { children: React.ReactNode; href: string }) {
  const router = useRouter();
  const isDashboard = href == '/dashboard';
  let className = isDashboard
    ? router.asPath === href
      ? 'bg-redpraha'
      : ''
    : router.asPath.includes(href)
    ? 'bg-redpraha'
    : '';

  className +=
    ' inline-flex font-light text-stone-800 flex-col items-center justify-center px-2 hover:bg-redpraha group m-2 rounded-xl';

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
