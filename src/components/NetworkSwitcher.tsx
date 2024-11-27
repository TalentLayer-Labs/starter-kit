import React from 'react';
import { useNetwork, useSwitchNetwork } from 'wagmi';
import { chains, defaultChain } from '../pages/_app';

const NetworkSwitcher: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  if (chain && !chains.some(c => c.id === chain.id) && defaultChain) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-2xl font-bold">You are currently on an unsupported network.</p>
        <button
          className="mt-4 border text-white bg-gray-700 hover:bg-gray-600 border-gray-600 rounded-md p-2 relative inline-flex items-center justify-center space-x-1 font-sans text-sm font-normal leading-5 no-underline outline-none transition-all duration-300"
          onClick={() => defaultChain && switchNetwork?.(defaultChain.id)}
        >
          Switch to {defaultChain.name}
        </button>
      </div>
    );
  }

  return <>{children}</>;
};

export default NetworkSwitcher;