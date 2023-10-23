import { useContext } from 'react';
import MessagingContext from '../context/messging';

function ContactButton({ userAddress, userHandle }: { userAddress: string; userHandle: string }) {
  const { handleMessageUser } = useContext(MessagingContext);

  return (
    <button
      className='text-stone-800 bg-stone-200 hover:bg-stone-300 px-5 py-2.5 rounded-xl text-sm-xl relative'
      onClick={() => {
        handleMessageUser(userAddress);
      }}>
      Contact
    </button>
  );
}

export default ContactButton;
