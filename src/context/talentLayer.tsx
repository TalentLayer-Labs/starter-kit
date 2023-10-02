import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import { useAccount, useSwitchNetwork } from 'wagmi';
import { useChainId } from '../hooks/useChainId';
import { getUserByAddress } from '../queries/users';
import { IAccount, IUser } from '../types';
import { getCompletionScores, ICompletionScores } from '../utils/profile';
import { toast } from 'react-toastify';
import { chains, defaultChain } from '../pages/_app';
import { TalentLayerClient } from '@TalentLayer/client';

const TalentLayerContext = createContext<{
  user?: IUser;
  account?: IAccount;
  isActiveDelegate: boolean;
  refreshData: () => Promise<boolean>;
  loading: boolean;
  completionScores?: ICompletionScores;
  talentLayerClient?: TalentLayerClient;
}>({
  user: undefined,
  account: undefined,
  isActiveDelegate: false,
  refreshData: async () => {
    return false;
  },
  loading: true,
  completionScores: undefined,
});

const TalentLayerProvider = ({ children }: { children: ReactNode }) => {
  const chainId = useChainId();
  const { switchNetwork } = useSwitchNetwork();
  const [user, setUser] = useState<IUser | undefined>();
  const account = useAccount();
  const [isActiveDelegate, setIsActiveDelegate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [completionScores, setCompletionScores] = useState<ICompletionScores | undefined>();
  const [talentLayerClient, setTalentLayerClient] = useState<TalentLayerClient>();

  // automatically switch to the default chain is the current one is not part of the config
  useEffect(() => {
    if (!switchNetwork) return;
    const chain = chains.find(chain => chain.id === chainId);
    if (!chain && defaultChain) {
      switchNetwork(defaultChain.id);
    }
    if (chainId) {
      const tlClient = new TalentLayerClient({
        chainId,
        infuraClientId: (process.env.NEXT_PUBLIC_INFURA_ID as string),
        infuraClientSecret: (process.env.NEXT_PUBLIC_INFURA_SECRET as string),
        platformId: 25
    })
      setTalentLayerClient(tlClient);
    }
  }, [chainId, switchNetwork]);

  const fetchData = async () => {
    if (!account.address || !account.isConnected || !talentLayerClient) {
      setLoading(false);
      return false;
    }

    try {
      const userResponse = await getUserByAddress(chainId, account.address);

      if (userResponse?.data?.data?.users?.length == 0) {
        setLoading(false);
        return false;
      }

      const currentUser = userResponse.data.data.users[0];

      if (talentLayerClient) {
        const platform = await talentLayerClient.platform.getOne((process.env.NEXT_PUBLIC_PLATFORM_ID as string));;
        currentUser.isAdmin = platform?.address === currentUser?.address;
      }
      
      setUser(currentUser);
      setIsActiveDelegate(
        process.env.NEXT_PUBLIC_ACTIVE_DELEGATE === 'true' &&
          userResponse.data.data.users[0].delegates &&
          userResponse.data.data.users[0].delegates.indexOf(
            (process.env.NEXT_PUBLIC_DELEGATE_ADDRESS as string).toLowerCase(),
          ) !== -1,
      );
      setLoading(false);
      return true;
    } catch (err: any) {
      setLoading(false);
      // eslint-disable-next-line no-console
      console.error(err);
      toast.error(`An error happened while loading you account: ${err.message}.`, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return false;
    }
  };

  useEffect(() => {
    fetchData();
  }, [chainId, account.address, talentLayerClient]);

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
      talentLayerClient
    };
  }, [account.address, user?.id, isActiveDelegate, loading, completionScores, talentLayerClient]);

  return <TalentLayerContext.Provider value={value}>{children}</TalentLayerContext.Provider>;
};

export { TalentLayerProvider };

export default TalentLayerContext;
