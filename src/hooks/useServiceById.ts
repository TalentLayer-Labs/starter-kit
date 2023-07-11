import { useState, useEffect } from 'react';
import { getServiceById } from '../queries/services';
import { IService } from '../types';
import { useChainId } from './useChainId';

const useServiceById = (serviceId: string): IService | null => {
  const chainId = useChainId();
  const [user, setUser] = useState<IService | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getServiceById(chainId, serviceId);
        if (response?.data?.data?.service) {
          setUser(response.data.data.service);
        }
      } catch (err: any) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    };
    fetchData();
  }, [serviceId]);

  return user;
};

export default useServiceById;
