import { useContext } from 'react';
import MessagingContext from '../context/messging';

function ConnectButton() {
  const { handleRegisterToMessaging } = useContext(MessagingContext);

  return (
    <button
      className='text-primary bg-primary hover:opacity-70 px-5 py-2.5 rounded-xl text-md relative'
      onClick={() => handleRegisterToMessaging()}>
      connect messaging
    </button>
  );
}

export default ConnectButton;
