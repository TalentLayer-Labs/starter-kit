import Image from 'next/image';
import { formatUnits } from 'viem'; 
import { chains } from '../../pages/_app';
import { useChainId } from '../../hooks/useChainId';
import { useEffect, useState } from 'react';
import useMintFee from '../../hooks/useMintFee';


export function HandlePrice({ handle }: { handle: string }) {
  const [price, setPrice] = useState(0);
  const chainId = useChainId();
  const currentChain = chains.find(chain => chain.id === chainId);
  const { mintFee, shortHandlesMaxPrice } = useMintFee();
  
  useEffect(() => {
      const length = handle.length;
      const newPrice = length > 4 ? mintFee : shortHandlesMaxPrice / Math.pow(2, handle.length - 1);
      setPrice(newPrice);
  }, [handle, mintFee, shortHandlesMaxPrice]);
  
  const priceFormatted = Number(formatUnits(BigInt(price), Number(currentChain?.nativeCurrency?.decimals)));

  return (
    <div className='flex items-center border-gray-300 pl-2 text-sm text-gray-500 '>
      <div>{priceFormatted} {currentChain?.nativeCurrency.symbol}</div>
      <Image src={`/images/blockchain/${chainId}.png`} width={20} height={20} alt={currentChain?.nativeCurrency.symbol || ''} className='mx-2' />
    </div>
  );
}
