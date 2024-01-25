import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import SubmitButton from './SubmitButton';
import { showErrorTransactionToast } from '../../utils/toast';
import { IUser } from '../../types';
import { useContext } from 'react';
import TalentLayerContext from '../../context/talentLayer';
import { useChainId } from '../../hooks/useChainId';
import { useWalletClient } from 'wagmi';
import { useRouter } from 'next/router';
import { useUpdateEmailMutation } from '../../modules/BuilderPlace/hooks/UseUpdateEmailMutation';
import { createVerificationEmailToast } from '../../modules/BuilderPlace/utils/toast';

interface IFormValues {
  email: string;
}

const validationSchema = Yup.object({
  email: Yup.string().required('Please provide an email'),
});

function EmailForm({ user, callback }: { user: IUser; callback?: () => void }) {
  const chainId = useChainId();
  const router = useRouter();
  const { data: walletClient } = useWalletClient({ chainId });
  const { account, workerProfile, refreshWorkerProfile } = useContext(TalentLayerContext);
  const { mutateAsync: updateUserEmailAsync } = useUpdateEmailMutation();

  const initialValues: IFormValues = {
    email: '',
  };

  const domain =
    typeof router.query.domain === 'object' && !!router.query.domain
      ? router.query.domain[0]
      : router.query.domain;
  const onSubmit = async (
    values: IFormValues,
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void },
  ) => {
    setSubmitting(true);
    try {
      if (walletClient && account?.address && workerProfile?.name && domain) {
        /**
         * @dev Sign message to prove ownership of the address
         */
        const signature = await walletClient.signMessage({
          account: account.address,
          message: workerProfile.id.toString(),
        });

        /**
         * @dev Update Email & send verification email to new email
         */
        const response = await updateUserEmailAsync({
          userId: workerProfile.id.toString(),
          email: values.email,
          name: workerProfile.name,
          domain,
          signature,
        });

        if (response.error) {
          throw new Error(response.error);
        }

        createVerificationEmailToast();

        await refreshWorkerProfile();

        resetForm();

        if (callback) {
          callback();
        }
      }
    } catch (error: any) {
      console.log(error);
      showErrorTransactionToast(error.message);
    } finally {
      setSubmitting(false);
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
          <div className='border border-info rounded-xl p-6 bg-base-100'>
            <label className='block'>
              <span className='text-base-content'>Email: </span>
              <Field
                type='email'
                id='email'
                name='email'
                className='mt-1 mb-1 block w-full rounded-xl border border-info bg-base-200 shadow-sm focus:ring-opacity-50'
                placeholder='Write your email here'
              />
              <span className='text-alone-error'>
                <ErrorMessage name='email' />
              </span>
            </label>
            <SubmitButton isSubmitting={isSubmitting} label='Add your email' />
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default EmailForm;
