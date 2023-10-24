import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useCreateBuilderPlaceMutation } from '../../../modules/BuilderPlace/hooks/UseCreateBuilderPlaceMutation';
import { generateSubdomainPrefix } from '../../../modules/BuilderPlace/utils';
import { useState } from 'react';
import { showErrorTransactionToast } from '../../../utils/toast';
import { JobType } from '../../../types';
import { createOrganization } from '../../../modules/BuilderPlace/request';

interface IFormValues {
  name: string;
  about: string;
  job_type: JobType;
  image_url: string;
}
function onboardingStep1() {
  const { data: createdBuilderPlace, mutateAsync: createBuilderPlaceAsync } =
    useCreateBuilderPlaceMutation();
  // const { data: createdSpace, mutateAsync: createSpaceAsync } = useCreateSpaceMutation();
  const [name, setName] = useState('');

  const initialValues: IFormValues = {
    name: '',
    about: '',
    job_type: JobType.jobs,
    image_url: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('name is required'),
    about: Yup.string().required('about is required'),
    job_type: Yup.string().required('Job Type is required'),
    image_url: Yup.string().required('Image is required'),
  });

  const sendDomain = async (
    values: IFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    // const subdomainPrefix = generateSubdomainPrefix(name);
    // const subdomain = `${subdomainPrefix}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
    // await createBuilderPlaceAsync({
    //   subdomain: subdomain,
    //   name: name,
    //   primaryColor: '#ffffff',
    //   secondaryColor: '#ffffff',
    //   ownerTalentLayerId: '1',
    // });
    // window.location.href = `${window.location.protocol}//${subdomain}/dashboard`;
    // const initialValues: IFormValues = {
    //   name: '',
    //   about: '',
    //   job_type: JobType.jobs,
    //   image_url: '',
    // };
    try {
      setSubmitting(true);
      await createOrganization(values.name, values.about, values.job_type, values.image_url);
    } catch (error) {
      console.log(error);
      showErrorTransactionToast(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
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
                <span className='text-stone-800'>About</span>
                <Field
                  as='textarea'
                  id='about'
                  name='about'
                  rows='4'
                  className='mt-1 mb-1 block w-full rounded-xl border border-redpraha bg-midnight shadow-sm focus:ring-opacity-50'
                  placeholder=''
                />
              </label>
              <span className='text-red-500'>
                <ErrorMessage name='about' />
              </span>
              <label className='block'>
                <span className='text-stone-800'>I want to post</span>
                <Field
                  as='select'
                  id='job_type'
                  name='job_type'
                  className='mt-1 mb-1 block w-full rounded-xl border border-redpraha bg-midnight shadow-sm focus:ring-opacity-50'
                  placeholder=''>
                  <option value=''></option>
                  <option value={JobType.jobs}>Jobs</option>
                  <option value={JobType.bounties}>Bounties</option>
                  <option value={JobType.grants}>Grants</option>
                  <option value={JobType.gigs}>Gigs</option>
                </Field>
              </label>
              <span className='text-red-500'>
                <ErrorMessage name='job_type' />
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
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default onboardingStep1;
