import { processRequest } from '../utils/graphql';

const platformFields = `
    id
    address
    name
    createdAt
    updatedAt
    feePayments
    totalPlatformGains
    feeClaims
    originServiceFeeRate
    originValidatedProposalFeeRate
    servicePostingFee
    proposalPostingFee
    arbitrator
    arbitratorExtraData
    arbitrationFeeTimeout
    cid
    description
    signer
`;

const platformDescriptionFields = `
    id
    about
    website
    platform
    video_url
    image_url
`;

export const getPlatform = (chainId: number, id: string): Promise<any> => {
  const query = `
    {
      platform(id: ${id}) {
        ${platformFields}
        description {
          ${platformDescriptionFields}
        }
      }
    }
    `;
  return processRequest(chainId, query);
};

export const getPlatformsByOwner = (chainId: number, addressOwner: string): Promise<any> => {
  const query = `
    {
      platforms(where: {address: "${addressOwner}"}) {
        ${platformFields}
        description {
          ${platformDescriptionFields}
        }
      }
    }
    `;
  return processRequest(chainId, query);
};
