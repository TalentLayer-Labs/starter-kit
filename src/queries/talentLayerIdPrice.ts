import { processRequest } from '../utils/graphql';

export const getUserMintFee = (
  chainId: number,
): Promise<any> => {
  const query = `
  {
    protocols {
      userMintFee
    }
  }
    `;

  return processRequest(chainId, query);
};