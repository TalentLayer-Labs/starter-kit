import React, { useState, useEffect } from 'react';
import useTalentLayerClient from '../hooks/useTalentLayerClient';
import { renderTokenAmount } from '../utils/conversion';
import { IToken } from '../types';

interface TokenAmountProps {
  amount: string;
  address: string;
}

const TokenAmount: React.FC<TokenAmountProps> = ({ amount, address }) => {
  const [token, setToken] = useState<IToken>();
  const [loading, setLoading] = useState<boolean>(true);
  const talentLayerClient = useTalentLayerClient();

  useEffect(() => {
    // Fetch the number of token by token address
    const fetchDecimals = async () => {
      try {
        // Make an API call to get the number of token
        const data = await talentLayerClient?.graphQlClient.get(`
        {
           tokens(where: {address: "${address}"}) {
            address
            symbol
            name
            decimals
            minimumTransactionAmount
          }
        }
        `);
        setToken(data?.data?.tokens[0]);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch token:', error);
      }
    };

    fetchDecimals();
  }, [address]);

  if (!token || loading) {
    return null; // Return null while loading
  }

  return <span>{renderTokenAmount(token, amount)}</span>;
};

export default TokenAmount;
