import SideLink from './SideLink';
import StarterKitContext from '../../context/starterKit';
import { navigation, navigationAdmin } from './navigation';
import { useContext } from 'react';

function SideMenu() {
  const { isAdmin } = useContext(StarterKitContext);
  
  return (
    <nav className='space-y-1 px-3'>
      {navigation.map(item => (
        <SideLink key={item.name} href={item.href}>
          <item.icon className='mr-3 h-5 w-5 flex-shrink-0 text-zinc-300' aria-hidden='true' />
          {item.name}
        </SideLink>
      ))}
      {isAdmin && (
        <div className='pt-4'>
          <span className='text-gray-100'>Administration</span>
          <nav className='space-y-1 px-3 mt-2'>
            {navigationAdmin.map(item => (
              <SideLink key={item.name} href={item.href}>
                <item.icon
                  className='mr-3 h-5 w-5 flex-shrink-0 text-zinc-300'
                  aria-hidden='true'
                />
                {item.name}
              </SideLink>
            ))}
          </nav>
        </div>
      )}
    </nav>
  );
}

export default SideMenu;
