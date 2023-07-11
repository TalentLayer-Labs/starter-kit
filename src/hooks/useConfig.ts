import { getConfig } from '../config';
import { useChainId } from './useChainId';

export const useConfig = () => {
  const chainId = useChainId();
  return getConfig(chainId);
};
