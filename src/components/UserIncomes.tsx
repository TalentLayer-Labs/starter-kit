import { useState } from 'react';
import Loading from './Loading';
import { renderTokenAmount } from '../utils/conversion';
import { formatStringCompleteDate } from '../utils/dates';
import usePaymentsForUser from '../hooks/usePaymentsForUser';
import { useNetwork } from 'wagmi';
import { mkConfig, generateCsv, download } from "export-to-csv";

function UserIncomes({ id }: { id: string }) {
  const ROW_SIZE = 50;
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const network = useNetwork();

  const { payments, hasMoreData, loading, loadMore } = usePaymentsForUser(
    id,
    ROW_SIZE,
    startDate,
    endDate,
  );

  const csvConfig = mkConfig({ useKeysAsHeaders: true,filename: "TL-Income" });
  
  const handleExportToCsv = () => {
    const csvContent = generateCsv(csvConfig)(payments.map(payment => ({
      'Amount': renderTokenAmount(payment.rateToken, payment.amount),
      'Date': formatStringCompleteDate(payment.createdAt),
      'Token': payment.rateToken.symbol,
      'Service': `Service n°${payment.service.id}`,
      'Transaction Information': `${network.chain?.blockExplorers?.default.url}/tx/${payment.transactionHash}`
    })));
    
    download(csvConfig)(csvContent);
  };


  
  return (
    <>
      <div className='pb-10'>
        <label className='font-bold' htmlFor='start'>
          Start date:{' '}
        </label>
        <input
          type='date'
          id='start'
          name='start'
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
        />
        <span className='px-4'>
          <label className='font-bold' htmlFor='end'>
            End date:{' '}
          </label>
          <input
            type='date'
            id='end'
            name='end'
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
          />
        </span>
        <button
          type='button'
          className='ml-4 px-3 py-1 border border-gray-400 rounded-xl text-gray-600 hover:bg-gray-200'
          onClick={() => {
            setStartDate('');
            setEndDate('');
          }}>
          Clear Dates
        </button>
      </div>
      {!payments || payments.length === 0 ? (
        <p className='text-2xl font-medium tracking-wider mb-8'>No incomes found</p>
      ) : (
        <div>
          <div className=''>
            <table className='p-4 border border-redpraha w-full table-fixed'>
              <thead>
                <tr>
                  <th className='border border-redpraha p-2'>Amount</th>
                  <th className='border border-redpraha p-2'>Date</th>
                  <th className='border border-redpraha p-2'>Token</th>
                  <th className='border border-redpraha p-2'>Service</th>
                  <th className='border border-redpraha p-2'>Transaction information</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, i) => {
                  return (
                    <tr key={i}>
                      <td className='border border-redpraha p-2 font-bold'>
                        {renderTokenAmount(payment.rateToken, payment.amount)}
                      </td>
                      <td className='border border-redpraha p-2 text-gray-500'>
                        {formatStringCompleteDate(payment.createdAt)}
                      </td>
                      <td className='border border-redpraha p-2 text-gray-500'>
                        {payment.rateToken.symbol}
                      </td>
                      <td className='border border-redpraha p-2 text-blue-500'>
                        <a target='_blank' href={`/dashboard/services/${payment.service.id}`}>
                          Service n°{payment.service.id}{' '}
                        </a>
                      </td>
                      <td className='border border-redpraha p-2 text-blue-500'>
                        {network.chain?.id === 137 || network.chain?.id === 80001 ? (
                          <a
                            target='_blank'
                            href={`${network.chain?.blockExplorers?.default.url}/tx/${payment.transactionHash}`}>
                            Tx
                          </a>
                        ) : null}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className='flex justify-between mt-4'>
            {payments.length > 0 && hasMoreData && !loading && (
              <div className='flex justify-center items-center gap-10 flex-col pb-5'>
                <button
                  type='submit'
                  className={`px-5 py-2 mt-5 content-center border border-zinc-600 rounded-full text-zinc-600 
              hover:text-white hover:bg-midnight
            `}
                  disabled={!hasMoreData}
                  onClick={() => loadMore()}>
                  Load More
                </button>
              </div>
            )}
            {loading && (
              <div className='flex justify-center items-center gap-10 flex-col pb-5 mt-5'>
                <Loading />
              </div>
            )}
          </div>
        </div>
      )}
      {payments && payments.length > 0 && (
        <div className='pb-5'>
          <button
            type='button'
            className='px-5 py-2 border border-zinc-600 rounded-full text-zinc-600 hover:text-white hover:bg-midnight'
            onClick={handleExportToCsv}>
            Export to CSV
          </button>
        </div>
      )}
    </>
  );
}

export default UserIncomes;
