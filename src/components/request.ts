/* eslint-disable no-console */
import axios from 'axios';

export const createAttestation = async (
  userAddress: string,
  accessToken: string,
  userId: string,
): Promise<any> => {
  try {
    return await axios.post('/api/eas/create-attestation', {
      userAddress,
      accessToken,
      userId,
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const createTestAttestation = async (
  userAddress: string,
  githubAccessToken: string,
  githubUserId: string,
  wakatimeHandle: string,
): Promise<any> => {
  try {
    return await axios.post('/api/eas/create-test-attestation', {
      userAddress,
      accessToken: githubAccessToken,
      userId: githubUserId,
      wakatimeHandle,
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};
