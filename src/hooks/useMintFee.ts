import { useEffect, useState } from 'react';
import { useChainId } from './useChainId';
import { getUserMintFee } from '../queries/protocols';

const useMintFee = () => {
  const chainId = useChainId();
  const [mintFee, setMintFee] = useState(0);
  const [shortHandlesMaxPrice, setShortHandlesMaxPrice] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserMintFee(chainId);
        const data = response.data.data;

        if (data) {
          setMintFee(data.protocols[0].userMintFee);
          setShortHandlesMaxPrice(data.protocols[0].shortHandlesMaxPrice);
        }
      } catch (err: any) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    };
    fetchData();
  }, [chainId]);

  const calculateMintFee = (handle: string) => {
    const length = handle.length;
    const handlePrice = length > 4 ? mintFee : shortHandlesMaxPrice / Math.pow(2, length - 1);
    return handlePrice;
  };

  return { calculateMintFee };
};

export default useMintFee;
