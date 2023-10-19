import useWeb3MailStats from '../hooks/useWeb3MailStats';

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
  const { web3MailStats } = useWeb3MailStats();
  return (
    <>
      <p>
        <span className='text-s text-gray-200'>Sent Emails : </span>
        {renderEmailNumber(web3MailStats.emailAmount)}
        <span className='text-s text-gray-200'>
          /500 {web3MailStats.emailAmount >= 500 ? '🥳 🦝' : ''}
        </span>
      </p>
    </>
  );
};

export default emailCounter;
