import { useContext, useEffect, useState } from 'react';
import { usePublicClient, useWalletClient } from 'wagmi';
import { toggleDelegation } from '../../contracts/toggleDelegation';
import TalentLayerContext from '../../context/talentLayer';
import { useChainId } from '../../hooks/useChainId';
import { useConfig } from '../../hooks/useConfig';

function DelegateModal() {
  const chainId = useChainId();
  const [show, setShow] = useState(false);
  const config = useConfig();
  const [hasPlatformAsDelegate, setHasPlatformAsDelegate] = useState(false);
  const { data: walletClient } = useWalletClient({ chainId });
  const publicClient = usePublicClient({ chainId });
  const { user, refreshData } = useContext(TalentLayerContext);
  const delegateAddress = process.env.NEXT_PUBLIC_DELEGATE_ADDRESS as string;

  if (!user) {
    return null;
  }

  const checkDelegateState = async () => {
    if (user?.delegates?.indexOf(delegateAddress.toLowerCase()) != -1) {
      setHasPlatformAsDelegate(true);
    } else {
      setHasPlatformAsDelegate(false);
    }
  };

  useEffect(() => {
    checkDelegateState();
  }, [user, show]);

  const onSubmit = async (validateState: boolean) => {
    if (walletClient && publicClient && user) {
      await toggleDelegation(
        chainId,
        user.id,
        config,
        delegateAddress,
        publicClient,
        walletClient,
        validateState,
      );
    }
    setShow(false);
    await refreshData();
  };

  return (
    <>
      {process.env.NEXT_PUBLIC_ACTIVATE_DELEGATE === 'true' && hasPlatformAsDelegate && (
        <button
          onClick={() => setShow(true)}
          className='block text-info bg-error hover:bg-info hover:text-base-content rounded-xl px-5 py-2.5 text-center'
          type='button'
          data-modal-toggle='defaultModal'>
          Deactivate delegation
        </button>
      )}

      <div
        className={`${
          !show ? 'hidden' : ''
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal h-full bg-black/75 flex flex-col items-center justify-center`}>
        <div className='relative p-4 w-full max-w-2xl h-auto'>
          <div className='relative bg-base-300 rounded-xl shadow '>
            <div className='flex justify-between items-start p-4 rounded-t border-b border-info'>
              <h3 className='text-xl font-semibold text-base-content '>
                Delegate activation information
              </h3>
              {/* close button */}
              <button
                onClick={() => setShow(false)}
                type='button'
                className='text-base-content bg-transparent hover:bg-base-200 hover:text-base-content rounded-xl text-sm p-1.5 ml-auto inline-flex items-center '
                data-modal-toggle='defaultModal'>
                <svg
                  className='w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    fillRule='evenodd'
                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                    clipRule='evenodd'></path>
                </svg>
                <span className='sr-only'>Close modal</span>
              </button>
            </div>
            <div className='p-6 space-y-6'>
              <div className='flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-base-200 space-y-6 text-base-content'>
                <div className='flex flex-row'>
                  <h3 className='font-semibold text-base-content'>Delegation state: </h3>
                  {hasPlatformAsDelegate ? (
                    <p className='text-alone-success pl-2'> is active</p>
                  ) : (
                    <p className='text-alone-error pl-2'> is inactive</p>
                  )}
                </div>
                <p>After activating the delegation, all fees will be delegated to the platform.</p>
                <p>
                  By confirming it with the Validate delegation button, you agree to delegate the
                  fees payment for interactions such as service creation and proposal creation.
                </p>
                <p>You can cancel it at any time</p>
              </div>
            </div>
            <div className='flex items-center p-6 space-x-2 rounded-b border-t border-info '>
              {hasPlatformAsDelegate ? (
                <button
                  onClick={() => onSubmit(false)}
                  type='button'
                  className='hover:text-info hover:bg-error bg-error text-base-content rounded-xl px-5 py-2.5 text-center'>
                  Cancel Delegation
                </button>
              ) : (
                <button
                  onClick={() => onSubmit(true)}
                  type='button'
                  className='hover:text-success hover:bg-success bg-info text-base-content rounded-xl px-5 py-2.5 text-center'>
                  Validate Delegation
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DelegateModal;
