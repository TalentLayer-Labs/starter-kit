import { processRequest } from '../utils/graphql';

export const getUserMintFee = (chainId: number): Promise<any> => {
  const query = `
  {
    protocols {
      userMintFee,
      shortHandlesMaxPrice
    }
  }
    `;

  return processRequest(chainId, query);
};
