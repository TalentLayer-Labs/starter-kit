import { useEffect, useState } from 'react';
import { useChainId } from './useChainId';
import { getUserMintFee } from '../queries/talentLayerIdPrice';

const userMintFee = () => {
  const chainId = useChainId();
  const [fees, setFees] = useState({userMintFeeRate: 0});

  useEffect(() => {
    const fees ={userMintFeeRate: 0};
    const fetchData = async () => {
      try {
        const response = await getUserMintFee(chainId);
        const data = response.data.data;

        if (data) {
          fees.userMintFeeRate = data.protocols[0].getUserMintFee;
        }

        setFees(fees);
      } catch (err: any) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    };
    fetchData();
  }, [chainId]);

  return fees;
};

export default userMintFee;
