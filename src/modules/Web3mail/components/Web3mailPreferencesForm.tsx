import { LockClosedIcon } from '@heroicons/react/24/outline';
import { useWeb3Modal } from '@web3modal/react';
import { Field, Form, Formik } from 'formik';
import { useContext } from 'react';
import { useProvider, useSigner } from 'wagmi';
import * as Yup from 'yup';
import SubmitButton from '../../../components/Form/SubmitButton';
import { Toogle } from '../../../components/Form/Toggle';
import Loading from '../../../components/Loading';
import TalentLayerContext from '../../../context/talentLayer';
import { useChainId } from '../../../hooks/useChainId';
import { showErrorTransactionToast } from '../../../utils/toast';
import Web3mailCard from './Web3mailCard';
import useUserById from '../../../hooks/useUserById';
import { IWeb3mailPreferences } from '../../../types';

function Web3mailPreferencesForm() {
  const chainId = useChainId();
  const { open: openConnectModal } = useWeb3Modal();
  const { user } = useContext(TalentLayerContext);
  const provider = useProvider({ chainId });
  const { data: signer } = useSigner({
    chainId,
  });
  const userDescription = user?.id ? useUserById(user?.id)?.description : null;

  if (!user?.id) {
    return <Loading />;
  }

  const initialValues: IWeb3mailPreferences = {
    activeOnNewService: userDescription?.web3mail_preferences?.activeOnNewService || true,
    activeOnNewProposal: userDescription?.web3mail_preferences?.activeOnNewProposal || true,
    activeOnProposalValidated:
      userDescription?.web3mail_preferences?.activeOnProposalValidated || true,
    activeOnFundRelease: userDescription?.web3mail_preferences?.activeOnFundRelease || true,
    activeOnReview: userDescription?.web3mail_preferences?.activeOnReview || true,
    activeOnPlatformMarketing:
      userDescription?.web3mail_preferences?.activeOnPlatformMarketing || true,
  };

  const onSubmit = async (
    values: IWeb3mailPreferences,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    if (user && provider && signer) {
      try {
        console.log('Web3mailPreferencesForm ----', { values });
        setSubmitting(false);
      } catch (error) {
        showErrorTransactionToast(error);
      }
    } else {
      openConnectModal();
    }
  };

  return (
    <>
      <Formik initialValues={initialValues} enableReinitialize={true} onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <div className='grid grid-cols-1 gap-6'>
              <Web3mailCard />

              <div className='border-b border-gray-700 pb-6'>
                <label className='block'>
                  <div className='mb-2 ml-0.5'>
                    <div className='flex justify-between'>
                      <div>
                        <p className='font-heading text-base font-medium leading-none'>
                          Your email is protected
                        </p>
                        <p className='font-sans text-xs font-normal leading-normal text-gray-400 mt-0.5'>
                          It allow you to configure your preferences to be notified every time an
                          important action happened.
                        </p>
                      </div>
                      <span className='ml-3 px-3 font-sans transition-shadow duration-300 py-0.5 text-xs rounded-xl bg-green-100 bg-opacity-5 border-green-500 text-green-500 border bg-transparent font-medium flex items-center'>
                        <LockClosedIcon width={16} height={16} />
                      </span>
                    </div>
                  </div>
                  <Field
                    type='text'
                    id='email'
                    name='email'
                    className='cursor-not-allowed mt-1 mb-1 block w-full rounded-xl border border-gray-700 bg-midnight shadow-sm focus:ring-opacity-50'
                    placeholder='**********'
                    readOnly
                    disabled
                  />
                </label>
              </div>

              <label className='block'>
                <div className='mb-2 ml-0.5'>
                  <div className='mb-4'>
                    <p className='font-heading text-base font-medium leading-none'>
                      Your notifications preferences
                    </p>
                    <p className='font-sans text-xs font-normal leading-normal text-gray-400 mt-0.5'>
                      Receive email when:
                    </p>
                  </div>
                  <Toogle
                    entityId={'activeOnNewService'}
                    label='A new gig corresponding your skills is open'
                  />

                  <Toogle
                    entityId={'activeOnNewProposal'}
                    label='A new proposal is posted on your Gig'
                  />

                  <Toogle
                    entityId={'activeOnProposalValidated'}
                    label='Your proposal has been validated'
                  />

                  <Toogle entityId={'activeOnFundRelease'} label='The hirer released fund' />

                  <Toogle entityId={'activeOnReview'} label='You received a new review' />

                  <Toogle
                    entityId={'activeOnPlatformMarketing'}
                    label='We want to keep you update on important annoucement, new features..'
                  />
                </div>
              </label>

              <SubmitButton isSubmitting={isSubmitting} label='Update' />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default Web3mailPreferencesForm;
