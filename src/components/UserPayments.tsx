import Link from 'next/link';
import usePaymentsForUser from '../hooks/usePaymentsForUser';
import { IUser } from '../types';
import { renderTokenAmount } from '../utils/conversion';
import { formatStringCompleteDate } from '../utils/dates';

function UserPayments({ user }: { user: IUser }) {
  const { payments } = usePaymentsForUser(user.id, 10);

  if (payments.length === 0) {
    return null;
  }
  return (
    <>
      <h2 className='pb-4 text-base-content  break-all flex justify-between items-center'>
        <span className='flex-1 font-bold'>Your last incomes</span>

        <Link
          className='hover:opacity-70 text-primary bg-primary px-3 py-2 text-sm  rounded-xl'
          href={`/profiles/incomes`}>
          Sell all
        </Link>
      </h2>
      <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4'>
        {payments.map((payment, i) => {
          return (
            <Link
              href={`/work/${payment.service.id}`}
              className='flex items-center p-4 bg-base-100 rounded-xl border border-info'
              key={i}>
              <div className='flex flex-shrink-0 items-center justify-center bg-success h-16 w-16 rounded'>
                <svg
                  className='w-6 h-6 fill-current text-success'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'>
                  <path
                    fillRule='evenodd'
                    d='M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              <div className='flex-grow flex flex-col ml-4'>
                <span className='text-xl font-bold'>
                  {renderTokenAmount(payment.rateToken, payment.amount)}
                </span>
                <div className='flex items-center justify-between'>
                  <span className='text-base-content opacity-50'>
                    received the {formatStringCompleteDate(payment.createdAt)}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default UserPayments;
