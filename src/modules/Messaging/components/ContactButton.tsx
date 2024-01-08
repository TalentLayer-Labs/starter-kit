import { useContext } from 'react';
import MessagingContext from '../context/messging';

function ContactButton({ userAddress, userHandle }: { userAddress: string; userHandle: string }) {
  const { handleMessageUser } = useContext(MessagingContext);

  return (
    <button
      className='text-info bg-info hover:opacity-70 px-5 py-2.5 rounded-xl text-md'
      onClick={() => {
        handleMessageUser(userAddress);
      }}>
      Contact
    </button>
  );
}

export default ContactButton;
