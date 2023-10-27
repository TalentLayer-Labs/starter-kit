import { QuestionMarkCircle } from 'heroicons-react';
import { useState } from 'react';

function HelpPopover(props: { children: React.ReactNode }) {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className='absolute -right-2 md:right-2 -top-2.5'>
      <p className='flex items-center text-xs font-light text-base-content opacity-50 dark:text-base-content'>
        <button
          className='p-1'
          onClick={e => {
            setShowHelp(!showHelp);
            e.preventDefault();
          }}>
          <QuestionMarkCircle width={18} />
        </button>
      </p>
      <div
        className={`${
          showHelp ? '' : 'opacity-0 invisible'
        } right-2 top-14 absolute z-10 inline-block text-sm font-light text-base-content opacity-50 transition-opacity duration-300 bg-base-100 border border-info rounded-xl shadow-sm w-72 dark:bg-gray-800 dark:border-info dark:text-base-content`}>
        <div className='p-3 space-y-2'>{props.children}</div>
      </div>
    </div>
  );
}

export default HelpPopover;
