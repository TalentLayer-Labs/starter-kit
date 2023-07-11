import { useState, useEffect } from 'react';
import { getUserById } from '../queries/users';
import { IUser } from '../types';
import { useChainId } from './useChainId';

const useUserById = (userId: string): IUser | null => {
  const chainId = useChainId();
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserById(chainId, userId);
        if (response?.data?.data?.user) {
          setUser(response.data.data.user);
        }
      } catch (err: any) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    };
    fetchData();
  }, [userId]);

  return user;
};

export default useUserById;
