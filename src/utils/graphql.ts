/* eslint-disable no-console */
import axios from 'axios';
import { getConfig } from '../config';

export const processRequest = async (chainId: number, query: string): Promise<any> => {
  try {
    const subgraphUrl = getConfig(chainId).subgraphUrl;
    return await axios.post(subgraphUrl, { query });
  } catch (err) {
    console.error(err);
    return null;
  }
};
