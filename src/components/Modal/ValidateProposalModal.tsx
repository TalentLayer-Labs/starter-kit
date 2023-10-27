import { Check, X } from 'heroicons-react';
import { useState } from 'react';
import { useBalance, usePublicClient, useWalletClient } from 'wagmi';
import { FEE_RATE_DIVIDER } from '../../config';
import { validateProposal } from '../../contracts/acceptProposal';
import useFees from '../../hooks/useFees';
import ContactButton from '../../modules/Messaging/components/ContactButton';
import { IAccount, IProposal } from '../../types';
import { renderTokenAmount } from '../../utils/conversion';
import Step from '../Step';
import { useChainId } from '../../hooks/useChainId';
import useTalentLayerClient from '../../hooks/useTalentLayerClient';
import { ZERO_ADDRESS } from '../../utils/constant';

function ValidateProposalModal({ proposal, account }: { proposal: IProposal; account: IAccount }) {
  const chainId = useChainId();
  const { data: walletClient } = useWalletClient({
    chainId,
  });
  const publicClient = usePublicClient({ chainId });
  const [show, setShow] = useState(false);
  const { data: ethBalance } = useBalance({ address: account.address });
  const isProposalUseEth: boolean = proposal.rateToken.address === ZERO_ADDRESS;
  const { data: tokenBalance } = useBalance({
    address: account.address,
    enabled: !isProposalUseEth,
    token: proposal.rateToken.address,
  });

  const talentLayerClient = useTalentLayerClient();

  const originValidatedProposalPlatformId = proposal.platform.id;
  const originServicePlatformId = proposal.service.platform.id;

  const { protocolEscrowFeeRate, originValidatedProposalFeeRate, originServiceFeeRate } = useFees(
    originServicePlatformId,
    originValidatedProposalPlatformId,
  );

  const jobRateAmount = BigInt(proposal.rateAmount);
  const protocolFee = (jobRateAmount * BigInt(protocolEscrowFeeRate)) / BigInt(FEE_RATE_DIVIDER);
  const originServiceFee =
    (jobRateAmount * BigInt(originServiceFeeRate)) / BigInt(FEE_RATE_DIVIDER);
  const originValidatedProposalFee =
    (jobRateAmount * BigInt(originValidatedProposalFeeRate)) / BigInt(FEE_RATE_DIVIDER);
  const totalAmount = jobRateAmount + originServiceFee + originValidatedProposalFee + protocolFee;

  const onSubmit = async () => {
    if (!walletClient || !publicClient || !talentLayerClient) {
      return;
    }

    await validateProposal(
      talentLayerClient,
      publicClient,
      proposal.service.id,
      proposal.id,
      proposal.rateToken.address,
    );
    setShow(false);
  };

  const hasEnoughBalance = () => {
    if (isProposalUseEth) {
      if (!ethBalance) return;
      return ethBalance.value >= totalAmount;
    } else {
      if (!tokenBalance) return;
      return tokenBalance.value >= totalAmount;
    }
  };

  return (
    <>
      <button
        onClick={() => setShow(true)}
        className='block text-success bg-success hover:bg-info hover:text-base-content rounded-xl px-5 py-2.5 text-center'
        type='button'
        data-modal-toggle='defaultModal'>
        Validate
      </button>

      <div
        className={`${
          !show ? 'hidden' : ''
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal h-full bg-black/75 flex flex-col items-center justify-center`}>
        <div className='relative p-4 w-full max-w-2xl h-auto'>
          <div className='relative bg-base-300 rounded-xl shadow '>
            <div className='flex justify-between items-start p-4 rounded-t border-b border-info'>
              <h3 className='text-xl font-semibold text-base-content '>Proposal validation</h3>
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
              {!isProposalUseEth && (
                <nav className='mb-8'>
                  <ol
                    role='list'
                    className='divide-y divide-gray-200 rounded-xl border border-info md:flex md:divide-y-0'>
                    <Step title='Allow spending' status={'inprogress'} order={1} />
                    <Step
                      title='Send money to escrow and validate the proposal'
                      status={'todo'}
                      order={2}
                      isLast={true}
                    />
                  </ol>
                </nav>
              )}
              <div className='flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-base-200 space-y-6 text-base-content'>
                <h3 className='text-xl font-semibold leading-5 text-base-content'>Summary</h3>
                <div className='flex justify-center items-center w-full space-y-4 flex-col border-info border-b pb-4'>
                  <div className='flex justify-between w-full'>
                    <p className='text-base-content leading-4 text-base-content'>Rate</p>
                    <p className='text-base-content  leading-4 text-base-content'>
                      {renderTokenAmount(proposal.rateToken, proposal.rateAmount)}
                    </p>
                  </div>
                  <div className='flex justify-between items-center w-full'>
                    <p className='text-base-content leading-4 text-base-content'>
                      Fees from the marketplace originating the service{' '}
                      <span className='bg-base-200 p-1 text-xs font-medium leading-3 text-base-content opacity-50'>
                        {((Number(originServiceFeeRate) / FEE_RATE_DIVIDER) * 100).toString()} %
                      </span>
                    </p>
                    <p className='text-base-content  leading-4 text-base-content'>
                      +{renderTokenAmount(proposal.rateToken, originServiceFee.toString())}
                    </p>
                  </div>
                  <div className='flex justify-between items-center w-full'>
                    <p className='text-base-content leading-4 text-base-content'>
                      Fees from the marketplace validating the proposal{' '}
                      <span className='bg-base-200 p-1 text-xs font-medium leading-3 text-base-content opacity-50'>
                        {(
                          (Number(originValidatedProposalFeeRate) / FEE_RATE_DIVIDER) *
                          100
                        ).toString()}{' '}
                        %
                      </span>
                    </p>
                    <p className='text-base-content  leading-4 text-base-content'>
                      +
                      {renderTokenAmount(proposal.rateToken, originValidatedProposalFee.toString())}
                    </p>
                  </div>
                  <div className='flex justify-between items-center w-full'>
                    <p className='text-base-content leading-4 text-base-content'>
                      Protocol fees{' '}
                      <span className='bg-base-200 p-1 text-xs font-medium leading-3 text-base-content opacity-50'>
                        {((Number(protocolEscrowFeeRate) / FEE_RATE_DIVIDER) * 100).toString()} %
                      </span>
                    </p>
                    <p className='text-base-content  leading-4 text-base-content'>
                      +{renderTokenAmount(proposal.rateToken, protocolFee.toString())}
                    </p>
                  </div>
                </div>
                <div className='flex justify-between items-center w-full'>
                  <p className='text-base-content font-semibold leading-4 text-base-content'>
                    Total
                  </p>
                  <p className='text-base-content  font-semibold leading-4 text-base-content'>
                    {renderTokenAmount(proposal.rateToken, totalAmount.toString())}
                  </p>
                </div>
              </div>

              <div className='flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-base-200 space-y-6 text-base-content'>
                <h3 className='text-xl font-semibold leading-5 text-base-content'>Your balances</h3>
                <div className='flex justify-center items-center w-full space-y-4 flex-col'>
                  {!isProposalUseEth && tokenBalance && (
                    <div className='flex justify-between w-full'>
                      <p className='text-base-content leading-4 text-base-content'>
                        {tokenBalance.formatted} {tokenBalance.symbol}
                      </p>
                      <p className=''>
                        <span
                          className={`block ${
                            hasEnoughBalance() ? 'bg-info' : 'bg-error'
                          } p-1 text-xs font-medium text-base-content rounded-full`}>
                          {hasEnoughBalance() ? (
                            <Check className='w-4 h-4' />
                          ) : (
                            <X className='w-4 h-4' />
                          )}
                        </span>
                      </p>
                    </div>
                  )}
                  {isProposalUseEth && ethBalance && (
                    <div className='flex justify-between w-full'>
                      <p className='text-base-content leading-4 text-base-content'>
                        {ethBalance.formatted} ETH
                      </p>
                      <p className=''>
                        <span
                          className={`block ${
                            (isProposalUseEth && hasEnoughBalance()) || ethBalance.value > 0
                              ? 'bg-info'
                              : 'bg-error'
                          } p-1 text-xs font-medium text-base-content rounded-full`}>
                          {(isProposalUseEth && hasEnoughBalance()) || ethBalance.value > 0 ? (
                            <Check className='w-4 h-4' />
                          ) : (
                            <X className='w-4 h-4' />
                          )}
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className='flex items-center p-6 space-x-2 rounded-b border-t border-info '>
              {hasEnoughBalance() ? (
                <button
                  onClick={() => onSubmit()}
                  type='button'
                  className='hover:text-success hover:bg-success bg-info text-base-content rounded-xl px-5 py-2.5 text-center'>
                  {isProposalUseEth ? 'Validate' : 'Allow spending'}
                </button>
              ) : (
                <button
                  disabled
                  type='button'
                  className='hover:text-red-600 hover:bg-error bg-error text-base-content rounded-xl px-5 py-2.5 text-center'>
                  Validate
                </button>
              )}
              <button
                onClick={() => setShow(false)}
                type='button'
                className='text-base-content bg-base-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-xl border text-sm font-medium px-5 py-2.5 hover:text-base-content focus:z-10 '>
                Decline
              </button>
              <ContactButton
                userAddress={proposal.seller.address}
                userHandle={proposal.seller.handle}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ValidateProposalModal;
