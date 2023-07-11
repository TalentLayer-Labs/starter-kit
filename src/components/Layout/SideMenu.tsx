import SideLink from './SideLink';
import { navigation } from './navigation';

function SideMenu() {
  return (
    <nav className='space-y-1 px-3'>
      {navigation.map(item => (
        <SideLink key={item.name} href={item.href}>
          <item.icon className='mr-3 h-5 w-5 flex-shrink-0 text-zinc-300' aria-hidden='true' />
          {item.name}
        </SideLink>
      ))}
    </nav>
  );
}

export default SideMenu;
