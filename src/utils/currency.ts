import { parseEther, parseUnits } from 'viem';
import { ZERO_ADDRESS } from './constant';

export const parseRateAmount = async (
  rateAmount: string,
  rateToken: string,
  decimals: number,
): Promise<BigInt> => {
  if (rateToken === ZERO_ADDRESS) {
    return parseEther(rateAmount);
  }
  return parseUnits(rateAmount, decimals);
};
