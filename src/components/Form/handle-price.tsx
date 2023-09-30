import Image from 'next/image';
import { formatUnits } from 'viem'; 
import { chains } from '../../pages/_app';
import { useChainId } from '../../hooks/useChainId';
import { useHandlePriceCalculator } from '../../hooks/useHandlePriceCalculator';


export function HandlePrice({ handle }: { handle: string }) {
  
  const chainId = useChainId();
  const currentChain = chains.find(chain => chain.id === chainId);
  const price = useHandlePriceCalculator({ handle });
  const priceFormatted = Number(formatUnits(BigInt(price), Number(currentChain?.nativeCurrency?.decimals)));

  return (
    <div className='flex items-center border-gray-300 pl-2 text-sm text-gray-500 '>
      <div>{priceFormatted} {currentChain?.nativeCurrency.symbol}</div>
      <Image src={`/images/blockchain/${chainId}.png`} width={20} height={20} alt={currentChain?.nativeCurrency.symbol || ''} className='mx-2' />
    </div>
  );
}
