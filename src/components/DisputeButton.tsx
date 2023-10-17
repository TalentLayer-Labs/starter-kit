import { ITransaction, IUser, TransactionStatusEnum } from '../types';
import { arbitrationFeeTimeout, payArbitrationFee } from '../contracts/disputes';
import { usePublicClient, useWalletClient } from 'wagmi';
import { useRouter } from 'next/router';
import { useChainId } from '../hooks/useChainId';
import { useConfig } from '../hooks/useConfig';

function DisputeButton({
  user,
  transaction,
  disabled,
  arbitrationFee,
  content,
}: {
  user: IUser;
  transaction: ITransaction;
  disabled: boolean;
  arbitrationFee: BigInt;
  content?: string;
}) {
  const chainId = useChainId();
  const { data: walletClient } = useWalletClient({ chainId });
  const publicClient = usePublicClient({ chainId });
  const router = useRouter();
  const transactionId = transaction?.id;
  const config = useConfig();

  const isSender = !!user && !!transaction && user.id === transaction.sender.id;

  const isReceiver = !!user && !!transaction && user.id === transaction.receiver.id;

  const userIsSenderAndHasPaid =
    isSender && transaction.status === TransactionStatusEnum.WaitingReceiver;

  const userIsSenderAndHasNotPaid =
    isSender && transaction.status === TransactionStatusEnum.WaitingSender;

  const userIsReceiverAndHasPaid =
    isReceiver && transaction.status === TransactionStatusEnum.WaitingSender;

  const userIsReceiverAndHasNotPaid =
    isReceiver && transaction.status === TransactionStatusEnum.WaitingReceiver;

  const noDispute = transaction.status === TransactionStatusEnum.NoDispute;

  const disputeCreated = transaction.status === TransactionStatusEnum.DisputeCreated;

  const disputeResolved = transaction.status === TransactionStatusEnum.Resolved;

  const payFee = () => {
    if (walletClient && arbitrationFee) {
      return payArbitrationFee(walletClient, publicClient, arbitrationFee, isSender, transactionId, router,config);
    }
  };
  const timeout = () => {
    if (walletClient) {
      return arbitrationFeeTimeout(walletClient, publicClient, transactionId, router,config);
    }
  };

  return (
    <>
      {userIsSenderAndHasNotPaid && (
        <button
          className={`ml-2 mt-4 px-5 py-2 border rounded-md hover:text-indigo-600 hover:bg-white border-indigo-600 bg-indigo-600 text-white'
                }`}>
          Pay fee
        </button>
      )}
      {noDispute && (
        <button
          className={`ml-2 mt-4 px-5 py-2 border text-center ${
            content
              ? 'cursor-pointer hover:text-indigo-600 hover:bg-white border-indigo-600 bg-indigo-600 text-white'
              : 'text-gray-500 bg-gray-200'
          } rounded-md border-grey-600`}
          onClick={() => payFee()}>
          {content ? content : 'No dispute'}
        </button>
      )}
      {(userIsReceiverAndHasPaid || userIsSenderAndHasPaid) && (
        <button
          disabled={disabled}
          className={`px-5 py-2 mt-4 border rounded-md ${
            disabled
              ? 'text-gray-400 bg-gray-200'
              : 'hover:text-indigo-600 hover:bg-white border-indigo-600 text-white bg-indigo-700'
          }`}
          onClick={() => timeout()}>
          Timeout
        </button>
      )}
      {userIsReceiverAndHasNotPaid && (
        <button
          className={`ml-2 mt-4 px-5 py-2 border rounded-md hover:text-indigo-600 hover:bg-white border-indigo-600 bg-indigo-600 text-white bg-indigo-700'
                }`}
          onClick={() => payFee()}>
          Pay fee
        </button>
      )}
      {disputeCreated && (
        <span
          className={
            'ml-2 mt-4 px-5 py-2 border text-center text-gray-500 bg-gray-200 rounded-md border-grey-600'
          }>
          Waiting for arbitration...
        </span>
      )}
      {disputeResolved && (
        <span
          className={
            'ml-2 mt-4 px-5 py-2 border text-center text-gray-500 bg-gray-200 rounded-md border-grey-600'
          }>
          Dispute resolved
        </span>
      )}
    </>
  );
}

export default DisputeButton;