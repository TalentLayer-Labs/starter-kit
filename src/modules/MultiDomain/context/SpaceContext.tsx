import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import { Space } from '../types';
import { useRouter } from 'next/router';
import { useGetSpace } from '../hooks/UseGetSpace';

const SpaceContext = createContext<{
  space?: Space;
  loading: boolean;
}>({
  space: undefined,
  loading: true,
});

const SpaceProvider = ({ children }: { children: ReactNode }) => {
  const { query } = useRouter()
  const domain = query.domain;

  const { space, loading } = useGetSpace({ domain: domain as string });

  const value = useMemo(() => {
    return {
      space,
      loading
    };
  }, [space, loading]);

  return <SpaceContext.Provider value={value}>{children}</SpaceContext.Provider>;
};

export { SpaceProvider };

export default SpaceContext;
