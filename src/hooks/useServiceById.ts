import { useQuery } from 'react-query';
import { IService } from '../types';
import { useChainId } from './useChainId';
import useTalentLayerClient from './useTalentLayerClient';

interface IReturn {
  service?: IService;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

const useServiceById = (serviceId: string): IReturn => {
  const chainId = useChainId();
  const talentLayerClient = useTalentLayerClient();

  const queryKey = ['service', serviceId, chainId];

  const fetchService = async (): Promise<IService> => {
    if (!talentLayerClient) {
      throw new Error('TalentLayer client is not available');
    }
    const response = await talentLayerClient.service.getOne(serviceId);
    return response;
  };

  const {
    data: service,
    isLoading,
    isError,
    error,
  } = useQuery<IService, Error>(queryKey, fetchService, {
    enabled: !!serviceId && !!talentLayerClient,
  });

  return { service, isLoading, isError, error: error || null };
};

export default useServiceById;
