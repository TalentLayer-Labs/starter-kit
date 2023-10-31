import { processRequest } from '../utils/graphql';

export const getPaymentsByService = (
  chainId: number,
  serviceId: string,
  paymentType?: string,
): Promise<any> => {
  let condition = `where: {service: "${serviceId}"`;
  paymentType ? (condition += `, paymentType: "${paymentType}"`) : '';
  condition += '}, first: 1000, orderBy: id, orderDirection: asc';
  const query = `
    {
      payments(${condition}) {
        id
        amount
        rateToken {
          address
          decimals
          name
          symbol
        }
        paymentType
        transactionHash
        createdAt
      }
    }
    `;
  return processRequest(chainId, query);
};

export const getPaymentsForUser = (
  chainId: number,
  userId: string,
  numberPerPage?: number,
  offset?: number,
  startDate?: string,
  endDate?: string,
): Promise<any> => {
  const pagination = numberPerPage ? 'first: ' + numberPerPage + ', skip: ' + offset : '';

  const startDataCondition = startDate ? `, createdAt_gte: "${startDate}"` : '';
  const endDateCondition = endDate ? `, createdAt_lte: "${endDate}"` : '';

  const query = `
    {
      payments(where: {
        service_: {seller: "${userId}"}
        ${startDataCondition}
        ${endDateCondition}
      }, 
      first: 1000, orderBy: createdAt orderDirection: desc ${pagination} ) {
        id, 
        rateToken {
          address
          decimals
          name
          symbol
        }
        amount
        transactionHash
        paymentType
        createdAt
        service {
          id, 
          cid
        }
      }
    }
    `;
  return processRequest(chainId, query);
};

export const getNewPayments = (chainId: number, id: string, timestamp?: string): Promise<any> => {
  const timestampCondition = timestamp ? `, createdAt_gt: "${timestamp}"` : '';
  const query = `
      {
        payments(
          first: 1000, orderBy: createdAt
          where: {service_: {platform: "${id}"} ${timestampCondition}}
        ) {
          id
          amount
          createdAt
          paymentType
          rateToken {
            symbol
            address
          }
          service {
            id
            buyer {
              id
              address
              handle
            }
            seller {
              address
              handle
            }
            description {
              title
              about
            }
            platform {
              id
              name
              description {
                website
              }
            }
          }
        }
      }
    `;
  return processRequest(chainId, query);
};
