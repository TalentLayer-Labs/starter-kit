import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import { IBuilderPlace } from '../types';

const BuilderPlaceContext = createContext<{
  builderPlace?: IBuilderPlace;
}>({
  builderPlace: undefined,
});

const BuilderPlaceProvider = ({ data, children }: { data: IBuilderPlace; children: ReactNode }) => {
  const [builderPlace, setBuilderPlace] = useState<IBuilderPlace | undefined>();

  useEffect(() => {
    if (!data) return;
    setBuilderPlace(data);
  }, [data]);

  const value = {
    builderPlace,
  };

  return <BuilderPlaceContext.Provider value={value}>{children}</BuilderPlaceContext.Provider>;
};

export { BuilderPlaceProvider };

export default BuilderPlaceContext;
