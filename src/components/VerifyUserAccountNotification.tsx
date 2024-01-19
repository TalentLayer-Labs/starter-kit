import Notification from './Notification';
import { verifyAccount } from '../modules/BuilderPlace/request';
import { showErrorTransactionToast } from '../utils/toast';
import { useContext, useState } from 'react';
import TalentLayerContext from '../context/talentLayer';
import { useChainId } from '../hooks/useChainId';
import { useWalletClient } from 'wagmi';
import { EntityStatus } from '@prisma/client';

type VerifyAccountNotificationProps = {
  callback?: () => void | Promise<void>;
};

const VerifyUserAccountNotification = ({ callback }: VerifyAccountNotificationProps) => {
  const chainId = useChainId();
  const { data: walletClient } = useWalletClient({ chainId });
  const { account, user, workerProfile } = useContext(TalentLayerContext);
  const [showNotification, setShowNotification] = useState(true);

  const onVerifyAccount = async () => {
    if (walletClient && workerProfile?.id && workerProfile?.id && account?.address) {
      try {
        /**
         * @dev Sign message to prove ownership of the address
         */
        const signature = await walletClient.signMessage({
          account: account.address,
          message: workerProfile.id.toString(),
        });

        const resp = await verifyAccount(workerProfile.id.toString(), signature);

        if (resp.error) {
          throw new Error(resp.error);
        }
        setShowNotification(false);

        if (callback) {
          await callback();
        }
      } catch (error: any) {
        showErrorTransactionToast(error.message);
      }
    }
  };

  if (workerProfile?.status === EntityStatus.VALIDATED || !showNotification) {
    return null;
  }

  return (
    <Notification
      title='Verify account !'
      text='Sign a message to prove ownership of your ETH address'
      link=''
      linkText={'Verify my account'}
      color='success'
      imageUrl={user?.description?.image_url}
      callback={onVerifyAccount}
    />
  );
};

export default VerifyUserAccountNotification;
