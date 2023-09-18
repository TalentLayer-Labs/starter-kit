import { parseEther, parseUnits } from 'viem';

export const parseRateAmount = async (
  rateAmount: string,
  rateToken: string,
  decimals: number,
): Promise<BigInt> => {
  if (rateToken === '0x0000000000000000000000000000000000000000') {
    return parseEther(rateAmount);
  }
  return parseUnits(rateAmount, decimals);
};
