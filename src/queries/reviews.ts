import { processRequest } from '../utils/graphql';

export const getReviewsByService = (chainId: number, serviceId: string): Promise<any> => {
  const query = `
    {
      reviews(where: { service: "${serviceId}" }, orderBy: id, orderDirection: desc) {
        id
        rating
        createdAt
        service {
          id
          status
        }
        to {
          id
          handle
        }
        description{
          id
          content
        }
      }
    }
    `;
  return processRequest(chainId, query);
};
