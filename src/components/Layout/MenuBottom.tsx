import BottomLink from './BottomLink';
import { hirerNavigation } from './navigation';

function MenuBottom() {
  return (
    <div className='menuBottom md:hidden fixed bottom-0 left-0 z-50 w-full h-16 border-t border-redpraha bg-endnight'>
      <div className={`grid h-full max-w-lg grid-cols-4 font-medium`}>
        {hirerNavigation.map(item => (
          <BottomLink key={item.name} href={item.href}>
            <item.icon className='w-5 h-5 mb-1 ' />
            <span className='text-xs'>{item.name}</span>
          </BottomLink>
        ))}
      </div>
    </div>
  );
}

export default MenuBottom;
