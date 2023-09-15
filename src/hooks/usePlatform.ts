import { useEffect, useState } from 'react';
import { getPlatform } from '../queries/platform';
import { IPlatform } from '../types';
import { useChainId } from './useChainId';

const usePlatform = (id: string): IPlatform | null => {
  const [platforms, setAddresses] = useState<IPlatform | null>(null);
  const chainId = useChainId();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPlatform(chainId, id);

        if (response?.data?.data?.platform) {
          setAddresses(response.data.data.platform);
        }
      } catch (error: any) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  return platforms;
};

export default usePlatform;
