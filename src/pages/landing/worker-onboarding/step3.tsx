import WorkerOnboardSuccess from '../../../components/WorkerOnboardSuccess';
import { useContext, useState } from 'react';
import TalentLayerContext from '../../../context/talentLayer';
import { useChainId, useWalletClient } from 'wagmi';
import OnboardingSteps from '../../../components/OnboardingSteps';
import { verifyAccount } from '../../../modules/BuilderPlace/request';
import { showErrorTransactionToast } from '../../../utils/toast';
import Loading from '../../../components/Loading';

function onboardingStep3() {
  const { account, workerProfile, loading, refreshWorkerProfile } = useContext(TalentLayerContext);
  const chainId = useChainId();
  const { data: walletClient } = useWalletClient({ chainId });
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSignMessage = async () => {
    if (walletClient && account?.address && workerProfile?.id) {
      try {
        setSubmitting(true);
        /**
         * @dev Sign message to prove ownership of the address
         */
        const signature = await walletClient.signMessage({
          account: account.address,
          message: workerProfile.id.toString(),
        });

        const resp = await verifyAccount(workerProfile.id.toString(), signature);

        if (resp.error) {
          throw new Error(resp.error);
        }
      } catch (error: any) {
        showErrorTransactionToast(error.message);
      } finally {
        setSubmitting(false);
        refreshWorkerProfile();
      }
    }
  };

  if (loading) {
    return (
      <>
        <OnboardingSteps currentStep={3} type='worker' />
        <div className='p-8 flex flex-col items-center'>
          <Loading />
        </div>
      </>
    );
  }

  return (
    <>
      {workerProfile?.status === 'VALIDATED' ? (
        <WorkerOnboardSuccess />
      ) : (
        <div>
          <OnboardingSteps currentStep={3} type='worker' />
          <div className='max-w-7xl mx-auto text-base-content sm:px-4 lg:px-0 py-20'>
            <div className='flex flex-col items-center justify-center gap-10'>
              <p className='text-5xl sm:text-7xl font-bold tracking-wider max-w-5xl text-center'>
                Almost there !
              </p>
              <p className='text-3xl sm:text-5xl font-medium tracking-wider max-w-5xl text-center'>
                Congrats on creating your profile!
              </p>
              <p className='text-xl sm:text-2xl text-base-content opacity-50 text-center'>
                One last step to validate your account, verify your eth address by signing a
                transaction.
              </p>
              <button
                disabled={isSubmitting}
                className={`${
                  isSubmitting && 'opacity-50'
                } bg-pink-500 text-content rounded-lg px-4 py-2 mt-4 text-lg text-white font-medium`}
                onClick={() => handleSignMessage()}>
                {isSubmitting && (
                  <svg
                    role='status'
                    className='inline mr-2 w-4 h-4 text-base-content animate-spin '
                    viewBox='0 0 100 101'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                      fill='currentColor'
                    />
                    <path
                      d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                      fill='#11112a'
                    />
                  </svg>
                )}
                {isSubmitting ? 'Loading...' : 'Sign message'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default onboardingStep3;
