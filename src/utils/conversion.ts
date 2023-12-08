import { formatUnits } from 'viem';
import { IToken } from '../types';

export const renderTokenAmount = (token: IToken, value: string): string => {
  const formattedValue = formatUnits(BigInt(value), token.decimals);
  return `${formattedValue} ${token.symbol}`;
};
