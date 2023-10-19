import { useContext } from 'react';
import MessagingContext from '../context/messging';

function ContactButton({ userAddress, userHandle }: { userAddress: string; userHandle: string }) {
  const { handleMessageUser } = useContext(MessagingContext);

  return (
    <button
      className='text-zinc-600 bg-white hover:bg-zinc-200 hover:text-white px-5 py-2.5 rounded-xl text-sm'
      onClick={() => {
        handleMessageUser(userAddress);
      }}>
      Contact
    </button>
  );
}

export default ContactButton;
