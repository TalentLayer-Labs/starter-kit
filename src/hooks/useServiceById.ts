import { useState, useEffect } from 'react';
import { IService } from '../types';
import { useChainId } from './useChainId';
import useTalentLayerClient from './useTalentLayerClient';

const useServiceById = (serviceId: string): IService | null => {
  const chainId = useChainId();
  const [service, setService] = useState<IService | null>(null);
  const tlClient = useTalentLayerClient();

  useEffect(() => {
    if (chainId && tlClient) {

      tlClient
        .service.getOne(serviceId)
        .then(response => {
          console.log('Service details found', response);
          if (response) {
            setService(response);
          }
        })
        .catch((err: any) => {
          console.error(err);
        });
    }

  }, [serviceId, chainId, tlClient]);

  return service;
};

export default useServiceById;
