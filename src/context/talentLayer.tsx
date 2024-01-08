import { TalentLayerClient } from '@talentlayer/client';
import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useAccount, useWalletClient } from 'wagmi';
import { useChainId } from '../hooks/useChainId';
import { getUserByAddress } from '../queries/users';
import { iTalentLayerContext, IUser } from '../types';
import { getCompletionScores, ICompletionScores } from '../utils/profile';
import { getWorkerProfileByOwnerId } from '../modules/BuilderPlace/request';
import { IWorkerProfile } from '../modules/BuilderPlace/types';
import { MAX_TRANSACTION_AMOUNT } from '../config';

const TalentLayerContext = createContext<iTalentLayerContext>({
  loading: true,
  canUseDelegation: false,
  refreshData: async () => {
    return false;
  },
  refreshWorkerProfile: async () => {
    return false;
  },
});

const TalentLayerProvider = ({ children }: { children: ReactNode }) => {
  const chainId = useChainId();
  const { data: walletClient } = useWalletClient();
  const [user, setUser] = useState<IUser | undefined>();
  const [workerProfile, setWorkerProfile] = useState<IWorkerProfile | undefined>();
  const account = useAccount();
  const [canUseDelegation, setCanUseDelegation] = useState(false);
  const [loading, setLoading] = useState(true);
  const [completionScores, setCompletionScores] = useState<ICompletionScores | undefined>();
  const [talentLayerClient, setTalentLayerClient] = useState<TalentLayerClient>();

  // automatically switch to the default chain is the current one is not part of the config
  useEffect(() => {
    if (!walletClient) return;

    const talentLayerClient = new TalentLayerClient({
      chainId: process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID as unknown as number,
      ipfsConfig: {
        clientId: process.env.NEXT_PUBLIC_INFURA_ID as string,
        clientSecret: process.env.NEXT_PUBLIC_INFURA_SECRET as string,
        baseUrl: process.env.NEXT_PUBLIC_IPFS_WRITE_URL as string,
      },
      platformId: parseInt(process.env.NEXT_PUBLIC_PLATFORM_ID as string),
      signatureApiUrl: process.env.NEXT_PUBLIC_SIGNATURE_API_URL as string,
      walletConfig: {
        walletClient,
      },
    });
    setTalentLayerClient(talentLayerClient);
  }, [account.address, walletClient]);

  const fetchData = async () => {
    if (!account.address || !account.isConnected || !talentLayerClient) {
      setLoading(false);
      return false;
    }

    try {
      console.log('fetching data', chainId, account.address);
      const userResponse = await getUserByAddress(chainId, account.address);

      if (userResponse?.data?.data?.users?.length == 0) {
        setLoading(false);
        return false;
      }

      const currentUser = userResponse.data.data.users[0];

      const platform = await talentLayerClient.platform.getOne(
        process.env.NEXT_PUBLIC_PLATFORM_ID as string,
      );
      currentUser.isAdmin = platform?.address === currentUser?.address;

      setUser(currentUser);

      const userHasDelegatedToPlatform =
        userResponse.data.data.users[0].delegates &&
        userResponse.data.data.users[0].delegates.indexOf(
          (process.env.NEXT_PUBLIC_DELEGATE_ADDRESS as string).toLowerCase(),
        ) !== -1;

      const userHasReachedDelegationLimit =
        (workerProfile?.weeklyTransactionCounter || 0) > MAX_TRANSACTION_AMOUNT;

      setCanUseDelegation(
        process.env.NEXT_PUBLIC_ACTIVE_DELEGATE === 'true' &&
          userHasDelegatedToPlatform &&
          !userHasReachedDelegationLimit,
      );
      setLoading(false);
      return true;
    } catch (err: any) {
      setLoading(false);
      // eslint-disable-next-line no-console
      console.error(err);
      toast.error(`An error happened while loading your account: ${err.message}.`, {
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

  const getWorkerProfile = async (userId: string) => {
    const response = await getWorkerProfileByOwnerId(userId);

    if (response.status !== 200) {
      console.error('Error while fetching worker profile');
      return;
    }

    const data = await response.json();
    if (data) {
      setWorkerProfile(data);
    }
  };

  const refreshWorkerProfile = async () => {
    try {
      setLoading(true);
      if (user?.id) {
        console.log('refreshing worker data');
        await getWorkerProfile(user.id);
      }
      return true;
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    const completionScores = getCompletionScores(user);
    setCompletionScores(completionScores);
    getWorkerProfile(user.id);
  }, [user]);

  const value = useMemo(() => {
    return {
      user,
      account: account ? account : undefined,
      workerProfile,
      canUseDelegation,
      refreshData: fetchData,
      refreshWorkerProfile: refreshWorkerProfile,
      loading,
      completionScores,
      talentLayerClient,
    };
  }, [
    account.address,
    user?.id,
    canUseDelegation,
    workerProfile,
    loading,
    completionScores,
    talentLayerClient,
  ]);

  return <TalentLayerContext.Provider value={value}>{children}</TalentLayerContext.Provider>;
};

export { TalentLayerProvider };

export default TalentLayerContext;
