import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  title: string;
  subTitle?: string;
  route?: string;
  className?: string;
}

function AdminSettingsLayout({ children, title, subTitle, className }: ContainerProps) {
  return (
    <div className=''>
      <div>
        <div className={`${className}`}>
          <div className=''>
            <p className='pb-5 sm:pb-5 pt-5 text-3xl sm:text-5xl font-bold mt-6 text-center flex justify-center items-center gap-8'>
              {title}
            </p>
            {subTitle && <p className='text-center text-gray-600 text-lg mb-6'>{subTitle}</p>}{' '}
            <div className=' pb-16 max-w-7xl transition-all duration-300 rounded-md mx-auto'>
              <div className=' mx-auto '>{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSettingsLayout;
