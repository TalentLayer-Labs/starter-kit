import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useCreateBuilderPlaceMutation } from '../../../modules/BuilderPlace/hooks/UseCreateBuilderPlaceMutation';
import { showErrorTransactionToast } from '../../../utils/toast';
import { PreferredWorkTypes } from '../../../types';
import { useRouter } from 'next/router';
import { generateDomainName, uploadImage } from '../../../modules/BuilderPlace/utils';
import { useState } from 'react';
import Loading from '../../../components/Loading';
import SubmitButton from '../../../components/Form/SubmitButton';

interface IFormValues {
  name: string;
  presentation: string;
  preferred_work_types: PreferredWorkTypes[];
  profilePicture?: string;
}
function onboardingStep1() {
  const { data: createdBuilderPlace, mutateAsync: createBuilderPlaceAsync } =
    useCreateBuilderPlaceMutation();
  const router = useRouter();
  const [imgLoader, setImgLoader] = useState(false);
  const [profilePictureErrorMessage, setProfilePictureErrorMessage] = useState('');

  const initialValues: IFormValues = {
    name: '',
    presentation: '',
    preferred_work_types: [PreferredWorkTypes.jobs],
  };

  const validationSchema = Yup.object({
    name: Yup.string().min(2).max(10).required('name is required'),
    presentation: Yup.string().required('presentation is required'),
    preferred_work_types: Yup.array()
      .of(Yup.string())
      .min(1, 'Chose at least one preferred word type')
      .max(4, 'You already chose all existing preferred word type')
      .required('Job Type is required'),
    profilePicture: Yup.string().required('Image is required'),
  });

  const handleSubmit = async (
    values: IFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    try {
      setSubmitting(true);

      const subdomain = generateDomainName(values.name);

      // TODO: generate image url form response

      await createBuilderPlaceAsync({
        subdomain: subdomain,
        name: values.name,
        palette: {
          primary: '#FF71A2',
          primaryFocus: '#FFC2D1',
          primaryContent: '#ffffff',
          base100: '#ffffff',
          base200: '#fefcfa',
          base300: '#fae4ce',
          baseContent: '#000000',
          info: '#f4dabe',
          infoContent: '#000000',
          success: '#C5F1A4',
          successContent: '#000000',
          warning: '#FFE768',
          warningContent: '#000000',
          error: '#FFC2D1',
          errorContent: '#000000',
        },
        presentation: values.presentation,
        preferredWorkTypes: values.preferred_work_types,
        profilePicture: values.profilePicture || undefined,
      });

      setSubmitting(false);
      router.query.subdomain = subdomain;
      router.push({
        pathname: '/onboarding/step2',
        query: { subdomain: subdomain },
      });
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
                      name='preferred_work_types'
                      value={PreferredWorkTypes.jobs}
                    />
                    {PreferredWorkTypes.jobs}
                  </label>
                  <label>
                    <Field
                      type='checkbox'
                      name='preferred_work_types'
                      value={PreferredWorkTypes.bounties}
                    />
                    {PreferredWorkTypes.bounties}
                  </label>
                  <label>
                    <Field
                      type='checkbox'
                      name='preferred_work_types'
                      value={PreferredWorkTypes.grants}
                    />
                    {PreferredWorkTypes.grants}
                  </label>
                  <label>
                    <Field
                      type='checkbox'
                      name='preferred_work_types'
                      value={PreferredWorkTypes.gigs}
                    />
                    {PreferredWorkTypes.gigs}
                  </label>
                </div>
              </label>
              <span className='text-red-500'>
                <ErrorMessage name='preferred_work_types' />
              </span>

              <label className='block'>
                <span className='text-stone-800'>Picture Url</span>
                <input
                  type='file'
                  id='profilePicture'
                  name='profilePicture'
                  onChange={async (event: any) => {
                    await uploadImage(
                      event.currentTarget.files[0],
                      setFieldValue,
                      setProfilePictureErrorMessage,
                      'profilePicture',
                      setImgLoader,
                    );
                  }}
                  className='mt-1 mb-1 block w-full rounded-xl border border-redpraha bg-midnight shadow-sm focus:ring-opacity-50'
                  placeholder=''
                />
                {imgLoader && <Loading />}
                {values.profilePicture && (
                  <div className='flex items-center justify-center py-3'>
                    <img width='300' height='300' src={values.profilePicture} alt='' />
                  </div>
                )}
              </label>
              <span className='text-red-500'>
                <p>{profilePictureErrorMessage}</p>
              </span>
              <SubmitButton isSubmitting={isSubmitting} label={'Create My Profile'} />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default onboardingStep1;
