import { IUser, IUserDetails, IWeb3mailPreferences } from '../types';

export type ICompletionScores = {
  total: ICompletionScore;
  userDetails: ICompletionScore;
  web3mail: ICompletionScore;
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
  image_url: 10,
  about: 20,
  skills_raw: 20,
};

const pointsByWeb3mailFields = {
  activeOnNewProposal: 50,
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

  let userWeb3mailScore = 0;
  let userWeb3mailTotalPoint = 0;
  Object.entries(pointsByWeb3mailFields).forEach(pointsByField => {
    const [key, value] = pointsByField;
    totalPoint += value;
    userWeb3mailTotalPoint += value;
    if (
      user.description?.web3mailPreferences &&
      user.description.web3mailPreferences[key as keyof IWeb3mailPreferences] !== null
    ) {
      score += value;
      userWeb3mailScore += value;
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
    web3mail: {
      percentage: Math.round((userWeb3mailScore * 100) / userWeb3mailTotalPoint),
      score: userWeb3mailScore,
      totalPoint: userWeb3mailTotalPoint,
    },
  };
};
