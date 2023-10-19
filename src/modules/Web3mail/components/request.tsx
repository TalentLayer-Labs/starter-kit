import axios from 'axios';

export const fetchEmailAmount = async (): Promise<any> => {
  try {
    return await axios.post('/api/web3mail/stats');
  } catch (err) {
    console.error(err);
    throw err;
  }
};
