import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import HirerProfileLayout from '../../../components/HirerProfileLayout';
import UploadImage from '../../../components/UploadImage';
import { useCreateBuilderPlaceMutation } from '../../../modules/BuilderPlace/hooks/UseCreateBuilderPlaceMutation';
import { themes } from '../../../utils/themes';
import { showErrorTransactionToast } from '../../../utils/toast';
import { useCreateHirerProfileMutation } from '../../../modules/BuilderPlace/hooks/UseCreateHirerProfileMutation';
import { EntityStatus, WorkType } from '.prisma/client';
import { getUserByEmail } from '../../../modules/BuilderPlace/request';

interface IFormValues {
  name: string;
  about: string;
  email: string;
  preferred_work_types: WorkType[];
  profilePicture?: string;
}
function onboardingStep1() {
  const { mutateAsync: createBuilderPlaceAsync } = useCreateBuilderPlaceMutation();
  const { mutateAsync: createHirerProfileAsync } = useCreateHirerProfileMutation();
  const router = useRouter();

  const initialValues: IFormValues = {
    name: '',
    about: '',
    email: '',
    preferred_work_types: [WorkType.JOBS],
  };

  const validationSchema = Yup.object({
    name: Yup.string().min(2).max(20).required('Enter your name'),
    about: Yup.string().required('Give us a description about your team'),
    email: Yup.string().required('Please provide your email'),
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

      /**
       * @dev: Check if user already exists
       */
      let userId: string;
      const existingUser = await getUserByEmail(values.email);
      if (
        existingUser &&
        existingUser.status === EntityStatus.VALIDATED &&
        !!existingUser.ownedBuilderPlace
      ) {
        throw new Error('A User with this email already owns a BuilderPlace');
      }

      if (existingUser && existingUser.status === EntityStatus.VALIDATED) {
        userId = existingUser.id;
      } else {
        const userResponse = await createHirerProfileAsync({
          email: values.email,
          name: values.name,
          picture: values.profilePicture || undefined,
          about: values.about,
        });

        userId = userResponse.id;

        if (userResponse.error) {
          throw new Error(userResponse.error);
        }
      }

      const builderPlaceResponse = await createBuilderPlaceAsync({
        name: values.name,
        palette: themes['lisboa'],
        about: values.about,
        preferredWorkTypes: values.preferred_work_types,
        profilePicture: values.profilePicture || undefined,
      });

      if (builderPlaceResponse.error) {
        throw new Error(builderPlaceResponse.error);
      }

      router.query.builderPlaceId = builderPlaceResponse.id;
      router.query.userId = userId;
      router.push({
        pathname: '/onboarding/step2',
        query: { builderPlaceId: builderPlaceResponse.id, userId: userId },
      });
    } catch (error: any) {
      showErrorTransactionToast(error.message);
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
                  className='mt-1 mb-1 block w-full rounded-xl border-2 border-info bg-base-200 shadow-sm focus:ring-opacity-50'
                  placeholder='your organization name goes here'
                />
              </label>
              <span className='text-red-500'>
                <ErrorMessage name='name' />
              </span>
              <label className='block'>
                <span className='font-bold text-md'>organization email</span>
                <Field
                  type='text'
                  id='email'
                  name='email'
                  className='mt-1 mb-1 block w-full rounded-xl border-2 border-info bg-base-200 shadow-sm focus:ring-opacity-50'
                  placeholder="your organization's email goes here"
                />
              </label>
              <span className='text-red-500'>
                <ErrorMessage name='email' />
              </span>
              <label className='block'>
                <span className='font-bold text-md'>about your orgnanization</span>
                <Field
                  as='textarea'
                  id='about'
                  name='about'
                  rows='4'
                  className='mt-1 mb-1 block w-full rounded-xl border-2 border-info bg-base-200 shadow-sm focus:ring-opacity-50'
                  placeholder='tell everyone about what you work on and why you’re doing it (ps: open-source contributors love to hear about your mission and vision)'
                />
              </label>
              <span className='text-red-500'>
                <ErrorMessage name='about' />
              </span>
              <label className='block'>
                <span className='font-bold text-md'>your work styles</span>
                <div className='space-x-2'>
                  <label
                    className={`inline-flex items-center p-3 rounded-lg ${
                      values.preferred_work_types.includes(WorkType.JOBS)
                        ? 'bg-green-200'
                        : 'bg-gray-200'
                    }`}>
                    <input
                      type='checkbox'
                      name='preferred_work_types'
                      value={WorkType.JOBS}
                      className='hidden'
                      checked={values.preferred_work_types.includes(WorkType.JOBS)}
                      onChange={e => {
                        if (e.target.checked) {
                          setFieldValue('preferred_work_types', [
                            ...values.preferred_work_types,
                            WorkType.JOBS,
                          ]);
                        } else {
                          setFieldValue(
                            'preferred_work_types',
                            values.preferred_work_types.filter(type => type !== WorkType.JOBS),
                          );
                        }
                      }}
                    />
                    <span className='text-sm'>{WorkType.JOBS.toLowerCase()}</span>
                  </label>
                  <label
                    className={`inline-flex items-center p-3 rounded-lg ${
                      values.preferred_work_types.includes(WorkType.BOUNTIES)
                        ? 'bg-pink-200'
                        : 'bg-gray-200'
                    }`}>
                    <input
                      type='checkbox'
                      name='preferred_work_types'
                      value={WorkType.BOUNTIES}
                      className='hidden'
                      checked={values.preferred_work_types.includes(WorkType.BOUNTIES)}
                      onChange={e => {
                        if (e.target.checked) {
                          setFieldValue('preferred_work_types', [
                            ...values.preferred_work_types,
                            WorkType.BOUNTIES,
                          ]);
                        } else {
                          setFieldValue(
                            'preferred_work_types',
                            values.preferred_work_types.filter(type => type !== WorkType.BOUNTIES),
                          );
                        }
                      }}
                    />
                    <span className='text-sm'>{WorkType.BOUNTIES.toLowerCase()}</span>
                  </label>
                  <label
                    className={`inline-flex items-center p-3 rounded-lg ${
                      values.preferred_work_types.includes(WorkType.GRANTS)
                        ? 'bg-green-200'
                        : 'bg-gray-200'
                    }`}>
                    <input
                      type='checkbox'
                      name='preferred_work_types'
                      value={WorkType.GRANTS}
                      className='hidden'
                      checked={values.preferred_work_types.includes(WorkType.GRANTS)}
                      onChange={e => {
                        if (e.target.checked) {
                          setFieldValue('preferred_work_types', [
                            ...values.preferred_work_types,
                            WorkType.GRANTS,
                          ]);
                        } else {
                          setFieldValue(
                            'preferred_work_types',
                            values.preferred_work_types.filter(type => type !== WorkType.GRANTS),
                          );
                        }
                      }}
                    />
                    <span className='text-sm'>{WorkType.GRANTS.toLowerCase()}</span>
                  </label>
                  <label
                    className={`inline-flex items-center p-3 rounded-lg ${
                      values.preferred_work_types.includes(WorkType.GIGS)
                        ? 'bg-pink-200'
                        : 'bg-gray-200'
                    }`}>
                    <input
                      type='checkbox'
                      name='preferred_work_types'
                      value={WorkType.GIGS}
                      className='hidden'
                      checked={values.preferred_work_types.includes(WorkType.GIGS)}
                      onChange={e => {
                        if (e.target.checked) {
                          setFieldValue('preferred_work_types', [
                            ...values.preferred_work_types,
                            WorkType.GIGS,
                          ]);
                        } else {
                          setFieldValue(
                            'preferred_work_types',
                            values.preferred_work_types.filter(type => type !== WorkType.GIGS),
                          );
                        }
                      }}
                    />
                    <span className='text-sm'>{WorkType.GIGS.toLowerCase()}</span>
                  </label>
                </div>
              </label>
              <span className='text-red-500'>
                <ErrorMessage name='preferred_work_types' />
              </span>

              <UploadImage
                fieldName='profilePicture'
                label='profile picture'
                legend='square format'
                src={values.profilePicture}
                setFieldValue={setFieldValue}
              />

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
