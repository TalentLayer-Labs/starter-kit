import { useEffect, useState } from 'react';
import { IToken } from '../types';
import { getAllowedTokenList } from '../queries/global';
import { useChainId } from './useChainId';

const useAllowedTokens = (): IToken[] => {
  const chainId = useChainId();
  const [allowedTokens, setAllowedTokens] = useState<IToken[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllowedTokenList(chainId);
        if (response?.data?.data?.tokens) {
          setAllowedTokens(response.data.data.tokens);
        }
      } catch (error: any) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return allowedTokens;
};

export default useAllowedTokens;
