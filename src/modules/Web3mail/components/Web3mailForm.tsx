import { useWeb3Modal } from '@web3modal/react';
import { Field, Form, Formik } from 'formik';
import { useContext } from 'react';
import * as Yup from 'yup';
import SubmitButton from '../../../components/Form/SubmitButton';
import Loading from '../../../components/Loading';
import TalentLayerContext from '../../../context/talentLayer';
import { useChainId } from '../../../hooks/useChainId';
import { showErrorTransactionToast } from '../../../utils/toast';
import Web3mailCard from './Web3mailCard';
import Web3MailContext from '../context/web3mail';
import { toast } from 'react-toastify';
import { usePublicClient, useWalletClient } from 'wagmi';

interface IFormValues {
  email: string;
}

function Web3mailForm() {
  const chainId = useChainId();
  const { open: openConnectModal } = useWeb3Modal();
  const { user } = useContext(TalentLayerContext);
  const { protectEmailAndGrantAccess, emailIsProtected } = useContext(Web3MailContext);
  const { data: walletClient } = useWalletClient({ chainId });
  const publicClient = usePublicClient({ chainId });

  if (!user?.id) {
    return <Loading />;
  }

  const initialValues: IFormValues = {
    email: '',
  };

  const validationSchema = Yup.object({
    email: emailIsProtected
      ? Yup.string().notRequired()
      : Yup.string().required('email is required').email('email is not valid'),
  });

  const onSubmit = async (
    values: IFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    if (user && walletClient && publicClient) {
      try {
        const promise = protectEmailAndGrantAccess(values.email);
        await toast.promise(promise, {
          pending: 'Pending transactions, follow instructions in your wallet',
          success: 'Access granted succefully',
          error: 'An error occurred while granted access',
        });
        setSubmitting(false);
      } catch (error) {
        showErrorTransactionToast(error);
      }
    } else {
      openConnectModal();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {({ isSubmitting }) => (
        <Form>
          <div className='grid grid-cols-1 gap-6'>
            <Web3mailCard />

            <label className='block'>
              <div className='mb-2 ml-1'>
                <p className='font-heading text-base font-medium leading-none'>Your email</p>
                <p className='font-sans text-xs font-normal leading-normal text-gray-400 mt-0.5'>
                  It will allow you to configure your preferences to be notified every time an
                  important action happened.
                </p>
              </div>

              {emailIsProtected ? (
                <>
                  <Field
                    type='text'
                    id='email'
                    name='email'
                    className='cursor-not-allowed mt-1 mb-1 block w-full rounded-xl border border-gray-700 bg-midnight shadow-sm focus:ring-opacity-50'
                    placeholder='**********'
                    readOnly
                    disabled
                    title='You already protect your email, just need to grant access now'
                  />
                  <span className='text-xs text-gray-400 ml-1'>
                    You already protect your email, just need to grant access now
                  </span>
                </>
              ) : (
                <Field
                  type='text'
                  id='email'
                  name='email'
                  className='mt-1 mb-1 block w-full rounded-xl border border-gray-700 bg-midnight shadow-sm focus:ring-opacity-50'
                  placeholder=''
                />
              )}
            </label>

            <SubmitButton
              isSubmitting={isSubmitting}
              label={emailIsProtected ? 'Grant access' : 'Protect and Grant access'}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default Web3mailForm;
