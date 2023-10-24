import { Bars3Icon } from '@heroicons/react/24/outline';
import BottomLink from './BottomLink';
import { hirerNavigation, workerNavigation } from './navigation';
import { useContext } from 'react';
import TalentLayerContext from '../../context/talentLayer';
import BuilderPlaceContext from '../../modules/BuilderPlace/context/BuilderPlaceContext';

function MenuBottom({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { user } = useContext(TalentLayerContext);
  const { builderPlace } = useContext(BuilderPlaceContext);
  const isBuilderPlaceOwner = builderPlace?.owners?.some(
    owner => owner.toLocaleLowerCase() === user?.address,
  );

  const navigation = isBuilderPlaceOwner
    ? hirerNavigation.filter(item => item.name !== 'Find worker')
    : workerNavigation;

  const onClick = (e: any) => {
    e.preventDefault();
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className='menuBottom md:hidden fixed bottom-0 left-0 z-50 w-full h-16 border-t border-redpraha bg-endnight'>
      <div className={`grid h-full max-w-lg grid-cols-5 font-medium`}>
        {navigation.map(item => (
          <BottomLink key={item.name} href={item.href}>
            <item.icon className='w-5 h-5 mb-1 ' />
            <span className='text-xs'>{item.name}</span>
          </BottomLink>
        ))}
        <button
          className=' inline-flex font-light text-stone-800 flex-col items-center justify-center px-2 group my-2 rounded-xl'
          onClick={onClick}>
          <Bars3Icon className='w-5 h-5 mb-1 ' />
          <span className='text-xs'>More</span>
        </button>
      </div>
    </div>
  );
}

export default MenuBottom;
