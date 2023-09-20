import { useState, useEffect } from 'react';
import { getUserByAddress } from '../queries/users';
import { IUser } from '../types';
import { useChainId } from './useChainId';

const useUserByAddress = (address: string): IUser | null => {
  const chainId = useChainId();
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!address) {
          return;
        }
        const response = await getUserByAddress(chainId, address);
        if (response?.data?.data?.users) {
          setUser(response.data.data.users[0]);
        }
      } catch (err: any) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    };
    fetchData();
  }, [address]);

  return user;
};

export default useUserByAddress;
