import useSentEmailAmount from '../../hooks/useSentEmailAmount';

const emailCounter = () => {
  const { sentEmailsNumber } = useSentEmailAmount();
  console.log('sentEmailsNumber', sentEmailsNumber);
  return (
    <>
      <p>
        <span className='text-s text-gray-200'>Sent Emails : </span>
        <span className='text-xl font-bold text-gray-500'>{sentEmailsNumber}</span>
        /500
      </p>
    </>
  );
};

export default emailCounter;
