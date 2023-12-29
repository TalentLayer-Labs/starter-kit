import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { IBuilderPlace } from '../types';
import { useAccount } from 'wagmi';
import { useChainId } from '../../../hooks/useChainId';
import TalentLayerContext from '../../../context/talentLayer';

const BuilderPlaceContext = createContext<{
  builderPlace?: IBuilderPlace;
  isBuilderPlaceCollaborator: boolean;
  isBuilderPlaceOwner: boolean;
}>({
  builderPlace: undefined,
  isBuilderPlaceCollaborator: false,
  isBuilderPlaceOwner: false,
});

const BuilderPlaceProvider = ({ data, children }: { data: IBuilderPlace; children: ReactNode }) => {
  const account = useAccount();
  const chainId = useChainId();
  const { user } = useContext(TalentLayerContext);
  const [builderPlace, setBuilderPlace] = useState<IBuilderPlace | undefined>();
  const [isBuilderPlaceCollaborator, setIsBuilderPlaceCollaborator] = useState<boolean>(false);
  const [isBuilderPlaceOwner, setIsBuilderPlaceOwner] = useState(false);

  const fetchBuilderPlaceOwner = async () => {
    if (!data?.ownerTalentLayerId) {
      return;
    }
    const isUserBuilderPlaceOwner = user?.id === data.ownerTalentLayerId;
    setIsBuilderPlaceOwner(isUserBuilderPlaceOwner || false);
  };

  useEffect(() => {
    fetchBuilderPlaceOwner();
  }, [chainId, data?.ownerTalentLayerId, user?.id]);

  useEffect(() => {
    if (!data || !data.ownerTalentLayerId) return;

    const isBuilderPlaceCollaborator = data?.owners?.some(
      owner => owner.toLocaleLowerCase() === account?.address?.toLocaleLowerCase(),
    );

    setIsBuilderPlaceCollaborator(isBuilderPlaceCollaborator || false);
    setBuilderPlace(data);
  }, [data, account]);

  const value = {
    builderPlace,
    isBuilderPlaceOwner,
    isBuilderPlaceCollaborator,
  };

  return <BuilderPlaceContext.Provider value={value}>{children}</BuilderPlaceContext.Provider>;
};

export { BuilderPlaceProvider };

export default BuilderPlaceContext;
