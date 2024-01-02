/* eslint-disable no-console */
import axios from 'axios';

export const delegateCreateOrUpdateService = async (
  chainId: number,
  userId: string,
  userAddress: string,
  cid: string,
  existingService: boolean,
): Promise<any> => {
  try {
    return await axios.post('/api/delegate/create-update-service', {
      chainId,
      userId,
      userAddress,
      cid,
      existingService,
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const delegateUpdateProfileData = async (
  chainId: number,
  userId: string,
  userAddress: string,
  cid: string,
): Promise<any> => {
  try {
    return await axios.post('/api/delegate/update-profile-data', {
      chainId,
      userId,
      userAddress,
      cid,
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const delegateCreateOrUpdateProposal = async (
  chainId: number,
  userId: string,
  userAddress: string,
  serviceId: string,
  valuesRateToken: string,
  parsedRateAmountString: string,
  cid: string,
  convertExpirationDateString: string,
  existingProposalStatus?: string,
): Promise<any> => {
  try {
    return await axios.post('/api/delegate/create-update-proposal', {
      chainId,
      userId,
      userAddress,
      serviceId,
      valuesRateToken,
      parsedRateAmountString,
      cid,
      convertExpirationDateString,
      existingProposalStatus,
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const delegateReleaseOrReimburse = async (
  chainId: number,
  userAddress: string,
  userId: string,
  transactionId: number,
  amount: string,
  isBuyer: boolean,
): Promise<any> => {
  try {
    return await axios.post('/api/delegate/release-reimburse', {
      chainId,
      userAddress,
      userId,
      transactionId,
      amount,
      isBuyer,
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const delegateMintReview = async (
  chainId: number,
  userId: string,
  userAddress: string,
  serviceId: string,
  uri: string,
  valuesRating: number,
): Promise<any> => {
  try {
    return await axios.post('/api/delegate/mint-review', {
      chainId,
      userId,
      userAddress,
      serviceId,
      uri,
      valuesRating,
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const delegateMintID = async (
  chainId: number,
  handle: string,
  handlePrice: string,
  userAddress: string,
  signature?: string,
): Promise<any> => {
  try {
    return await axios.post('/api/delegate/mint-id', {
      chainId,
      handle,
      handlePrice,
      userAddress,
      signature,
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const sendPlatformMarketingWeb3mail = async (
  emailSubject: string,
  emailContent: string,
  usersAddresses: string[],
  signature: string,
): Promise<any> => {
  try {
    return await axios.post('/api/web3mail/platform-marketing', {
      emailSubject: emailSubject,
      emailContent: emailContent,
      usersAddresses: usersAddresses,
      signature: signature,
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const fetchMyContacts = async (): Promise<any> => {
  try {
    return await axios.post('/api/web3mail/fetch-my-contacts');
  } catch (err) {
    console.error(err);
    throw err;
  }
};
