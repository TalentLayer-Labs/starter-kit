import { processRequest } from '../utils/graphql';

export const getProtocolAndPlatformsFees = (
  chainId: number,
  originServicePlatformId: string,
  originValidatedProposalPlatformId: string,
): Promise<any> => {
  const query = `
  {
    protocols {
      protocolEscrowFeeRate
    }
    servicePlatform: platform(id:${originServicePlatformId}){
      originServiceFeeRate
    }
    proposalPlatform: platform(id:${originValidatedProposalPlatformId}){
      originValidatedProposalFeeRate
    }
  }
    `;

  return processRequest(chainId, query);
};
