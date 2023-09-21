import { toast } from 'react-toastify';
import TransactionToast from '../components/TransactionToast';
import TalentLayerEscrow from './ABI/TalentLayerEscrow.json';
import { showErrorTransactionToast } from '../utils/toast';
import { delegateReleaseOrReimburse } from '../components/request';
import { getConfig } from '../config';
import { Address, PublicClient, WalletClient } from 'viem';

export const executePayment = async (
  chainId: number,
  userAddress: string,
  walletClient: WalletClient,
  publicClient: PublicClient,
  profileId: string,
  transactionId: string,
  amount: bigint,
  isBuyer: boolean,
  isActiveDelegate: boolean,
): Promise<void> => {
  const config = getConfig(chainId);
  try {
    let tx: Address;
    if (isActiveDelegate) {
      const response = await delegateReleaseOrReimburse(
        chainId,
        userAddress,
        profileId,
        parseInt(transactionId, 10),
        amount.toString(),
        isBuyer,
      );
      tx = response.data.transaction;
    } else {
      if (isBuyer) {
        const { request } = await publicClient.simulateContract({
          address: config.contracts.talentLayerEscrow,
          abi: TalentLayerEscrow.abi,
          functionName: 'release',
          args: [profileId, parseInt(transactionId, 10), amount.toString()],
          account: walletClient.account?.address,
        });
        tx = await walletClient.writeContract(request);
      } else {
        const { request } = await publicClient.simulateContract({
          address: config.contracts.talentLayerEscrow,
          abi: TalentLayerEscrow.abi,
          functionName: 'reimburse',
          args: [profileId, parseInt(transactionId, 10), amount.toString()],
        });
        tx = await walletClient.writeContract(request);
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
  }
};
