import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { useCreateBuilderPlaceMutation } from '../../../modules/BuilderPlace/hooks/UseCreateBuilderPlaceMutation';
import { upload } from '../../../modules/BuilderPlace/request';
import { generateDomainName, uploadImage } from '../../../modules/BuilderPlace/utils';
import { PreferredWorkTypes } from '../../../types';
import { themes } from '../../../utils/themes';
import { showErrorTransactionToast } from '../../../utils/toast';
import { useState } from 'react';
import HirerProfileLayout from '../../../components/HirerProfileLayout';
import Loading from '../../../components/Loading';

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
    name: Yup.string().min(2).max(20).required('name is required'),
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

      await createBuilderPlaceAsync({
        subdomain: subdomain,
        name: values.name,
        palette: themes['light'],
        presentation: values.presentation,
        preferredWorkTypes: values.preferred_work_types,
        profilePicture: values.profilePicture || undefined,
      });

      router.query.subdomain = subdomain;
      router.push({
        pathname: '/onboarding/step2',
        query: { subdomain: subdomain },
      });
    } catch (error) {
      console.log(error);
      showErrorTransactionToast(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <HirerProfileLayout step={1}>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}>
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <div className='grid grid-cols-1 gap-6'>
              <label className='block'>
                <span className='text-stone-800 font-bold text-xl'>Organization Name</span>
                <Field
                  type='text'
                  id='name'
                  name='name'
                  className='mt-1 mb-1 block w-full rounded-xl border-2 border-gray-200 bg-midnight shadow-sm focus:ring-opacity-50'
                  placeholder='Your organization name goes here'
                />
              </label>
              <span className='text-red-500'>
                <ErrorMessage name='name' />
              </span>
              <label className='block'>
                <span className='text-stone-800'>about your team</span>
                <Field
                  as='textarea'
                  id='presentation'
                  name='presentation'
                  rows='4'
                  className='mt-1 mb-1 block w-full rounded-xl border-2 border-gray-200 bg-midnight shadow-sm focus:ring-opacity-50'
                  placeholder='Tell everyone about what you work on and why you’re doing it '
                />
              </label>
              <span className='text-red-500'>
                <ErrorMessage name='presentation' />
              </span>
              <label className='block'>
                <span className='text-stone-800 font-bold text-xl'>I want to post</span>
                <div className='space-x-2'>
                  <label
                    className={`inline-flex items-center p-3 rounded-lg ${
                      values.preferred_work_types.includes(PreferredWorkTypes.jobs)
                        ? 'bg-green-200'
                        : 'bg-gray-200'
                    }`}>
                    <input
                      type='checkbox'
                      name='preferred_work_types'
                      value={PreferredWorkTypes.jobs}
                      className='hidden'
                      checked={values.preferred_work_types.includes(PreferredWorkTypes.jobs)}
                      onChange={e => {
                        if (e.target.checked) {
                          setFieldValue('preferred_work_types', [
                            ...values.preferred_work_types,
                            PreferredWorkTypes.jobs,
                          ]);
                        } else {
                          setFieldValue(
                            'preferred_work_types',
                            values.preferred_work_types.filter(
                              type => type !== PreferredWorkTypes.jobs,
                            ),
                          );
                        }
                      }}
                    />
                    <span className='text-sm'>{PreferredWorkTypes.jobs}</span>
                  </label>
                  <label
                    className={`inline-flex items-center p-3 rounded-lg ${
                      values.preferred_work_types.includes(PreferredWorkTypes.bounties)
                        ? 'bg-pink-200'
                        : 'bg-gray-200'
                    }`}>
                    <input
                      type='checkbox'
                      name='preferred_work_types'
                      value={PreferredWorkTypes.bounties}
                      className='hidden'
                      checked={values.preferred_work_types.includes(PreferredWorkTypes.bounties)}
                      onChange={e => {
                        if (e.target.checked) {
                          setFieldValue('preferred_work_types', [
                            ...values.preferred_work_types,
                            PreferredWorkTypes.bounties,
                          ]);
                        } else {
                          setFieldValue(
                            'preferred_work_types',
                            values.preferred_work_types.filter(
                              type => type !== PreferredWorkTypes.bounties,
                            ),
                          );
                        }
                      }}
                    />
                    <span className='text-sm'>{PreferredWorkTypes.bounties}</span>
                  </label>
                  <label
                    className={`inline-flex items-center p-3 rounded-lg ${
                      values.preferred_work_types.includes(PreferredWorkTypes.grants)
                        ? 'bg-green-200'
                        : 'bg-gray-200'
                    }`}>
                    <input
                      type='checkbox'
                      name='preferred_work_types'
                      value={PreferredWorkTypes.grants}
                      className='hidden'
                      checked={values.preferred_work_types.includes(PreferredWorkTypes.grants)}
                      onChange={e => {
                        if (e.target.checked) {
                          setFieldValue('preferred_work_types', [
                            ...values.preferred_work_types,
                            PreferredWorkTypes.grants,
                          ]);
                        } else {
                          setFieldValue(
                            'preferred_work_types',
                            values.preferred_work_types.filter(
                              type => type !== PreferredWorkTypes.grants,
                            ),
                          );
                        }
                      }}
                    />
                    <span className='text-sm'>{PreferredWorkTypes.grants}</span>
                  </label>
                  <label
                    className={`inline-flex items-center p-3 rounded-lg ${
                      values.preferred_work_types.includes(PreferredWorkTypes.gigs)
                        ? 'bg-pink-200'
                        : 'bg-gray-200'
                    }`}>
                    <input
                      type='checkbox'
                      name='preferred_work_types'
                      value={PreferredWorkTypes.gigs}
                      className='hidden'
                      checked={values.preferred_work_types.includes(PreferredWorkTypes.gigs)}
                      onChange={e => {
                        if (e.target.checked) {
                          setFieldValue('preferred_work_types', [
                            ...values.preferred_work_types,
                            PreferredWorkTypes.gigs,
                          ]);
                        } else {
                          setFieldValue(
                            'preferred_work_types',
                            values.preferred_work_types.filter(
                              type => type !== PreferredWorkTypes.gigs,
                            ),
                          );
                        }
                      }}
                    />
                    <span className='text-sm'>{PreferredWorkTypes.gigs}</span>
                  </label>
                </div>
              </label>
              <span className='text-red-500'>
                <ErrorMessage name='preferred_work_types' />
              </span>

              <label className='block'>
                <span className='text-stone-800 font-bold text-xl'>Your profile picture</span>
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
                  className='mt-1 mb-1 block w-full rounded-xl border-2 border-gray-200 bg-midnight shadow-sm focus:ring-opacity-50'
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

              <button type='submit' className='grow px-5 py-2 rounded-xl bg-pink-500 text-white'>
                Create My Profile
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </HirerProfileLayout>
  );
}

export default onboardingStep1;
