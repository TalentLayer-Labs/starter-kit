import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { useCreateBuilderPlaceMutation } from '../../../modules/BuilderPlace/hooks/UseCreateBuilderPlaceMutation';
import { uploadImage } from '../../../modules/BuilderPlace/utils';
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
  const { mutateAsync: createBuilderPlaceAsync } = useCreateBuilderPlaceMutation();
  const router = useRouter();
  const [imgLoader, setImgLoader] = useState(false);
  const [profilePictureErrorMessage, setProfilePictureErrorMessage] = useState('');

  const initialValues: IFormValues = {
    name: '',
    presentation: '',
    preferred_work_types: [PreferredWorkTypes.jobs],
  };

  const validationSchema = Yup.object({
    name: Yup.string().min(2).max(20).required('Enter your name'),
    presentation: Yup.string().required('Give us a description about your team'),
    preferred_work_types: Yup.array()
      .of(Yup.string())
      .min(1, 'Chose at least one preferred word type')
      .max(4, 'You already chose all existing preferred word type')
      .required('Job Type is required'),
  });

  const handleSubmit = async (
    values: IFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    try {
      setSubmitting(true);

      const response = await createBuilderPlaceAsync({
        name: values.name,
        palette: themes['lisboa'],
        presentation: values.presentation,
        preferredWorkTypes: values.preferred_work_types,
        profilePicture: values.profilePicture || undefined,
      });
      if (response?.id) {
        router.query.id = response.id;
        router.push({
          pathname: '/onboarding/step2',
          query: { id: response.id },
        });
      }
    } catch (error: any) {
      showErrorTransactionToast(error);
    } finally {
      setTimeout(() => {
        setSubmitting(false);
      }, 1000);
    }
  };

  return (
    <HirerProfileLayout step={1}>
      <p className='text-center pb-10 sm:pb-16'>
        your organization profile helps contributors get to know you - whether they’re visiting your
        team’s job board, or if they’ve found your mission through a third-party platform
      </p>

      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}>
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <div className='grid grid-cols-1 gap-3 sm:gap-4'>
              <label className='block'>
                <span className='font-bold text-md'>organization name</span>
                <Field
                  type='text'
                  id='name'
                  name='name'
                  className='mt-1 mb-1 block w-full rounded-xl border-2 border-gray-200 bg-midnight shadow-sm focus:ring-opacity-50'
                  placeholder='your organization name goes here'
                />
              </label>
              <span className='text-red-500'>
                <ErrorMessage name='name' />
              </span>
              <label className='block'>
                <span className='font-bold text-md'>about your team</span>
                <Field
                  as='textarea'
                  id='presentation'
                  name='presentation'
                  rows='4'
                  className='mt-1 mb-1 block w-full rounded-xl border-2 border-gray-200 bg-midnight shadow-sm focus:ring-opacity-50'
                  placeholder='tell everyone about what you work on and why you’re doing it (ps: open-source contributors love to hear about your mission and vision)'
                />
              </label>
              <span className='text-red-500'>
                <ErrorMessage name='presentation' />
              </span>
              <label className='block'>
                <span className='font-bold text-md'>your work styles</span>
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
                <span className='font-bold text-md'>your profile picture</span>
                <span className='italic text-sm'> (square format)</span>
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

              {isSubmitting ? (
                <button
                  disabled
                  type='submit'
                  className='grow px-5 py-2 rounded-xl bg-pink-300 text-white'>
                  Loading...
                </button>
              ) : (
                <button type='submit' className='grow px-5 py-2 rounded-xl bg-pink-500 text-white'>
                  create my profile
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </HirerProfileLayout>
  );
}

export default onboardingStep1;
