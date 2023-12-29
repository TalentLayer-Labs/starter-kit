import { Bars3Icon } from '@heroicons/react/24/outline';
import BottomLink from './BottomLink';
import { hirerNavigation, workerNavigation } from './navigation';
import { useContext } from 'react';
import BuilderPlaceContext from '../../modules/BuilderPlace/context/BuilderPlaceContext';

function MenuBottom({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { isBuilderPlaceCollaborator } = useContext(BuilderPlaceContext);

  const navigation = isBuilderPlaceCollaborator ? hirerNavigation : workerNavigation;

  const onClick = (e: any) => {
    e.preventDefault();
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className='menuBottom md:hidden fixed bottom-0 left-0 z-50 w-full h-16 border-t border-info bg-base-300'>
      <div className={`grid h-full max-w-lg grid-cols-5 font-medium`}>
        {navigation.map(item => (
          <BottomLink key={item.name} href={item.href}>
            <item.icon className='w-5 h-5 mb-1 ' />
            <span className='text-xs'>{item.name}</span>
          </BottomLink>
        ))}
        <button
          className=' inline-flex font-light text-base-content flex-col items-center justify-center px-2 group my-2 rounded-xl'
          onClick={onClick}>
          <Bars3Icon className='w-5 h-5 mb-1 ' />
          <span className='text-xs'>More</span>
        </button>
      </div>
    </div>
  );
}

export default MenuBottom;
