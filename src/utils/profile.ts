import { IUser, IUserDetails } from '../types';

export type ICompletionScores = {
  total: ICompletionScore;
  userDetails: ICompletionScore;
};

export type ICompletionScore = {
  score: number;
  totalPoint: number;
  percentage: number;
};

const pointsByUserFields = {
  handle: 10,
};

const pointsByUserDetailsFields = {
  title: 10,
  name: 10,
  role: 10,
  imageUrl: 10,
  about: 20,
  skills_raw: 20,
  web3mailPreferences: 10,
};

export const getCompletionScores = (user: IUser): ICompletionScores => {
  let score = 0;
  let totalPoint = 0;

  Object.entries(pointsByUserFields).forEach(pointsByField => {
    const [key, value] = pointsByField;
    totalPoint += value;
    if (user[key as keyof IUser]) {
      score += value;
    }
  });

  let userDetailsScore = 0;
  let userDetailsTotalPoint = 0;
  Object.entries(pointsByUserDetailsFields).forEach(pointsByField => {
    const [key, value] = pointsByField;
    totalPoint += value;
    userDetailsTotalPoint += value;
    if (user.description && user.description[key as keyof IUserDetails]) {
      score += value;
      userDetailsScore += value;
    }
  });

  return {
    total: {
      score: score,
      totalPoint: totalPoint,
      percentage: Math.round((score * 100) / totalPoint),
    },
    userDetails: {
      percentage: Math.round((userDetailsScore * 100) / userDetailsTotalPoint),
      score: userDetailsScore,
      totalPoint: userDetailsTotalPoint,
    },
  };
};
