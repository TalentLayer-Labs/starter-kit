import { formatEther, formatUnits } from 'viem';
import { getConfig } from '../config';
import { IToken, ITokenFormattedValues } from '../types';
import { ZERO_ADDRESS } from './constant';

export const renderTokenAmount = (token: IToken, value: string): string => {
  const formattedValue = formatUnits(BigInt(value), token.decimals);
  return `${formattedValue} ${token.symbol}`;
};

// TODO: query tokens list from graph
export const renderTokenAmountFromConfig = (
  chainId: number,
  tokenAddress: string,
  value: string,
): string | null => {
  const config = getConfig(chainId);
  if (config.tokens[tokenAddress] === undefined || !value) {
    return null;
  }
  const symbol = config.tokens[tokenAddress].symbol;
  const formattedValue = formatUnits(BigInt(value), config.tokens[tokenAddress].decimals);
  return `${formattedValue} ${symbol}`;
};


export const formatRateAmount = (
  rateAmount: string,
  rateToken: string,
  tokenDecimals: number,
): ITokenFormattedValues => {
  if (rateToken === ZERO_ADDRESS) {
    const valueInEther = formatEther(BigInt(rateAmount));
    const roundedValue = parseFloat(valueInEther).toFixed(2).toString();
    const exactValue = Number(valueInEther).toString();
    return {
      roundedValue,
      exactValue,
    };
  }
  
  const valueInToken = formatUnits(BigInt(rateAmount), tokenDecimals);
  const roundedValue = parseFloat(valueInToken).toFixed(2).toString();
  const exactValue = Number(valueInToken).toString();
  return {
    roundedValue,
    exactValue,
  };
};