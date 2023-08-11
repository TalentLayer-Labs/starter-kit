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

const GigBoard = () => {
  const [liveServiceContent, setLiveServiceContent] = useState<ILiveServiceContent>({});

  const chainId = useChainId();
  const allowedTokenList = useAllowedTokens();
  const { user } = useContext(StarterKitContext);
  const router = useRouter();

  if (!user) {
    return <Steps />;
  }
  // TODO - see if you can replace the jsx with ServiceItem. For that you need to create an object of type IService from LiveServiceContent
  return (
    <div className='max-w-7xl mx-auto text-gray-200 sm:px-4 lg:px-0'>
      <div className='grid grid-cols-2 gap-2'>
        <div>
          <ServiceForm
            onSuccess={() => router.push('/dashboard/gig-board/settings')}
            onChange={(event: ILiveServiceContent) => {
              // TODO: move this to an async function expression
              if (event.rateAmount) {
                if (liveServiceContent?.rateToken) {
                  const token = allowedTokenList.find(
                    token => token.address === liveServiceContent.rateToken,
                  );

                  if (token) {
                    parseRateAmount(
                      event.rateAmount.toString(),
                      liveServiceContent.rateToken,
                      token.decimals,
                    ).then(_parsedRateAmount => {
                      setLiveServiceContent({
                        ...liveServiceContent,
                        rateAmount: _parsedRateAmount.toString(),
                      });
                    });
                  }
                }
              } else {
                setLiveServiceContent({ ...liveServiceContent, ...event });
              }
            }}
          />
        </div>
        <div>
          <div className=' border border-gray-700 rounded-xl p-6 bg-endnight'>
            <p className='flex  px-6 items-center text-2xl font-medium tracking-wider mb-8 border-b w-full border-gray-700 md:px-8 '>
              Post your <span className='text-gray-100 ml-1'> First Gig </span>
            </p>
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

                <div className='flex flex-row gap-4 justify-between items-center border-t border-gray-700 pt-4'>
                  {liveServiceContent?.rateToken && liveServiceContent?.rateAmount && (
                    <p className='text-gray-300 font-bold line-clamp-1 max-w-[100px]'>
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
    </div>
  );
};

export default GigBoard;
