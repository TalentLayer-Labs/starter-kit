import { toast } from 'react-toastify';
import TransactionToast from '../components/TransactionToast';
import { showErrorTransactionToast } from '../utils/toast';
import { delegateReleaseOrReimburse } from '../components/request';
import { Address, PublicClient } from 'viem';
import { TalentLayerClient } from '@talentlayer/client';

export const executePayment = async (
  chainId: number,
  userAddress: string,
  publicClient: PublicClient,
  userId: string,
  transactionId: string,
  amount: bigint,
  isBuyer: boolean,
  canUseDelegation: boolean,
  talentLayerClient: TalentLayerClient,
  serviceId: string,
  refreshWorkerProfile: () => Promise<boolean>,
): Promise<void> => {
  try {
    let tx: Address;
    if (canUseDelegation) {
      const response = await delegateReleaseOrReimburse(
        chainId,
        userAddress,
        userId,
        parseInt(transactionId, 10),
        amount.toString(),
        isBuyer,
      );
      tx = response.data.transaction;
    } else {
      if (isBuyer) {
        tx = await talentLayerClient.escrow.release(serviceId, amount, parseInt(userId));
      } else {
        tx = await talentLayerClient.escrow.reimburse(serviceId, amount, parseInt(userId));
      }
    }

    const message = isBuyer
      ? 'Your payment release is in progress'
      : 'Your payment reimbursement is in progress';

    const receipt = await toast.promise(publicClient.waitForTransactionReceipt({ hash: tx }), {
      pending: {
        render() {
          return <TransactionToast message={message} transactionHash={tx} />;
        },
      },
      success: isBuyer ? 'Payment release validated' : 'Payment reimbursement validated',
      error: 'An error occurred while validating your transaction',
    });
    if (receipt.status !== 'success') {
      throw new Error('Approve Transaction failed');
    }
  } catch (error: any) {
    showErrorTransactionToast(error);
  } finally {
    if (canUseDelegation) await refreshWorkerProfile();
  }
};
