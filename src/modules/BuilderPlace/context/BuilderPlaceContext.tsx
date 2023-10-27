import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { IBuilderPlace } from '../types';
import TalentLayerContext from '../../../context/talentLayer';

const BuilderPlaceContext = createContext<{
  builderPlace?: IBuilderPlace;
  isBuilderPlaceOwner: boolean;
}>({
  builderPlace: undefined,
  isBuilderPlaceOwner: false,
});

const BuilderPlaceProvider = ({ data, children }: { data: IBuilderPlace; children: ReactNode }) => {
  const { user } = useContext(TalentLayerContext);
  const [builderPlace, setBuilderPlace] = useState<IBuilderPlace | undefined>();
  const [isBuilderPlaceOwner, setIsBuilderPlaceOwner] = useState<boolean>(false);

  useEffect(() => {
    if (!data) return;

    const isBuilderPlaceOwner = data?.owners?.some(
      owner => owner.toLocaleLowerCase() === user?.address,
    );

    setIsBuilderPlaceOwner(isBuilderPlaceOwner);
    setBuilderPlace(data);
  }, [data]);

  const value = {
    builderPlace,
    isBuilderPlaceOwner,
  };

  return <BuilderPlaceContext.Provider value={value}>{children}</BuilderPlaceContext.Provider>;
};

export { BuilderPlaceProvider };

export default BuilderPlaceContext;
