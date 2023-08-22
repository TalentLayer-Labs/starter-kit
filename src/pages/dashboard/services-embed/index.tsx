import { useContext, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { parseRateAmount } from '../../../utils/web3';
import { useChainId } from '../../../hooks/useChainId';
import useAllowedTokens from '../../../hooks/useAllowedTokens';
import StarterKitContext from '../../../context/starterKit';
import Steps from '../../../components/Steps';
import ServiceForm from '../../../components/Form/ServiceForm';
import { formatDate } from '../../../utils/dates';
import { renderTokenAmountFromConfig } from '../../../utils/conversion';

interface ILiveServiceContent {
  title?: string;
  about?: string;
  rateAmount?: string;
  rateToken?: string;
}

const ServicesEmbedCreate = () => {
  const [liveServiceContent, setLiveServiceContent] = useState<ILiveServiceContent>({
    title: 'Enter a title',
    rateToken: '0x0000000000000000000000000000000000000000',
    rateAmount: '0',
  });

  const chainId = useChainId();
  const allowedTokenList = useAllowedTokens();
  const { user } = useContext(StarterKitContext);
  const router = useRouter();
  const navigateToServicesEmbedSettings = () => router.push('/dashboard/services-embed/settings');

  const handleServiceFormInput = async (event: ILiveServiceContent) => {
    // TODO: move this to an async function expression
    if (event.rateAmount) {
      if (liveServiceContent?.rateToken) {
        const token = allowedTokenList.find(
          token => token.address === liveServiceContent.rateToken,
        );

        if (token) {
          const _parsedRateAmount = await parseRateAmount(
            event.rateAmount.toString(),
            liveServiceContent.rateToken,
            token.decimals,
          );

          setLiveServiceContent({
            ...liveServiceContent,
            rateAmount: _parsedRateAmount.toString(),
          });
        }
      }
    } else {
      setLiveServiceContent({ ...liveServiceContent, ...event });
    }
  };

  if (!user) {
    return <Steps />;
  }

  return (
    <div className='max-w-7xl mx-auto text-gray-200 sm:px-4 lg:px-0'>
      <p className='flex items-center text-2xl font-medium tracking-wider mb-8 border-b w-full border-gray-700'>
        Post your First Gig
      </p>
      <div className='grid grid-cols-2 gap-2'>
        <div>
          <ServiceForm
            onSuccess={navigateToServicesEmbedSettings}
            onChange={handleServiceFormInput}
          />
          <div className='mt-4 grid grid-cols-2'>
            <div />
            <button
              type='submit'
              className='rounded-xl text-white'
              onClick={navigateToServicesEmbedSettings}>
              {'>'} Skip and configure your board
            </button>
          </div>
        </div>
        <div>
          <div className='flex flex-row gap-2 rounded-xl p-4 border border-gray-700 text-white bg-endnight'>
            <div className='flex flex-col items-top justify-between gap-4 w-full'>
              <div className='flex flex-col justify-start items-start gap-4'>
                <div className='flex items-center justify-start'>
                  <Image
                    src={`/images/default-avatar-${Number(user?.id) % 9}.jpeg`}
                    className='w-10 mr-4 rounded-full'
                    width={50}
                    height={50}
                    alt='default avatar'
                  />
                  <div className='flex flex-col'>
                    <p className='font-medium break-all'>{liveServiceContent?.title}</p>
                    <p className='text-xs text-gray-400'>
                      created by {user?.handle} the {formatDate(Number(Date.now()) * 1000)}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <p>{liveServiceContent.about}</p>
              </div>
              <div className='flex flex-row gap-4 justify-between items-center border-t border-gray-700 pt-4'>
                {liveServiceContent?.rateToken && liveServiceContent?.rateAmount && (
                  <p className='text-gray-300 font-bold'>
                    {renderTokenAmountFromConfig(
                      chainId,
                      liveServiceContent.rateToken,
                      liveServiceContent.rateAmount,
                    )}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesEmbedCreate;
