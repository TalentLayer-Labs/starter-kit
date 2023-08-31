import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import { useAccount } from 'wagmi';
import { useChainId } from '../hooks/useChainId';
import { getUserByAddress } from '../queries/users';
import { IAccount, IUser } from '../types';
import { getCompletionScores, ICompletionScores } from '../utils/profile';

const TalentLayerContext = createContext<{
  user?: IUser;
  account?: IAccount;
  isActiveDelegate: boolean;
  refreshData: () => Promise<void>;
  loading: boolean;
  completionScores?: ICompletionScores;
}>({
  user: undefined,
  account: undefined,
  isActiveDelegate: false,
  refreshData: async () => {
    return;
  },
  loading: true,
  completionScores: undefined,
});

const TalentLayerProvider = ({ children }: { children: ReactNode }) => {
  const chainId = useChainId();
  const [user, setUser] = useState<IUser | undefined>();
  const account = useAccount();
  const [isActiveDelegate, setIsActiveDelegate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [completionScores, setCompletionScores] = useState<ICompletionScores | undefined>();

  const fetchData = async () => {
    if (!account.address || !account.isConnected) {
      setLoading(false);
      return false;
    }

    try {
      const response = await getUserByAddress(chainId, account.address);

      if (response?.data?.data?.users?.length == 0) {
        return false;
      }

      const currentUser = response.data.data.users[0];
      setUser(currentUser);

      setIsActiveDelegate(
        process.env.NEXT_PUBLIC_ACTIVE_DELEGATE &&
          response.data.data.users[0].delegates &&
          response.data.data.users[0].delegates.indexOf(
            (process.env.NEXT_PUBLIC_DELEGATE_ADDRESS as string).toLowerCase(),
          ) !== -1,
      );
      setLoading(false);
      return true;
    } catch (err: any) {
      setLoading(false);
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [chainId, account.address, account.isConnected, isActiveDelegate]);

  useEffect(() => {
    if (!user) return;
    const completionScores = getCompletionScores(user);
    setCompletionScores(completionScores);
  }, [user]);

  const value = useMemo(() => {
    return {
      user,
      account: account ? account : undefined,
      isActiveDelegate,
      refreshData: fetchData,
      loading,
      completionScores,
    };
  }, [account.address, user?.id, isActiveDelegate, loading, completionScores]);

  return <TalentLayerContext.Provider value={value}>{children}</TalentLayerContext.Provider>;
};

export { TalentLayerProvider };

export default TalentLayerContext;
