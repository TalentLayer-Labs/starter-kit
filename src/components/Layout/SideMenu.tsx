import TalentLayerContext from '../../context/talentLayer';
import SideLink from './SideLink';
import { navigation, navigationAdmin, navigationPlatformAdmin } from './navigation';
import { useContext } from 'react';

function SideMenu() {
  const { user } = useContext(TalentLayerContext);

  return (
    <nav className='space-y-1 px-3'>
      <div className='pt-4'>
        <div className='border-gray-700 h-px mx-3'></div>
        <h2 className='text-gray-400 ml-3 mt-6'>WORK</h2>
        <nav className='space-y-1 mt-6'>
          {navigation.map(item => (
            <SideLink key={item.name} href={item.href}>
              <item.icon className='mr-3 h-5 w-5 flex-shrink-0 text-zinc-300' aria-hidden='true' />
              {item.name}
            </SideLink>
          ))}
        </nav>
      </div>
      <div className='pt-4'>
        <div className='border-gray-700 my-3 h-px border-t mx-3'></div>
        <h2 className='text-gray-400 ml-3 mt-6'>ADMIN</h2>
        <nav className='space-y-1 mt-6'>
          {navigationAdmin.map(item => (
            <SideLink key={item.name} href={item.href}>
              <item.icon className='mr-3 h-5 w-5 flex-shrink-0 text-zinc-300' aria-hidden='true' />
              {item.name}
            </SideLink>
          ))}
        </nav>
      </div>
      {user?.isAdmin && (
        <div className='pt-4'>
          <div className='border-gray-700 my-3 h-px border-t mx-3'></div>
          <h2 className='text-gray-400 ml-3 mt-6'>PLATFORM</h2>
          <nav className='space-y-1 mt-6'>
            {navigationPlatformAdmin.map(item => (
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
