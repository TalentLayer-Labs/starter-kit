import { User } from '.prisma/client';
import { NextApiResponse } from 'next';
import {
  EMAIL_ALREADY_VERIFIED,
  EMAIL_VERIFIED_SUCCESSFULLY,
  ERROR_CHECKING_TRANSACTION_COUNTER,
} from '../apiResponses';
import prisma from '../../../postgre/postgreClient';

export const verifyUserEmail = async (id: string, res?: NextApiResponse) => {
  let errorMessage;
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (existingUser?.isEmailVerified === true) {
      console.log(EMAIL_ALREADY_VERIFIED);
      throw new Error(EMAIL_ALREADY_VERIFIED);
    }
    const resp = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        isEmailVerified: true,
      },
    });
    console.log('Validated user email', resp.id, resp.name, resp.email);
    return {
      message: EMAIL_VERIFIED_SUCCESSFULLY,
      email: resp.email,
    };
  } catch (error: any) {
    if (error?.name?.includes('Prisma')) {
      errorMessage = ERROR_CHECKING_TRANSACTION_COUNTER;
    } else {
      errorMessage = error.message;
    }
    if (res) {
      console.log(error.message);
      res.status(500).json({ error: errorMessage });
    } else {
      console.log(error.message);
      throw new Error(errorMessage);
    }
  }
};

export async function checkUserEmailVerificationStatus(
  user: User,
  res: NextApiResponse,
): Promise<void> {
  if (!user.isEmailVerified) {
    console.log('Email not verified');
    res.status(401).json({ error: 'Email not verified' });
  }
}

export const getUserByEmail = async (userEmail: string, res?: NextApiResponse) => {
  let errorMessage;
  try {
    console.log('Getting User Profile with email:', userEmail);
    const userProfile = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (!userProfile) {
      return null;
    }

    console.log('Fetched user profile with id: ', userProfile?.id);
    return userProfile;
  } catch (error: any) {
    if (error?.name?.includes('Prisma')) {
      errorMessage = ERROR_CHECKING_TRANSACTION_COUNTER;
    } else {
      errorMessage = error.message;
    }
    if (res) {
      console.log(error.message);
      res.status(500).json({ error: errorMessage });
    } else {
      console.log(error.message);
      throw new Error(errorMessage);
    }
  }
};
