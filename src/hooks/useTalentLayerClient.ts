import { useContext } from 'react';
import TalentLayerContext from '../context/talentLayer';

const useTalentLayerClient = () => {
  const talentLayerContext = useContext(TalentLayerContext);

  return talentLayerContext.talentLayerClient;
};

export default useTalentLayerClient;
