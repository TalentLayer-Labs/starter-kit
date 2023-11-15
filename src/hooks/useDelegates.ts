import { useState, useEffect } from 'react';
import { getDelegates } from '../queries/users';
import { useChainId } from './useChainId';

const useDelegates = (userId: string): string[] => {
  const chainId = useChainId();
  const [delegates, setDelegates] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDelegates(chainId, userId);
        console.log('resp', response);
        if (response?.data?.data?.user?.delegates?.length > 0) {
          setDelegates(response?.data?.data?.user?.delegates);
        }
      } catch (err: any) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    };
    fetchData();
  }, [userId]);

  return delegates;
};

export default useDelegates;
