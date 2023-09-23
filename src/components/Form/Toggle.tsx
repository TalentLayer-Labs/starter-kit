import { useFormikContext } from 'formik';
import { useState } from 'react';
import { Switch } from '@headlessui/react';

interface ToggleProps {
  entityId: string;
  label: string;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function Toogle({ entityId, label }: ToggleProps) {
  const { setFieldValue, values } = useFormikContext<any>();
  const [isChecked, setIsChecked] = useState<boolean>(values[entityId]);

  const handleChange = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    setFieldValue(entityId, newValue);
    return;
  };

  return (
    <Switch.Group as='div' className='flex items-center my-3'>
      <Switch
        checked={isChecked}
        onChange={handleChange}
        className={classNames(
          isChecked ? 'bg-redpraha' : 'bg-gray-400',
          'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-1 focus:ring-redpraha focus:ring-offset-2',
        )}>
        <span
          aria-hidden='true'
          className={classNames(
            isChecked ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
          )}
        />
      </Switch>
      <Switch.Label as='span' className='ml-3 text-xs'>
        <span className=' text-white'>{label}</span>{' '}
      </Switch.Label>
    </Switch.Group>
  );
}
