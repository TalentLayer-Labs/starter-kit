import Link from 'next/link';
import { useChainId } from '../hooks/useChainId';
import { IService } from '../types';
import { renderTokenAmountFromConfig } from '../utils/conversion';
import { formatDate } from '../utils/dates';

function ServiceItem({ service }: { service: IService }) {
  const chainId = useChainId();

  return (
    <div className='flex flex-row gap-2 rounded-xl p-4 border border-info text-base-content bg-base-100'>
      <div className='flex flex-col items-top justify-between gap-4 w-full'>
        <div className='flex flex-col justify-start items-start gap-4'>
          <div className='flex items-center justify-start'>
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
            <div className='flex flex-col'>
              <p className='font-medium break-all'>{service.description?.title}</p>
              <p className='text-xs text-base-content'>
                created by {service.buyer.handle} the {formatDate(Number(service.createdAt) * 1000)}
              </p>
            </div>
          </div>
        </div>

        <div className='flex flex-row gap-4 justify-between items-center border-t border-info pt-4'>
          {service.description?.rateToken && service.description?.rateAmount && (
            <p className='text-base-content font-bold line-clamp-1 max-w-[100px]'>
              {renderTokenAmountFromConfig(
                chainId,
                service.description.rateToken,
                service.description.rateAmount,
              )}
            </p>
          )}
          <Link
            className='text-primary bg-primary hover:opacity-70 px-5 py-2.5 rounded-xl text-md relative'
            href={`/work/${service.id}`}>
            Show details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ServiceItem;
