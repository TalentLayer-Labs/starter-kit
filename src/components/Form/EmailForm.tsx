import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { verifyEmail } from '../../modules/BuilderPlace/request';
import SubmitButton from './SubmitButton';
import { showMongoErrorTransactionToast } from '../../utils/toast';
import { IUser } from '../../types';
import { useCreateWorkerProfileMutation } from '../../modules/BuilderPlace/hooks/UseCreateWorkerProfileMutation';
import { useContext } from 'react';
import TalentLayerContext from '../../context/talentLayer';

interface IFormValues {
  email: string;
}

const validationSchema = Yup.object({
  email: Yup.string().required('Please provide an email'),
});

function EmailForm({ user, callback }: { user: IUser; callback?: () => void }) {
  const { refreshWorkerProfile } = useContext(TalentLayerContext);
  const { mutateAsync: createWorkerProfileAsync } = useCreateWorkerProfileMutation();

  const initialValues: IFormValues = {
    email: '',
  };
  const onSubmit = async (
    values: IFormValues,
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void },
  ) => {
    setSubmitting(true);
    try {
      await createWorkerProfileAsync({
        email: values.email,
        name: user.handle,
        picture: user?.description?.image_url,
        about: user?.description?.about,
        skills: user?.description?.skills_raw,
        talentLayerId: user.id,
        status: 'validated',
      });

      const response: any = await verifyEmail(values.email, user.id);

      await refreshWorkerProfile();

      if (response.status !== 200) {
        showMongoErrorTransactionToast(response.statusText);
        return;
      }

      resetForm();

      if (callback) {
        callback();
      }
    } catch (error: any) {
      showMongoErrorTransactionToast(error.message);
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
