import { User } from '.prisma/client';
import { NextApiResponse } from 'next';
import { MAX_TRANSACTION_AMOUNT } from '../../../config';
import {
  ERROR_CHECKING_TRANSACTION_COUNTER,
  ERROR_INCREMENTING_TRANSACTION_COUNTER,
  TRANSACTION_LIMIT_REACHED,
} from '../apiResponses';
import prisma from '../../../postgre/postgreClient';

export async function checkOrResetTransactionCounter(
  user: User,
  res: NextApiResponse,
): Promise<void> {
  let errorMessage;
  try {
    const nowMilliseconds = new Date().getTime();
    const oneWeekAgoMilliseconds = new Date(nowMilliseconds - 7 * 24 * 60 * 60 * 1000).getTime(); // 7 days ago

    if (user.counterStartDate > oneWeekAgoMilliseconds) {
      // Less than one week since counterStartDate
      if (user.weeklyTransactionCounter >= MAX_TRANSACTION_AMOUNT) {
        // If the counter is already 50, stop the function
        console.log(TRANSACTION_LIMIT_REACHED);
        throw new Error(TRANSACTION_LIMIT_REACHED);
      }
    } else {
      console.log('More than a week since the start date, reset counter');
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          counterStartDate: nowMilliseconds,
          weeklyTransactionCounter: 0,
        },
      });
    }
    console.log('Delegating transaction');
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
}

export async function incrementWeeklyTransactionCounter(
  user: User,
  res: NextApiResponse,
): Promise<void> {
  let errorMessage;
  try {
    // Increment the counter
    const newWeeklyTransactionCounter = (user.weeklyTransactionCounter || 0) + 1;
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        weeklyTransactionCounter: newWeeklyTransactionCounter,
      },
    });
    console.log('Transaction counter incremented', newWeeklyTransactionCounter);
  } catch (error: any) {
    if (error?.name?.includes('Prisma')) {
      errorMessage = ERROR_INCREMENTING_TRANSACTION_COUNTER;
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
}
