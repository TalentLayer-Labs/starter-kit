import { useState, useEffect } from 'react';
import { IService } from '../types';
import { useChainId } from './useChainId';
import { TalentLayerClient } from '@TalentLayer/client';

const useServiceById = (serviceId: string): IService | null => {
  const chainId = useChainId();
  const [service, setService] = useState<IService | null>(null);

  useEffect(() => {
    if (chainId) {
      const tlClient = new TalentLayerClient({
        chainId,
        infuraClientId: '2TcBxC3hzB3bMUgpD3FkxI6tt4D',
        infuraClientSecret: '29e380e2b6b89499074b90b2b5b8ebb9',
        platformId: 4
      });

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

  }, [serviceId, chainId]);

  return service;
};

export default useServiceById;
