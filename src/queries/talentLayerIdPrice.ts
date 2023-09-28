import { processRequest } from '../utils/graphql';

export const getUserMintFee = (
  chainId: number,
): Promise<any> => {
  const query = `
  {
    protocols {
      userMintFeeRate
    }
  }
    `;

  return processRequest(chainId, query);
};