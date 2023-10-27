import Image from 'next/image';
import { formatUnits } from 'viem';
import { chains } from '../../pages/_app';
import { useChainId } from '../../hooks/useChainId';
import { useEffect, useState } from 'react';
import useMintFee from '../../hooks/useMintFee';

export function HandlePrice({ handle }: { handle: string }) {
  const [price, setPrice] = useState(0);
  const chainId = useChainId();
  const { calculateMintFee } = useMintFee();
  const currentChain = chains.find(chain => chain.id === chainId);

  useEffect(() => {
    const newPrice = calculateMintFee(handle);
    setPrice(newPrice);
  }, [handle]);

  const priceFormatted = Number(
    formatUnits(BigInt(price), Number(currentChain?.nativeCurrency?.decimals)),
  );

  return (
    <div className='flex items-center border-info pl-2 text-sm text-base-content opacity-50 '>
      <div>
        {priceFormatted} {currentChain?.nativeCurrency.symbol}
      </div>
      <Image
        src={`/images/blockchain/${chainId}.png`}
        width={20}
        height={20}
        alt={currentChain?.nativeCurrency.symbol || ''}
        className='mx-2'
      />
    </div>
  );
}
