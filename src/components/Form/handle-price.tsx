import Image from 'next/image';
import useMintFee from '../../hooks/useMintFee';
import { formatUnits } from 'viem';
import { chains } from '../../pages/_app';
import { useChainId } from '../../hooks/useChainId';

export function HandlePrice({ handle }: { handle: string }) {
  
  const chainId = useChainId();
  const currentChain = chains.find(chain => chain.id === chainId);
  const { mintFee, shortHandlesMaxPrice } = useMintFee();
  const mintFeeFormatted = Number(formatUnits(BigInt(mintFee), Number(currentChain?.nativeCurrency?.decimals)));
  const shortHandlesMaxPriceFormatted = Number(formatUnits(BigInt(shortHandlesMaxPrice), Number(currentChain?.nativeCurrency?.decimals)));
  
  
  const length = handle.length;
  const price = length > 4 ? mintFeeFormatted : shortHandlesMaxPriceFormatted / Math.pow(2, handle.length - 1);
  return (

    <div className='flex items-center border-gray-300 pl-2 text-sm text-gray-500 '>
      <div>{price} {currentChain?.nativeCurrency.symbol}</div>
      <Image src={'/images/matic.png'} width={20} height={20} alt={currentChain?.nativeCurrency.symbol || ''} className='mx-2' />
    </div>
  );
}
