import { formatUnits } from 'viem';
import { getConfig } from '../config';
import { IToken } from '../types';

export const renderTokenAmount = (token: IToken, value: string): string => {
  const formattedValue = formatUnits(BigInt(value), token.decimals);
  return `${formattedValue} ${token.symbol}`;
};
