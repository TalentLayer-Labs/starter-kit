import { processRequest } from '../utils/graphql';

export const getAllProposalsByServiceId = (chainId: number, id: string): Promise<any> => {
  const query = `
    {
      proposals(where: {service_: {id: "${id}"}}) {
        service {
          id,
          cid
          buyer {
            id
          }
          platform {
            id
          }
        }
        cid
        id
        status
        rateToken {
          address
          decimals
          name
          symbol
        }
        rateAmount
        createdAt
        updatedAt
        seller {
          id
          handle
          address
          cid
          rating
          userStats {
            numReceivedReviews
          }
          description{
            image_url
          }
        }
        description {
          id
          about
          expectedHours
          startDate
          video_url
        }
        expirationDate
        platform {
          id
        }
      }
    }
    `;
  return processRequest(chainId, query);
};

export const getAllProposalsByUsers = (
  chainId: number,
  sellerId: string,
  buyerId: string,
): Promise<any> => {
  const query = `
      {
        proposals(where: {seller: "${sellerId}", buyer: "${buyerId}", status: "Pending"}) {
          id
          rateAmount
          rateToken {
            address
            decimals
            name
            symbol
          }
          status
          cid
          createdAt
          seller {
            id
            handle
          }
          service {
            id
            cid
            createdAt
            buyer {
              id
              handle
            }
          }
          description {
            id
            about
            expectedHours
            startDate
            video_url
          }
          expirationDate
        }
      }
    `;
  return processRequest(chainId, query);
};

export const getProposalById = (chainId: number, id: string): Promise<any> => {
  const query = `
      {
        proposals(where: {id: "${id}"}) {
          rateToken {
            address
          }
          rateAmount
          description {
            about
            video_url
          }
          status
          expirationDate
        }
      }
    `;
  return processRequest(chainId, query);
};

export const getProposalsFromPlatformServices = (
  chainId: number,
  id: string,
  timestamp?: string,
): Promise<any> => {
  const timestampCondition = timestamp ? `, updatedAt_gt: "${timestamp}"` : '';
  const query = `
      {
        proposals(
          orderBy: updatedAt
          where: {status: Pending, service_: {platform: "${id}", status: Opened} ${timestampCondition}}
        ) {
          id
          rateAmount
          rateToken {
            symbol
          }
          description {
            about
          }
          service {
            id
            buyer {
              address
              handle
            }
            platform {
              id
              name
              description {
                title
                website
              }
            }
          }
          seller {
            address
            handle
          }
        }
      }
    `;
  return processRequest(chainId, query);
};

export const getAcceptedProposals = (
  chainId: number,
  id: string,
  timestamp?: string,
): Promise<any> => {
  const timestampCondition = timestamp ? `, updatedAt_gt: "${timestamp}"` : '';
  const query = `
      {
        proposals(
          orderBy: updatedAt
          where: {status: Validated, platform: "${id}" ${timestampCondition}}
        ) {
          id
          description {
            about
          }
          rateAmount
          rateToken {
            symbol
          }
          service {
            id
            buyer {
              address
            }
            description {
              title
            }
            platform {
              id
              name
              description {
                website
              }
            }
          }
          seller {
            address
            handle
          }
        }
      }
    `;
  return processRequest(chainId, query);
};
