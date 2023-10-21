import { useRouter, usePathname } from 'next/navigation';

function BottomLink({ children, href }: { children: React.ReactNode; href: string }) {
  const router = useRouter();
  const path = usePathname();

  const isDashboard = href == '/dashboard';

  const handleClick = (e: any) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={
        'inline-flex font-light text-white flex-col items-center justify-center px-2 hover:bg-redpraha group m-2 rounded-xl' +
        isDashboard
          ? path === href
            ? 'bg-redpraha'
            : ''
          : path && path.includes(href)
          ? 'bg-redpraha'
          : ''
      }>
      {children}
    </a>
  );
}

export default BottomLink;
