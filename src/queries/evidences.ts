import { processRequest } from '../utils/graphql';

export const getEvidencesTransactionId = (chainId: number,transactionId: string): Promise<any> => {
  let condition = `where: {transaction_: {id: "${transactionId}"}`;
  condition += '}, orderBy: id, orderDirection: asc';
  const query = `
    {
      evidences(${condition}) {
        id
        cid
        party {
          handle
          id
        }
        description {
          name
          fileTypeExtension
          description
          fileHash
        }
      }
    }
    `;
  return processRequest(chainId, query);
};