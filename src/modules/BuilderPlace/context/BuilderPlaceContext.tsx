import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import { IBuilderPlace } from '../types';
import { useRouter } from 'next/router';
import { useGetBuilderPlace } from '../hooks/UseGetBuilderPlace';

const BuilderPlaceContext = createContext<{
  builderPlace?: IBuilderPlace;
  loading: boolean;
  builderPlaceNotFound: boolean;
}>({
  builderPlace: undefined,
  loading: true,
  builderPlaceNotFound: false,
});

const BuilderPlaceProvider = ({ children }: { children: ReactNode }) => {
  const [builderPlaceNotFound, setBuilderPlaceNotFound] = useState(false);
  const { query } = useRouter();
  const domain = query.domain;

  const { data, loading } = useGetBuilderPlace({ domain: domain as string });

  const fetchData = async () => {
    if (data === undefined) {
      setBuilderPlaceNotFound(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, [data, builderPlaceNotFound, query, domain]);

  const value = useMemo(() => {
    return {
      builderPlace: data,
      loading,
      builderPlaceNotFound,
    };
  }, [data, loading, builderPlaceNotFound]);

  return <BuilderPlaceContext.Provider value={value}>{children}</BuilderPlaceContext.Provider>;
};

export { BuilderPlaceProvider };

export default BuilderPlaceContext;
