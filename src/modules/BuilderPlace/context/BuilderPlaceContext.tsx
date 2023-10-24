import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import { IBuilderPlace } from '../types';
import { useRouter } from 'next/router';
import { useGetBuilderPlace } from '../hooks/UseGetBuilderPlace';

const BuilderPlaceContext = createContext<{
  builderPlace?: IBuilderPlace;
}>({
  builderPlace: undefined,
});

const BuilderPlaceProvider = ({ data, children }: { data: IBuilderPlace; children: ReactNode }) => {
  const value = useMemo(() => {
    return {
      builderPlace: data,
    };
  }, [data]);

  return <BuilderPlaceContext.Provider value={value}>{children}</BuilderPlaceContext.Provider>;
};

export { BuilderPlaceProvider };

export default BuilderPlaceContext;
