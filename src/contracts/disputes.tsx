import TalentLayerEscrow from './ABI/TalentLayerEscrow.json';
import { toast } from 'react-toastify';
import TransactionToast from '../components/TransactionToast';
import { NextRouter } from 'next/router';
import { createMultiStepsTransactionToast } from '../utils/toast';
import { getContract } from 'viem';
import { PublicClient, WalletClient } from 'wagmi';
import { useConfig } from '../hooks/useConfig';
import { useChainId } from '../hooks/useChainId';

export const getEscrowContract = (walletClient: WalletClient) => {
  const config = useConfig();
  return getContract({
    address: config.contracts.talentLayerEscrow,
    abi: TalentLayerEscrow.abi,
    walletClient
  });
};

export const payArbitrationFee = async (
  walletClient: WalletClient,
  publicClient: PublicClient,
  arbitrationFee: BigInt,
  isSender: boolean,
  transactionId: string,
  router: NextRouter,
) => {
  if (walletClient) {
    const contract = getEscrowContract(walletClient);
    try {
      const tx = isSender
        ? await contract.write.payArbitrationFeeBySender([transactionId], { value: arbitrationFee })
        : await contract.write.payArbitrationFeeByReceiver([transactionId], { value: arbitrationFee });
      const receipt = await toast.promise(publicClient.waitForTransactionReceipt({ hash: tx }), {
        pending: {
          render() {
            return (
              <TransactionToast message={'Paying arbitration fees...'} transactionHash={tx} />
            );
          },
        },
        success: 'Arbitration fees have been paid',
        error: 'An error occurred while paying arbitration fees',
      });
      if (receipt.status !== 'success') {
        throw new Error('Transaction failed');
      }
      router.reload();
    } catch (error) {
      console.error(error);
    }
  }
};
export const arbitrationFeeTimeout = async (
  walletClient: WalletClient,
  publicClient: PublicClient,
  transactionId: string,
  router: NextRouter,
) => {
  if (walletClient) {
    const contract = getEscrowContract(walletClient);
    try {
      const tx = await contract.write.arbitrationFeeTimeout([transactionId]);
      const receipt = await toast.promise(publicClient.waitForTransactionReceipt({ hash: tx }), {
        pending: {
          render() {
            return <TransactionToast message={'Calling timeout...'} transactionHash={tx} />;
          },
        },
        success: 'The dispute has been timed-out',
        error: 'An error occurred while calling timeout',
      });
      if (receipt.status !== 'success') {
        throw new Error('Transaction failed');
      }
      router.reload();
    } catch (error) {
      console.error(error);
    }
  }
};

export const submitEvidence = async (
  walletClient: WalletClient,
  publicClient: PublicClient,
  userId: string,
  transactionId: string,
  evidenceCid: string,
) => {
  const chainId = useChainId();
  const contract = getEscrowContract(walletClient);
  const tx = await contract.write.submitEvidence([userId, transactionId, evidenceCid]);
  await createMultiStepsTransactionToast(
    chainId,
    {
      pending: 'Submitting evidence...',
      success: 'Your evidence has been submitted',
      error: 'Your evidence has been submitted',
    },
    publicClient,
    tx,
    'evidence',
    evidenceCid,
  );
};