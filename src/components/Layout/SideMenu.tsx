import { useContext } from 'react';
import TalentLayerContext from '../../context/talentLayer';
import BuilderPlaceContext from '../../modules/BuilderPlace/context/BuilderPlaceContext';
import SideLink from './SideLink';
import {
  hirerNavigation,
  hirerAdminNavigation,
  PlatformAdminNavigation,
  workerNavigation,
} from './navigation';

function SideMenu() {
  const { user } = useContext(TalentLayerContext);
  const { builderPlace } = useContext(BuilderPlaceContext);

  const isBuilderPlaceOwner = builderPlace?.owners?.some(
    owner => owner.toLocaleLowerCase() === user?.address,
  );

  return (
    <nav className='space-y-1 px-3'>
      {isBuilderPlaceOwner && (
        <>
          <div className='pt-4'>
            <div className='border-redpraha h-px mx-3'></div>
            <h2 className='text-stone-800 font-bold ml-3 mt-6'>WORK</h2>
            <nav className='space-y-1 mt-6'>
              {hirerNavigation.map(item => (
                <SideLink key={item.name} href={item.href}>
                  <item.icon
                    className='mr-3 h-5 w-5 flex-shrink-0 text-stone-600'
                    aria-hidden='true'
                  />
                  {item.name}
                </SideLink>
              ))}
            </nav>
          </div>

          <div className='pt-4'>
            <h2 className='text-stone-800 font-bold ml-3 mt-6'>ADMIN</h2>
            <nav className='space-y-1 mt-6'>
              {hirerAdminNavigation.map(item => (
                <SideLink key={item.name} href={item.href}>
                  <item.icon
                    className='mr-3 h-5 w-5 flex-shrink-0 text-stone-600'
                    aria-hidden='true'
                  />
                  {item.name}
                </SideLink>
              ))}
            </nav>
          </div>
        </>
      )}

      {!isBuilderPlaceOwner && (
        <nav className='space-y-1 mt-6'>
          {workerNavigation.map(item => (
            <SideLink key={item.name} href={item.href}>
              <item.icon className='mr-3 h-5 w-5 flex-shrink-0 text-stone-600' aria-hidden='true' />
              {item.name}
            </SideLink>
          ))}
        </nav>
      )}

      {user?.isAdmin && (
        <div className='pt-4'>
          <h2 className='text-stone-800 font-bold ml-3 mt-6'>PLATFORM</h2>
          <nav className='space-y-1 mt-6'>
            {PlatformAdminNavigation.map(item => (
              <SideLink key={item.name} href={item.href}>
                <item.icon
                  className='mr-3 h-5 w-5 flex-shrink-0 text-stone-600'
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
