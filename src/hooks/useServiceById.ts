import { useState, useEffect } from 'react';
import { IService } from '../types';
import { useChainId } from './useChainId';
import { TalentLayerClient } from '@TalentLayer/client';

const useServiceById = (serviceId: string): IService | null => {
  const chainId = useChainId();
  const [user, setUser] = useState<IService | null>(null);

  useEffect(() => {
    const tlClient = new TalentLayerClient(chainId);

    tlClient
      .fetchServiceById(parseInt(serviceId))
      .then(response => {
        console.log("Service details found", response);
        if (response?.data?.service) {
          setUser(response?.data?.service);
        }
      })
      .catch((err: any) => {
        console.error(err);
      });
  }, [serviceId]);

  return user;
};

export default useServiceById;
