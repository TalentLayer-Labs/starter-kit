import { Contract } from '@ethersproject/contracts';
import { ExternalProvider, JsonRpcFetchFunc, Web3Provider } from '@ethersproject/providers';
import { parseEther, parseUnits, formatEther, formatUnits } from 'viem'
import { FixedNumber, Signer } from 'ethers';
import ERC20 from '../contracts/ABI/ERC20.json';
import { ITokenFormattedValues } from '../types';

export default function getLibrary(provider: ExternalProvider | JsonRpcFetchFunc): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
}

const getDecimal = async (erc20Token: Contract): Promise<string> => {
  if (!sessionStorage[erc20Token.address]) {
    const tokenDecimals = await erc20Token.decimals();
    sessionStorage[erc20Token.address] = tokenDecimals;
    return tokenDecimals;
  }
  return JSON.parse(sessionStorage[erc20Token.address]);
};

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

export const formatRateAmount = async (
  rateAmount: string,
  rateToken: string,
  signer: Signer,
): Promise<ITokenFormattedValues> => {
  if (rateToken === '0x0000000000000000000000000000000000000000') {
    const valueInEther = formatEther(BigInt(rateAmount));
    const roundedValue = FixedNumber.from(valueInEther).round(2).toString();
    const exactValue = FixedNumber.from(valueInEther).toString();
    return {
      roundedValue,
      exactValue,
    };
  }
  const ERC20Token = new Contract(rateToken, ERC20.abi, signer);
  const tokenDecimals = await getDecimal(ERC20Token);

  const valueInToken = formatUnits(BigInt(rateAmount), Number(tokenDecimals));
  const roundedValue = FixedNumber.from(valueInToken).round(2).toString();
  const exactValue = FixedNumber.from(valueInToken).toString();
  return {
    roundedValue,
    exactValue,
  };
};
