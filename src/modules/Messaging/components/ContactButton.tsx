import { useContext } from 'react';
import MessagingContext from '../context/messging';

function ContactButton({ userAddress, userHandle }: { userAddress: string; userHandle: string }) {
  const { handleMessageUser } = useContext(MessagingContext);

  return (
    <button
      className='text-zinc-600 bg-zinc-50 hover:bg-zinc-500 hover:text-white px-3 py-2 rounded text-sm'
      onClick={() => {
        handleMessageUser(userAddress);
      }}>
      Contact
    </button>
  );
}

export default ContactButton;
