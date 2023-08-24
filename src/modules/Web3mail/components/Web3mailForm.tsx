import { useWeb3Modal } from '@web3modal/react';
import { Field, Form, Formik } from 'formik';
import { useContext } from 'react';
import { useProvider, useSigner } from 'wagmi';
import * as Yup from 'yup';
import SubmitButton from '../../../components/Form/SubmitButton';
import Loading from '../../../components/Loading';
import TalentLayerContext from '../../../context/talentLayer';
import { useChainId } from '../../../hooks/useChainId';
import { showErrorTransactionToast } from '../../../utils/toast';
import Web3mailCard from './Web3mailCard';
import Web3MailContext from '../context/web3mail';

interface IFormValues {
  email: string;
}

const validationSchema = Yup.object({
  email: Yup.string().required('email is required').email('email is not valid'),
});

function Web3mailForm() {
  const chainId = useChainId();
  const { open: openConnectModal } = useWeb3Modal();
  const { user } = useContext(TalentLayerContext);
  const provider = useProvider({ chainId });
  const { data: signer } = useSigner({
    chainId,
  });
  const { protectEmailAndGrantAccess } = useContext(Web3MailContext);

  if (!user?.id) {
    return <Loading />;
  }

  const initialValues: IFormValues = {
    email: '',
  };

  const onSubmit = async (
    values: IFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    if (user && provider && signer) {
      try {
        protectEmailAndGrantAccess(values.email);
        setSubmitting(false);
        // TODO: show toast
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
              <div className='mb-2 ml-0.5'>
                <p className='font-heading text-base font-medium leading-none'>Your email</p>
                <p className='font-sans text-xs font-normal leading-normal text-gray-400 mt-0.5'>
                  It will allow you to configure your preferences to be notified every time an
                  important action happened.
                </p>
              </div>

              <Field
                type='text'
                id='email'
                name='email'
                className='mt-1 mb-1 block w-full rounded-xl border border-gray-700 bg-midnight shadow-sm focus:ring-opacity-50'
                placeholder=''
              />
            </label>

            <SubmitButton isSubmitting={isSubmitting} label='Protect and Share my email' />
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default Web3mailForm;
