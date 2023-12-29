import { ArrowLeft } from 'heroicons-react';
import Link from 'next/link';
import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  title: string;
  route?: string;
  className?: string;
}

function AdminSettingsLayout({ children, title, route, className }: ContainerProps) {
  return (
    <div className=''>
      <div>
        <div className={`${className}`}>
          <div className=''>
            <p className='pb-5 sm:pb-10 pt-5 text-3xl sm:text-5xl font-bold mt-6 text-center flex justify-center items-center gap-8'>
              {title}
            </p>

            <div className=' pb-16 max-w-3xl transition-all duration-300 rounded-md mx-auto'>
              <div className='p-6 mx-auto'>{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSettingsLayout;
