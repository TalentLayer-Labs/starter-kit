import { processRequest } from '../utils/graphql';
import { IWeb3mailPreferences } from '../types';

export const getUsers = (
  chainId: number,
  numberPerPage?: number,
  offset?: number,
  searchQuery?: string,
): Promise<any> => {
  const pagination = numberPerPage ? 'first: ' + numberPerPage + ', skip: ' + offset : '';
  let condition = ', where: {';
  condition += searchQuery ? `, handle_contains_nocase: "${searchQuery}"` : '';
  condition += '}';

  const query = `
    {
      users(orderBy: rating, orderDirection: desc ${pagination} ${condition}) {
        id
        address
        handle
        userStats {
          numReceivedReviews
        }
        rating
      }
    }
    `;
  return processRequest(chainId, query);
};

export const getUserById = (chainId: number, id: string): Promise<any> => {
  const query = `
    {
      user(id: "${id}") {
        id
        address
        handle
        rating
        delegates
        userStats {
          numReceivedReviews
        }
        updatedAt
        createdAt
        description {
          about
          role
          name
          country
          headline
          id
          image_url
          video_url
          title
          timezone
          skills_raw
          web3mailPreferences{
            activeOnNewService
            activeOnNewProposal
            activeOnProposalValidated
            activeOnFundRelease
            activeOnReview
            activeOnPlatformMarketing
            activeOnProtocolMarketing
          }
        }
      }
    }
    `;
  return processRequest(chainId, query);
};

export const getUserByAddress = (chainId: number, address: string): Promise<any> => {
  const query = `
    {
      users(where: {address: "${address.toLocaleLowerCase()}"}, first: 1) {
        id
        address
        handle
        rating
        delegates
        userStats {
          numReceivedReviews
        }
        updatedAt
        createdAt
        description {
          about
          role
          name
          country
          headline
          id
          image_url
          video_url
          title
          timezone
          skills_raw
          web3mailPreferences{
            activeOnNewService
            activeOnNewProposal
            activeOnProposalValidated
            activeOnFundRelease
            activeOnReview
            activeOnPlatformMarketing
            activeOnProtocolMarketing
          }
        }
      }
    }
    `;
  return processRequest(chainId, query);
};

export const getUserTotalGains = (chainId: number, id: string): Promise<any> => {
  const query = `
    {
      user(id: "${id}") {
        totalGains{
          id
          totalGain
          token {
            id
            name
            symbol
            decimals
          }
        }
      }
    }
    `;
  return processRequest(chainId, query);
};

export const getUserByIds = (chainId: number, ids: string[]): Promise<any> => {
  const query = `
    {
      users(where: {id_in: [${ids.join(',')}]}) {
        id
        address
        handle
        rating
        delegates
        userStats {
          numReceivedReviews
        }
        updatedAt
        createdAt
        description {
          about
          role
          name
          country
          headline
          id
          image_url
          video_url
          title
          timezone
          skills_raw
        }
      }
    }
    `;
  return processRequest(chainId, query);
};

export const getUserWeb3mailPreference = (
  chainId: number,
  address: string,
  web3mailPreference: keyof IWeb3mailPreferences,
): Promise<any> => {
  const query = `
    {
      user(address: "${address}) {
        description{
          web3mailPreferences {
            ${web3mailPreference}
        }
      }
    }
    `;
  return processRequest(chainId, query);
};

export const getUsersWeb3MailPreference = (
  chainId: number,
  addresses: string[],
  web3mailPreference: keyof IWeb3mailPreferences,
): Promise<any> => {
  const query = `
    {
      userDescriptions(
        where: {user_: {address_in: ["${addresses
          .map(a => a.toLowerCase())
          .join('","')}"]}, web3mailPreferences_: {${web3mailPreference}: true}}
      ) {
        id
        user {
          id
          address
          handle
          description {
            id
          }
        }
      }
    }
    `;
  return processRequest(chainId, query);
};

export const getWeb3mailUsersForNewServices = (
  chainId: number,
  addresses: string[],
  web3mailPreference: keyof IWeb3mailPreferences,
): Promise<any> => {
  const query = `
    {
      userDescriptions(
        where: {user_: {address_in: ["${addresses
          .map(a => a.toLowerCase())
          .join('","')}"]}, web3mailPreferences_: {${web3mailPreference}: true}}
      ) {
        id
        skills_raw
        user {
          id
          address
          handle
          description {
            id
          }
        }
      }
    }
    `;
  return processRequest(chainId, query);
};
