// import React, { createContext, useContext } from 'react';
// import { useLocation } from 'react-router-dom';

// interface DomainContextType {
//   domain: string;
// }

// const DomainContext = createContext<DomainContextType>({ domain: '' });

// export const useDomain = () => useContext(DomainContext);

// export const DomainProvider: React.FC = ({ children }) => {
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const domain = searchParams.get('domain') || '';

//   return (
//     <DomainContext.Provider value={{ domain }}>
//       {children}
//     </DomainContext.Provider>
//   );
// };