import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/outline';
import { useCallback, useContext, useState } from 'react';
import Web3MailContext from '../context/web3mail';
import { showErrorTransactionToast } from '../../../utils/toast';
import { toast } from 'react-toastify';

function Web3mailRevokeButton() {
  const [isHovered, setIsHovered] = useState(false);
  const { revokeAccess } = useContext(Web3MailContext);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleClick = async () => {
    try {
      const promise = revokeAccess();
      await toast.promise(promise, {
        pending: 'Pending transaction',
        success: 'Access revoked succefully',
        error: 'An error occurred while revoking your access',
      });
    } catch (error) {
      showErrorTransactionToast(error);
    }
  };

  return (
    <a
      href='#'
      className={`ml-3 px-3 font-sans transition-shadow duration-300 py-0.5 text-xs rounded-xl  border bg-transparent font-medium flex items-center
                    ${
                      isHovered
                        ? 'bg-error bg-opacity-5 border-error-500 text-error'
                        : 'bg-success bg-opacity-5 border-success-500 text-success'
                    }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}>
      {isHovered ? (
        <span className='flex'>
          <LockOpenIcon width={16} height={16} className='mr-1' />
          Revoke access
        </span>
      ) : (
        <LockClosedIcon width={16} height={16} />
      )}
    </a>
  );
}
export default Web3mailRevokeButton;
