import { formatUnits } from 'viem';
import { IToken } from '../types';

export const renderTokenAmount = (token: IToken, value: string): string => {
  const parsedValue = Number(value);
  if (isNaN(parsedValue)) {
    return 'invalid format';
  }

  const formattedValue = formatUnits(BigInt(parsedValue), token.decimals);
  return `${formattedValue} ${token.symbol}`;
};
