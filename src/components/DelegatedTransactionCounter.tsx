import { useContext } from 'react';
import TalentLayerContext from '../context/talentLayer';
import { MAX_TRANSACTION_AMOUNT } from '../config';

const renderTxNumber = (sentEmailsNumber: number) => {
  if (sentEmailsNumber < 20)
    return <span className='text-xs text-green-500'>{sentEmailsNumber}</span>;
  if (sentEmailsNumber >= 20 && sentEmailsNumber < 40)
    return <span className='text-xs text-yellow-500'>{sentEmailsNumber}</span>;
  if (sentEmailsNumber >= 40 && sentEmailsNumber <= MAX_TRANSACTION_AMOUNT)
    return <span className='text-xs text-red-500'>{sentEmailsNumber}</span>;
};
const renderWaitPeriod = (lastTxTime: number) => {
  const oneWeekAgoMilliseconds = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).getTime();
  const differenceInMilliseconds = lastTxTime - oneWeekAgoMilliseconds;

  const days = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));

  return <span className='text-xs font-bold text-yellow-500'>{days}</span>;
};

const DelegatedTransactionCounter = () => {
  const { workerData, canUseDelegation } = useContext(TalentLayerContext);

  return (
    <>
      {canUseDelegation && workerData && (
        <>
          <p className='text-base-content mt-2'>
            <span className='text-xs'>Free Weekly Tx : </span>
            {renderTxNumber(workerData?.weeklyTransactionCounter)}
            <span className='text-xs'>/{MAX_TRANSACTION_AMOUNT}</span>
          </p>
          {workerData?.weeklyTransactionCounter === MAX_TRANSACTION_AMOUNT && (
            <>
              <p className='text-base-content text-xs'>Max tx reached, please wait</p>
              {workerData?.counterStartDate && renderWaitPeriod(workerData.counterStartDate)}
              <span className='text-xs'> days</span>
            </>
          )}
        </>
      )}
    </>
  );
};

export default DelegatedTransactionCounter;
