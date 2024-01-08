import { toast } from 'react-toastify';
import MultiStepsTransactionToast from '../components/MultiStepsTransactionToast';
import { graphIsSynced, graphUserIsSynced } from '../queries/global';
import { BaseError, Hash } from 'viem';
import { PublicClient } from 'wagmi';

export enum MONGO_ERROR_CODES {
  DUPLICATE_KEY = 11000,
}

interface IMessages {
  pending: string;
  success: string;
  error: string;
}

export const createMultiStepsTransactionToast = async (
  chainId: number,
  messages: IMessages,
  publicClient: PublicClient,
  txHash: Hash,
  entity: string,
  newUri?: string,
): Promise<number | undefined> => {
  let currentStep = 1;
  const toastId = toast(
    <MultiStepsTransactionToast
      txHash={txHash}
      currentStep={currentStep}
      hasOffchainData={!!newUri}
    />,
    { autoClose: false, closeOnClick: false },
  );

  let receipt;
  try {
    receipt = await publicClient.waitForTransactionReceipt({ confirmations: 1, hash: txHash });
    currentStep = 2;
    toast.update(toastId, {
      render: (
        <MultiStepsTransactionToast
          txHash={txHash}
          currentStep={currentStep}
          hasOffchainData={!!newUri}
        />
      ),
    });

    if (newUri) {
      const entityId = await graphIsSynced(chainId, `${entity}s`, newUri);
      currentStep = 3;
      toast.update(toastId, {
        render: <MultiStepsTransactionToast txHash={txHash} currentStep={currentStep} />,
      });

      await graphIsSynced(chainId, `${entity}Descriptions`, newUri);
      toast.update(toastId, {
        type: toast.TYPE.SUCCESS,
        render: messages.success,
        autoClose: 5000,
        closeOnClick: true,
      });

      return entityId;
    }

    toast.update(toastId, {
      type: toast.TYPE.SUCCESS,
      render: messages.success,
      autoClose: 5000,
      closeOnClick: true,
    });

    return;
  } catch (error) {
    const errorMessage = getParsedErrorMessage(error);
    console.error(error);
    toast.update(toastId, {
      type: toast.TYPE.ERROR,
      render: errorMessage,
    });
  }
  return;
};

export const showErrorTransactionToast = (error: any) => {
  console.error(error);
  let errorMessage = error;
  if (error.name === 'AxiosError') {
    errorMessage = error.response.data.error;
  } else if (error.response && error.response.status === 500) {
    errorMessage = getParsedErrorMessage(error);
    errorMessage = error.response.data;
  }
  toast.error(errorMessage);
};

export const showMongoErrorTransactionToast = (error: any) => {
  let errorMessage = getParsedMongoErrorMessage(error);
  toast.error(errorMessage);
};

export const createTalentLayerIdTransactionToast = async (
  chainId: number,
  messages: IMessages,
  publicClient: PublicClient,
  txHash: Hash,
  address: string,
): Promise<number | undefined> => {
  let currentStep = 1;
  const toastId = toast(
    <MultiStepsTransactionToast
      txHash={txHash}
      currentStep={currentStep}
      hasOffchainData={false}
    />,
    { autoClose: false, closeOnClick: false },
  );

  let receipt;
  try {
    receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });
    currentStep = 2;
    toast.update(toastId, {
      render: (
        <MultiStepsTransactionToast
          txHash={txHash}
          currentStep={currentStep}
          hasOffchainData={false}
        />
      ),
    });

    const entityId = await graphUserIsSynced(chainId, address);

    toast.update(toastId, {
      type: toast.TYPE.SUCCESS,
      render: messages.success,
      autoClose: 5000,
      closeOnClick: true,
    });

    return entityId;
  } catch (error) {
    const errorMessage = getParsedErrorMessage(error);
    console.error(error);
    toast.update(toastId, {
      type: toast.TYPE.ERROR,
      render: errorMessage,
    });
  }
  return;
};

function getParsedErrorMessage(error: any) {
  const parsedViemError = error as BaseError;

  if (parsedViemError && parsedViemError?.name && parsedViemError?.shortMessage) {
    return `${parsedViemError.name} - ${parsedViemError.shortMessage}`;
  }

  return 'Unknown error occurred';
}

const getParsedMongoErrorMessage = (error: string) => {
  if (error.includes(MONGO_ERROR_CODES.DUPLICATE_KEY.toString())) {
    if (error.includes('email')) return `Email already used`;
    else if (error.includes('handle')) return `Handle already exists`;
    else if (error.includes('username')) return `Username already exists`;
    else return `Already exists`;
  } else {
    return `${error}`;
  }
};
