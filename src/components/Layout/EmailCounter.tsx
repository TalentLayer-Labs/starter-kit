import useSentEmailAmount from '../../hooks/useSentEmailAmount';

const renderEmailNumber = (sentEmailsNumber: number) => {
  if (sentEmailsNumber < 150)
    return <span className='text-xl font-bold text-red-500'>{sentEmailsNumber}</span>;
  if (sentEmailsNumber >= 150 && sentEmailsNumber < 350)
    return <span className='text-xl font-bold text-yellow-500'>{sentEmailsNumber}</span>;
  if (sentEmailsNumber >= 350 && sentEmailsNumber < 499)
    return <span className='text-xl font-bold text-green-500'>{sentEmailsNumber}</span>;
  if (sentEmailsNumber >= 500)
    return <span className='text-xl font-bold text-green-500'>{sentEmailsNumber}</span>;
};

const emailCounter = () => {
  const { sentEmailsNumber } = useSentEmailAmount();
  return (
    <>
      <p>
        <span className='text-s text-gray-200'>Sent Emails : </span>
        {renderEmailNumber(sentEmailsNumber)}
        <span className='text-s text-gray-200'>/500 {sentEmailsNumber >= 500 ? '🥳' : ''}</span>
      </p>
    </>
  );
};

export default emailCounter;
