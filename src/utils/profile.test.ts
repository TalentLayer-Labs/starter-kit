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
        totalPoint: 100,
        percentage: 10,
      },
      userDetails: {
        score: 0,
        totalPoint: 90,
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
      },
    };
    const expected = {
      total: {
        score: 50,
        totalPoint: 100,
        percentage: 50,
      },
      userDetails: {
        score: 40,
        totalPoint: 90,
        percentage: 44,
      },
    };
    expect(getCompletionScores(user)).toEqual(expected);
  });
});
