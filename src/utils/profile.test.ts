import { IUser } from '../types';
import { getCompletionScores } from './profile';

const defaultUser: IUser = {
  id: '6',
  address: '0xdbf0bbe459bc3d2cbd7d7f334af3b12e36b40d0f',
  handle: 'test',
  rating: '0',
  userStats: {
    numReceivedReviews: 0,
  },
};

describe('getCompletionScores', () => {
  it('should return lower score when userDetails is empty', () => {
    const user = defaultUser;
    const expected = {
      total: {
        score: 10,
        totalPoint: 140,
        percentage: 7,
      },
      userDetails: {
        score: 0,
        totalPoint: 80,
        percentage: 0,
      },
      web3mail: {
        score: 0,
        totalPoint: 50,
        percentage: 0,
      },
    };
    expect(getCompletionScores(user)).toEqual(expected);
  });

  it('should calculate score based on each field value', () => {
    const user = {
      ...defaultUser,
      description: {
        title: 'Engineer',
        name: 'John',
        skills_raw: 'solidity, jest, js',
        web3mailPreferences: {
          activeOnNewService: false,
          activeOnNewProposal: true,
          activeOnProposalValidated: false,
          activeOnFundRelease: false,
          activeOnReview: false,
          activeOnPlatformMarketing: false,
        },
      },
    };
    const expected = {
      total: {
        score: 100,
        totalPoint: 140,
        percentage: 71,
      },
      userDetails: {
        score: 40,
        totalPoint: 80,
        percentage: 50,
      },
      web3mail: {
        score: 50,
        totalPoint: 50,
        percentage: 100,
      },
    };
    expect(getCompletionScores(user)).toEqual(expected);
  });
});
