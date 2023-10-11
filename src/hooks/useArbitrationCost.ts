import { useState, useEffect } from 'react';
import TalentLayerArbitrator from '../contracts/ABI/TalentLayerArbitrator.json';
import { useChainId, usePublicClient } from 'wagmi';
import { ZERO_ADDRESS } from '../utils/constant';
import { Address } from 'viem';

const useArbitrationCost = (arbitratorAddress: Address | undefined): BigInt | null => {
  const [arbitrationCost, setArbitrationCost] = useState<BigInt | null>(null);
  const chainId = useChainId();
  const publicClient = usePublicClient({ chainId });
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (publicClient && arbitratorAddress && arbitratorAddress !== ZERO_ADDRESS) {
          const response: any = await publicClient.readContract({
            address: arbitratorAddress,
            abi: TalentLayerArbitrator.abi,
            functionName: 'arbitrationPrice',
            args: [process.env.NEXT_PUBLIC_PLATFORM_ID],
          });
          if (response) {
            setArbitrationCost(response);
          }
        }
      } catch (err: any) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    };
    fetchData();
  }, [arbitratorAddress]);

  return arbitrationCost;
};

export default useArbitrationCost;