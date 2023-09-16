import { Fragment, ReactNode, useState } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

function Layout({ children, className }: ContainerProps) {
  return (
    <div className={className}>
      <main>
        <div>{children}</div>
      </main>
    </div>
  );
}

export default Layout;
