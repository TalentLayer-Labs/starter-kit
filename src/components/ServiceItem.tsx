import Link from 'next/link';
import { useChainId } from '../hooks/useChainId';
import { IService } from '../types';
import { renderTokenAmountFromConfig } from '../utils/conversion';
import { formatDaysAgo } from '../utils/dates';

function ServiceItem({ service }: { service: IService }) {
  const chainId = useChainId();
  const createdAt = Number(service.createdAt) * 1000;
  const daysAgo = formatDaysAgo(createdAt);

  return (
    <div className='relative flex flex-row gap-2 rounded-xl p-4 border border-3 border-gray-300 text-base-content bg-transparent'>
      <div className='flex flex-col items-top justify-between gap-4 w-full'>
        <div className='flex items-center justify-between gap-4'>
          <p className='font-bold break-all'>{service.description?.title}</p>
          <div className='flex flex-row justify-end items-center'>
            <button
              className='bg-pink-300 px-4 py-2 text-black border border-2 border-pink-400 text-sm rounded-full'
              disabled>
              Gig
            </button>
          </div>
        </div>
        <div className='flex flex-col justify-start items-start gap-4'>
          <div className='flex items-center justify-start'>
            <div className='flex flex-col'>
              <p className='font-medium break-all'>{service.description?.about}</p>
            </div>
          </div>
        </div>

        <div className='flex flex-col lg:flex-row sm:flex-col gap-5 justify-between items-center pt-4'>
          <div className='flex flex-col lg:flex-row sm:flex-col gap-5 sm:gap-5 lg:gap-10 items-center'>
            <p className='text-s text-base-content'>🗓️ {daysAgo}</p>
            {service.description?.rateToken && service.description?.rateAmount && (
              <p className='text-base-content text-s max-w-[100px] ml-10 mr-10'>
                💰{' '}
                {renderTokenAmountFromConfig(
                  chainId,
                  service.description.rateToken,
                  service.description.rateAmount,
                )}
              </p>
            )}
            <span className='flex justify-center items-center'>
              <img
                src={
                  service?.buyer?.description?.image_url ||
                  `/images/default-avatar-${Number(service.buyer.id) % 9}.jpeg`
                }
                className='w-10 mr-4 rounded-full'
                width={50}
                height={50}
                alt='default avatar'
              />
              <p className='text-s text-base-content'>{service.buyer.handle}</p>
            </span>
          </div>
          <Link
            className='text-white bg-primary hover:opacity-70 px-5 py-2.5 rounded-xl text-md'
            href={`/work/${service.id}`}>
            View Post
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ServiceItem;
