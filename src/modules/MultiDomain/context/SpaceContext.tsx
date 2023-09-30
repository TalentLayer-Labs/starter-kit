import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import { Space } from '../types';
import { useRouter } from 'next/router';
import { useGetSpace } from '../hooks/UseGetSpace';

const SpaceContext = createContext<{
  space?: Space | undefined;
  loading: boolean;
  spaceNotFound: boolean;
}>({
  space: undefined,
  loading: true,
  spaceNotFound: false
});

const SpaceProvider = ({ children }: { children: ReactNode }) => {
  const [spaceNotFound, setSpaceNotFound] = useState(false);
  const { query } = useRouter()
  const domain = query.domain;

  const { space, loading } = useGetSpace({ domain: domain as string });

  const fetchData = async () => {
    if (space === undefined) {
      setSpaceNotFound(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, [space, spaceNotFound, query, domain]);

  const value = useMemo(() => {
    return {
      space,
      loading,
      spaceNotFound
    };
  }, [space, loading, spaceNotFound]);

  return <SpaceContext.Provider value={value}>{children}</SpaceContext.Provider>;
};

export { SpaceProvider };

export default SpaceContext;
