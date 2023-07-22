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
