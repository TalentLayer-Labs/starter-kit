import { ServiceStatusEnum } from '../types';
import { processRequest } from '../utils/graphql';

interface IProps {
  serviceStatus?: ServiceStatusEnum;
  buyerId?: string;
  sellerId?: string;
  numberPerPage?: number;
  offset?: number;
  searchQuery?: string;
  platformId?: string;
}

const serviceQueryFields = `
  id
  status
  createdAt
  cid
  transaction {
    id
  }
  buyer {
    id
    handle
    address
    rating
    userStats {
      numReceivedReviews
    }
  }
  seller {
    id
    handle
  }
  proposals {
    id
  }
  validatedProposal: proposals(where: {status: "Validated"}){
    id,
    rateToken {
      address
      decimals
      name
      symbol
    },
    rateAmount,
  }
`;

const serviceDescriptionQueryFields = `
  id
  title
  video_url
  about
  startDate
  expectedEndDate
  rateAmount
  rateToken
  keywords_raw
  keywords {
    id
  }
`;

const getFilteredServiceCondition = (params: IProps) => {
  let condition = ', where: {';
  condition += params.serviceStatus ? `status: "${params.serviceStatus}"` : '';
  condition += params.buyerId ? `, buyer: "${params.buyerId}"` : '';
  condition += params.sellerId ? `, seller: "${params.sellerId}"` : '';
  condition += params.platformId ? `, platform: "${params.platformId}"` : '';
  condition += '}';
  return condition === ', where: {}' ? '' : condition;
};

const getFilteredServiceDescriptionCondition = (params: IProps) => {
  let condition = ', where: {';
  condition += params.serviceStatus ? `service_: {status:"${params.serviceStatus}"}` : '';
  condition += params.buyerId ? `, buyer: "${params.buyerId}"` : '';
  condition += params.sellerId ? `, seller: "${params.sellerId}"` : '';
  condition += params.platformId ? `, platform: "${params.platformId}"` : '';
  condition += '}';
  return condition === ', where: {}' ? '' : condition;
};

export const getServices = (chainId: number, params: IProps): Promise<any> => {
  const pagination = params.numberPerPage
    ? 'first: ' + params.numberPerPage + ', skip: ' + params.offset
    : '';
  const query = `
    {
      services(orderBy: id, orderDirection: desc ${pagination} ${getFilteredServiceCondition(
    params,
  )}) {
        ${serviceQueryFields}
        description {
          ${serviceDescriptionQueryFields}
        }
      }
    }`;

  return processRequest(chainId, query);
};

export const searchServices = (chainId: number, params: IProps): Promise<any> => {
  const pagination = params.numberPerPage
    ? 'first: ' + params.numberPerPage + ' skip: ' + params.offset
    : '';
  const query = `
    {
      serviceDescriptionSearchRank(
        text: "${params.searchQuery}",
        orderBy: id orderDirection: desc ${pagination} ${getFilteredServiceDescriptionCondition(
    params,
  )}
      ){
        ${serviceDescriptionQueryFields}
        service {
          ${serviceQueryFields}
        }
      }
    }`;
  return processRequest(chainId, query);
};

export const getServiceById = (chainId: number, id: string): Promise<any> => {
  const query = `
    {
      service(id: "${id}") {
        ${serviceQueryFields}
        description {
          ${serviceDescriptionQueryFields}
        }
      }
    }
    `;
  return processRequest(chainId, query);
};

export const getNewServicesForPlatform = (
  chainId: number,
  id: string,
  timestamp?: string,
): Promise<any> => {
  const timestampCondition = timestamp ? `, updatedAt_gt: "${timestamp}"` : '';
  const query = `
      {
        services(
          orderBy: updatedAt
          where: {status: Opened, platform: "${id}" ${timestampCondition}}
        ) {
          id
          platform {
            id
            description {
              website
            }
          }
          description {
            keywords_raw
            keywords {
              id
            }
            about
            rateAmount
            rateToken {
              symbol
            }
            startDate
            title
          }
          buyer {
            address
          }
        }
      }
    `;
  return processRequest(chainId, query);
};
