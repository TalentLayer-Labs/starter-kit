import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useCreateBuilderPlaceMutation } from '../../../modules/BuilderPlace/hooks/UseCreateBuilderPlaceMutation';
import { generateSubdomainPrefix } from '../../../modules/BuilderPlace/utils';
import { showErrorTransactionToast } from '../../../utils/toast';
import { PreferredWorkType } from '../../../types';
import { useRouter } from 'next/router';

interface IFormValues {
  name: string;
  presentation: string;
  preferred_work_type: PreferredWorkType[];
  image_url: string;
}
function onboardingStep1() {
  const { data: createdBuilderPlace, mutateAsync: createBuilderPlaceAsync } =
    useCreateBuilderPlaceMutation();
  const router = useRouter();

  const initialValues: IFormValues = {
    name: '',
    presentation: '',
    preferred_work_type: [PreferredWorkType.jobs],
    image_url: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('name is required'),
    presentation: Yup.string().required('presentation is required'),
    preferred_work_type: Yup.array()
      .of(Yup.string())
      .min(1, 'Chose at least one preferred word type')
      .max(4, 'You already chose all existing preferred word type')
      .required('Job Type is required'),
    image_url: Yup.string().required('Image is required'),
  });

  const sendDomain = async (
    values: IFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    console.log('values', values);
    try {
      setSubmitting(true);
      const subdomainPrefix = generateSubdomainPrefix(values.name);
      const subdomain = `${subdomainPrefix}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
      await createBuilderPlaceAsync({
        subdomain: subdomain,
        name: values.name,
        primaryColor: '#ffffff',
        secondaryColor: '#ffffff',
        presentation: values.presentation,
        preferredWorkType: values.preferred_work_type,
        imageUrl: values.image_url,
      });
      window.location.href = `${window.location.protocol}//${subdomain}/dashboard`;

      setSubmitting(false);
      router.push('/dashboard/onboarding/step2');
    } catch (error) {
      console.log(error);
      showErrorTransactionToast(error);
      setSubmitting(false);
    }
  };

  return (
    <>
      <h1>1</h1>
      <h1>Create your hirer profile</h1>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={sendDomain}
        validationSchema={validationSchema}>
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <div className='grid grid-cols-1 gap-6'>
              <label className='block'>
                <span className='text-stone-800'>Organization Name</span>
                <Field
                  type='text'
                  id='name'
                  name='name'
                  className='mt-1 mb-1 block w-full rounded-xl border border-redpraha bg-midnight shadow-sm focus:ring-opacity-50'
                  placeholder=''
                />
              </label>
              <span className='text-red-500'>
                <ErrorMessage name='name' />
              </span>
              <label className='block'>
                <span className='text-stone-800'>presentation</span>
                <Field
                  as='textarea'
                  id='presentation'
                  name='presentation'
                  rows='4'
                  className='mt-1 mb-1 block w-full rounded-xl border border-redpraha bg-midnight shadow-sm focus:ring-opacity-50'
                  placeholder=''
                />
              </label>
              <span className='text-red-500'>
                <ErrorMessage name='presentation' />
              </span>
              <label className='block'>
                <span className='text-stone-800'>I want to post</span>
                <div role='group' aria-labelledby='checkbox-group'>
                  <label>
                    <Field
                      type='checkbox'
                      name='preferred_work_type'
                      value={PreferredWorkType.jobs}
                    />
                    One
                  </label>
                  <label>
                    <Field
                      type='checkbox'
                      name='preferred_work_type'
                      value={PreferredWorkType.bounties}
                    />
                    Two
                  </label>
                  <label>
                    <Field
                      type='checkbox'
                      name='preferred_work_type'
                      value={PreferredWorkType.grants}
                    />
                    Three
                  </label>
                  <label>
                    <Field
                      type='checkbox'
                      name='preferred_work_type'
                      value={PreferredWorkType.gigs}
                    />
                    Three
                  </label>
                </div>
              </label>
              <span className='text-red-500'>
                <ErrorMessage name='preferred_work_type' />
              </span>

              <label className='block'>
                <span className='text-stone-800'>Picture Url</span>
                <Field
                  type='file'
                  id='image_url'
                  name='image_url'
                  className='mt-1 mb-1 block w-full rounded-xl border border-redpraha bg-midnight shadow-sm focus:ring-opacity-50'
                  placeholder=''
                />
              </label>
              <span className='text-red-500'>
                <ErrorMessage name='image_url' />
              </span>

              <button
                type='submit'
                className='grow px-5 py-2 rounded-xl bg-redpraha text-stone-800'>
                Create My Profile
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default onboardingStep1;
