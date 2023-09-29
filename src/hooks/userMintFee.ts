import { useEffect, useState } from 'react';
import { useChainId } from './useChainId';
import { getUserMintFee } from '../queries/talentLayerIdPrice';

const userMintFee = () => {
  const chainId = useChainId();
  const [mintFee, setMintFee] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserMintFee(chainId);
        const data = response.data.data;

        if (data) {
          setMintFee(data.protocols[0].userMintFee);
        }

      } catch (err: any) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    };
    fetchData();
  }, [chainId]);

  return mintFee;
};

export default userMintFee;
