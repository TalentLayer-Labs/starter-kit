import { useContext } from 'react';
import TalentLayerContext from '../context/talentLayer';
import { MAX_TRANSACTION_AMOUNT } from '../config';

const renderTxNumber = (sentTransactionsNumber: number) => {
  if (sentTransactionsNumber < 20)
    return <span className='text-xs text-green-500'>{sentTransactionsNumber}</span>;
  if (sentTransactionsNumber >= 20 && sentTransactionsNumber < 40)
    return <span className='text-xs text-yellow-500'>{sentTransactionsNumber}</span>;
  if (sentTransactionsNumber >= 40 && sentTransactionsNumber <= MAX_TRANSACTION_AMOUNT)
    return <span className='text-xs text-red-500'>{sentTransactionsNumber}</span>;
};

const getWaitingPeriodInDays = (lastTxTime: number) => {
  const oneWeekAgoMilliseconds = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).getTime();
  const differenceInMilliseconds = lastTxTime - oneWeekAgoMilliseconds;

  return Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));
};

const renderWaitPeriod = (lastTxTime: number) => {
  const days = getWaitingPeriodInDays(lastTxTime);

  return <span className='text-xs font-bold text-yellow-500'>{days > 0 ? days : 0}</span>;
};

const DelegatedTransactionCounter = () => {
  const { workerProfile, user } = useContext(TalentLayerContext);

  /**
   * @dev: Checks whether next transaction will reset the counter if max free tx amount reached.
   */
  const resetTxAmount =
    (workerProfile?.weeklyTransactionCounter || 0) === MAX_TRANSACTION_AMOUNT &&
    !!workerProfile?.counterStartDate &&
    getWaitingPeriodInDays(workerProfile.counterStartDate) < 0;

  const userHasDelegatedToPlatform =
    user?.delegates &&
    process.env.NEXT_PUBLIC_DELEGATE_ADDRESS &&
    user.delegates.indexOf(process.env.NEXT_PUBLIC_DELEGATE_ADDRESS.toLowerCase()) !== -1;

  return (
    <>
      {userHasDelegatedToPlatform && workerProfile && (
        <>
          <p className='text-base-content mt-2'>
            <span className='text-xs'>Free Weekly Tx : </span>
            {/*If next transaction will reset counter, display zero*/}
            {renderTxNumber(resetTxAmount ? 0 : workerProfile?.weeklyTransactionCounter || 0)}
            <span className='text-xs'>/{MAX_TRANSACTION_AMOUNT}</span>
          </p>
          {(workerProfile?.weeklyTransactionCounter || 0) === MAX_TRANSACTION_AMOUNT &&
            workerProfile?.counterStartDate &&
            getWaitingPeriodInDays(workerProfile.counterStartDate) > 0 && (
              <>
                <p className='text-base-content text-xs'>Max tx reached, please wait</p>
                {workerProfile?.counterStartDate &&
                  renderWaitPeriod(workerProfile.counterStartDate)}
                <span className='text-xs'> days</span>
              </>
            )}
        </>
      )}
    </>
  );
};

export default DelegatedTransactionCounter;
