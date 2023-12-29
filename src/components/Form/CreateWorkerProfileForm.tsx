import { Field, Form, Formik } from 'formik';
import { QuestionMarkCircle } from 'heroicons-react';
import { useContext, useState } from 'react';
import * as Yup from 'yup';
import TalentLayerContext from '../../context/talentLayer';
import { generatePicture } from '../../utils/ai-picture-gen';
import { showErrorTransactionToast } from '../../utils/toast';
import Loading from '../Loading';
import SubmitButton from './SubmitButton';
import { SkillsInput } from './skills-input';
import { useRouter } from 'next/router';
import { useCreateWorkerProfileMutation } from '../../modules/BuilderPlace/hooks/UseCreateWorkerProfileMutation';

interface IFormValues {
  email: string;
  name: string;
  about?: string;
  image_url?: string;
  skills?: string;
}

const validationSchema = Yup.object({
  email: Yup.string().required('email is required'),
  name: Yup.string().required('name is required'),
});

function CreateWorkerProfileForm({ callback }: { callback?: () => void }) {
  const { mutateAsync: createWorkerProfileAsync } = useCreateWorkerProfileMutation();
  const { user } = useContext(TalentLayerContext);
  const [aiLoading, setAiLoading] = useState(false);
  const router = useRouter();
  const serviceId = new URL(window.location.href).searchParams.get('serviceId');

  const initialValues: IFormValues = {
    email: '',
    name: user?.description?.name || '',
    about: user?.description?.about || '',
    image_url: user?.description?.image_url || '',
    skills: user?.description?.skills_raw || '',
  };

  const generatePictureUrl = async (e: React.FormEvent, callback: (string: string) => void) => {
    e.preventDefault();
    setAiLoading(true);
    const image_url = await generatePicture();
    if (image_url) {
      callback(image_url);
    }
    setAiLoading(false);
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
        image_url: values.image_url,
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

            <label className='block'>
              <span className='text-xl font-bold '>picture url</span>
              <Field
                type='text'
                id='image_url'
                name='image_url'
                className='mt-1 mb-1 block w-full rounded-xl border-2 border-info bg-base-200 shadow-sm focus:ring-opacity-50'
                placeholder=''
              />
              <div className='border-2 border-info bg-base-200 relative w-full transition-all duration-300 rounded-xl p-4'>
                <div className='flex w-full items-center gap-3'>
                  <QuestionMarkCircle className='hidden' />
                  <div>
                    <h2 className='font-heading text-xl font-bold  mb-1'>
                      <span>Need help?</span>
                    </h2>
                    <p className='font-alt text-xs font-normal'>
                      <span className='text-base-content'>Use our AI to generate a cool one</span>
                    </p>
                  </div>
                  <div className='ms-auto'>
                    <button
                      disabled={aiLoading}
                      onClick={e =>
                        generatePictureUrl(e, newUrl => setFieldValue('image_url', newUrl))
                      }
                      className='border text-base-content bg-base-300 hover:bg-base-100 border-white rounded-md h-10 w-10 p-2 relative inline-flex items-center justify-center space-x-1 font-sans text-sm font-normal leading-5 no-underline outline-none transition-all duration-300'>
                      {aiLoading ? <Loading /> : 'GO'}
                    </button>
                  </div>
                </div>
                {values.image_url && (
                  <div className='flex items-center justify-center py-3'>
                    <img width='300' height='300' src={values.image_url} alt='' />
                  </div>
                )}
              </div>
            </label>

            <label className='block'>
              <span className='text-xl font-bold '>about</span>
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
