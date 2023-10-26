import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useCreateBuilderPlaceMutation } from '../../../modules/BuilderPlace/hooks/UseCreateBuilderPlaceMutation';
import { showErrorTransactionToast } from '../../../utils/toast';
import { PreferredWorkType } from '../../../types';
import { useRouter } from 'next/router';
import { upload } from '../../../modules/BuilderPlace/request';
import * as fs from 'fs';
import { generateSubdomainPrefix } from '../../../modules/BuilderPlace/utils';

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
    // name: Yup.string()
    //   .min(2)
    //   .max(10)
    //   .matches(/^[a-z0-9][a-z0-9-_]*$/, 'Only a-z, 0-9 and -_ allowed, and cannot begin with -_')
    //   .required('name is required'),
    // presentation: Yup.string().required('presentation is required'),
    // preferred_work_type: Yup.array()
    //   .of(Yup.string())
    //   .min(1, 'Chose at least one preferred word type')
    //   .max(4, 'You already chose all existing preferred word type')
    //   .required('Job Type is required'),
    // image_url: Yup.string().required('Image is required'),
  });

  const handleSubmit = async (
    values: IFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    //TODO add un check sur handle taken (useUserByHandle)
    console.log('values', values);
    try {
      // setSubmitting(true);
      // const subdomainPrefix = generateSubdomainPrefix(values.name);
      // const subdomain = `${subdomainPrefix}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;

      let formData = new FormData();
      // const stream = fs.createReadStream(values.image_url);
      console.log('values.image_url', values.image_url);
      // console.log('stream', stream);
      // const base64 = btoa(values.image_url);
      // console.log('base64', base64);
      // formData.append('file', stream);
      console.log('formData', formData);

      const response = await upload(formData);
      console.log('response', response);

      // await createBuilderPlaceAsync({
      //   subdomain: subdomain,
      //   name: values.name,
      //   primaryColor: '#ffffff',
      //   secondaryColor: '#ffffff',
      //   presentation: values.presentation,
      //   preferredWorkType: values.preferred_work_type,
      //   imageUrl: values.image_url,
      // });
      //
      // setSubmitting(false);
      // router.query.subdomain = subdomain;
      // router.push({
      //   pathname: '/onboarding/step2',
      //   query: { subdomain: subdomain },
      // });
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
        onSubmit={handleSubmit}
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
                    {PreferredWorkType.jobs}
                  </label>
                  <label>
                    <Field
                      type='checkbox'
                      name='preferred_work_type'
                      value={PreferredWorkType.jobs}
                    />
                    {PreferredWorkType.jobs}
                  </label>
                  <label>
                    <Field
                      type='checkbox'
                      name='preferred_work_type'
                      value={PreferredWorkType.grants}
                    />
                    {PreferredWorkType.grants}
                  </label>
                  <label>
                    <Field
                      type='checkbox'
                      name='preferred_work_type'
                      value={PreferredWorkType.gigs}
                    />
                    {PreferredWorkType.gigs}
                  </label>
                </div>
              </label>
              <span className='text-red-500'>
                <ErrorMessage name='preferred_work_type' />
              </span>

              <label className='block'>
                <span className='text-stone-800'>Picture Url</span>
                <input
                  type='file'
                  id='image_url'
                  name='image_url'
                  onChange={(event: any) => {
                    setFieldValue('image_url', event.currentTarget.files[0].mozFullPath);
                  }}
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
