import { useEffect, useState } from 'react';
import { getUserTotalGains } from '../queries/users';
import { IUserGain } from '../types';
import { useChainId } from './useChainId';

const useTotalGainByUser = (id?: string | undefined): IUserGain[] => {
  const chainId = useChainId();
  const [userGains, setUserGains] = useState<IUserGain[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const response = await getUserTotalGains(chainId, id);

          if (response?.data?.data?.user?.totalGains) {
            setUserGains(response.data.data.user.totalGains);
          }
        } catch (error: any) {
          // eslint-disable-next-line no-console
          console.error(error);
        }
      } else {
        setUserGains([]);
      }
    };
    fetchData();
  }, [id]);

  return userGains;
};

export default useTotalGainByUser;
