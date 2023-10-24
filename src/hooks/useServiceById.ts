import { useState, useEffect } from 'react';
import { IService } from '../types';
import { useChainId } from './useChainId';
import useTalentLayerClient from './useTalentLayerClient';

const useServiceById = (serviceId: string): IService | null => {
  const chainId = useChainId();
  const [service, setService] = useState<IService | null>(null);
  const talentLayerClient = useTalentLayerClient();

  useEffect(() => {
    if (!talentLayerClient) {
      return;
    }
    talentLayerClient.service
      .getOne(serviceId)
      .then(response => {
        if (response) {
          setService(response);
        }
      })
      .catch((err: any) => {
        console.error(err);
      });
  }, [serviceId, chainId, talentLayerClient]);

  return service;
};

export default useServiceById;
