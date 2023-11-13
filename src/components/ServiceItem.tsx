import Link from 'next/link';
import { useChainId } from '../hooks/useChainId';
import { IService } from '../types';
import { renderTokenAmountFromConfig } from '../utils/conversion';
import { formatDaysAgo } from '../utils/dates';

function limitText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength - 3) + '...';
}

function ServiceItem({ service }: { service: IService }) {
  const chainId = useChainId();
  const createdAt = Number(service.createdAt) * 1000;
  const daysAgo = formatDaysAgo(createdAt);

  return (
    <div className='relative flex flex-row gap-2 rounded-2xl p-6 border border-3 border-gray-300 text-base-content bg-transparent'>
      <div className='flex flex-col items-top justify-between gap-4 w-full'>
        <div className='flex items-center justify-between gap-4'>
          <p className='font-bold break-all'>{service.description?.title}</p>
          <div className='flex flex-row justify-end items-center'>
            <button className='bg-info px-3 py-1.5 text-info text-xs rounded-full' disabled>
              Gig
            </button>
          </div>
        </div>
        {service.description?.about && (
          <div className='flex flex-col justify-start items-start gap-4'>
            <div className='flex items-center justify-start'>
              <div className='flex flex-col'>
                <p className='text-sm break-all'>{limitText(service.description?.about, 200)}</p>
              </div>
            </div>
          </div>
        )}

        <div className='flex flex-wrap flew-row justify-between items-center pt-2'>
          <div className='flex flex-wrap gap-3 items-center'>
            <p className='text-sm'>
              🗓️ <span className='text-base-content-50'>{daysAgo}</span>
            </p>
            <p>
              <span className='w-[6px] h-[6px] rounded-full bg-base-300 block'></span>
            </p>
            {service.description?.rateToken && service.description?.rateAmount && (
              <p className='text-sm max-w-[100px]'>
                💰{' '}
                <span className='text-base-content-50'>
                  {renderTokenAmountFromConfig(
                    chainId,
                    service.description.rateToken,
                    service.description.rateAmount,
                  )}
                </span>
              </p>
            )}
          </div>
          <Link
            className='text-primary text-center bg-primary hover:opacity-70 px-5 py-2.5 rounded-xl text-md w-full sm:w-auto mt-4 sm:mt-0'
            href={`/work/${service.id}`}>
            view post
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ServiceItem;
