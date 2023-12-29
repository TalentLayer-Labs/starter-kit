import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import * as Yup from 'yup';
import TalentLayerContext from '../../context/talentLayer';
import { useCreateWorkerProfileMutation } from '../../modules/BuilderPlace/hooks/UseCreateWorkerProfileMutation';
import { showErrorTransactionToast } from '../../utils/toast';
import UploadImage from '../UploadImage';
import SubmitButton from './SubmitButton';
import { SkillsInput } from './skills-input';

interface IFormValues {
  email: string;
  name: string;
  about?: string;
  picture?: string;
  skills?: string;
}

const validationSchema = Yup.object({
  email: Yup.string().required('email is required'),
  name: Yup.string().required('name is required'),
});

function CreateWorkerProfileForm({ callback }: { callback?: () => void }) {
  const { mutateAsync: createWorkerProfileAsync } = useCreateWorkerProfileMutation();
  const { user } = useContext(TalentLayerContext);
  const router = useRouter();
  const serviceId = new URL(window.location.href).searchParams.get('serviceId');

  const initialValues: IFormValues = {
    email: '',
    name: user?.description?.name || '',
    about: user?.description?.about || '',
    picture: user?.description?.image_url || '',
    skills: user?.description?.skills_raw || '',
  };

  const onSubmit = async (
    values: IFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    try {
      setSubmitting(true);

      const response = await createWorkerProfileAsync({
        email: values.email,
        name: values.name,
        picture: values.picture,
        about: values.about,
        skills: values.skills,
        status: 'pending',
      });

      if (response?.id) {
        router.query.id = response.id;
        router.push({
          pathname: `/worker-onboarding/step2`,
          query: { id: response.id, serviceId: serviceId },
        });
      }

      if (callback) {
        callback();
      }
    } catch (error) {
      console.log(error);
      showErrorTransactionToast(error);
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
      {({ isSubmitting, setFieldValue, values }) => (
        <Form>
          <div className='grid grid-cols-1 gap-6'>
            <label className='block'>
              <span className='text-xl font-bold '>email</span>
              <Field
                type='email'
                id='email'
                name='email'
                className='mt-1 mb-1 block w-full rounded-xl border-2 border-info bg-base-200 shadow-sm focus:ring-opacity-50'
                placeholder=''
              />
            </label>
            <label className='block'>
              <span className='text-xl font-bold '>name</span>
              <Field
                type='text'
                id='name'
                name='name'
                className='mt-1 mb-1 block w-full rounded-xl border-2 border-info bg-base-200 shadow-sm focus:ring-opacity-50'
                placeholder=''
              />
            </label>

            <UploadImage
              fieldName='picture'
              label='profile picture'
              legend='square format'
              src={values.picture}
              setFieldValue={setFieldValue}
            />

            <label className='block'>
              <span className='text-xl font-bold'>about</span>
              <Field
                as='textarea'
                id='about'
                name='about'
                rows='4'
                className='mt-1 mb-1 block w-full rounded-xl border-2 border-info bg-base-200 shadow-sm focus:ring-opacity-50'
                placeholder=''
              />
            </label>

            <label className='block'>
              <span className='text-xl font-bold '>skills</span>

              <SkillsInput initialValues={user?.description?.skills_raw} entityId={'skills'} />

              <Field type='hidden' id='skills' name='skills' />
            </label>
            <SubmitButton isSubmitting={isSubmitting} label='create profile' />
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default CreateWorkerProfileForm;
