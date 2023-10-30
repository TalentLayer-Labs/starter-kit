import React, { useContext } from 'react';
import TalentLayerContext from '../../../context/talentLayer';
import { useRouter } from 'next/router';
import Steps from '../../../modules/BuilderPlace/components/Steps';
import { useGetBuilderPlace } from '../../../modules/BuilderPlace/hooks/UseGetBuilderPlace';
import { useSetBuilderPlaceOwner } from '../../../modules/BuilderPlace/hooks/UseSetBuilderPlaceOwner';
import { slugify } from '../../../modules/BuilderPlace/utils';
import Loading from '../../../components/Loading';
import SubmitButton from '../../../components/Form/SubmitButton';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import OnboardingSteps from '../../../components/OnboardingSteps';
import HirerProfileLayout from '../../../components/HirerProfileLayout';

interface IFormValues {
  subdomain: string;
}
function onboardingStep2() {
  const { account, user, loading } = useContext(TalentLayerContext);
  const router = useRouter();
  const { subdomain } = router.query;
  const { data } = useGetBuilderPlace({ domain: subdomain as string });
  const setOwner = useSetBuilderPlaceOwner();

  const initialValues: IFormValues = {
    subdomain: data?.subdomain || '',
  };

  const validationSchema = Yup.object({
    subdomain: Yup.string().required('Subdomain is required'),
  });

  if (loading) {
    return (
      <div className='flex flex-col mt-5 pb-8'>
        <Loading />
      </div>
    );
  }

  if (!account?.isConnected || !user) {
    return (
      <HirerProfileLayout step={2}>
        <div className='flex flex-col items-center justify-center'>
          <Steps
            handle={slugify(data?.name)}
            description={data?.presentation}
            profilePicture={data?.profilePicture}
          />
        </div>
      </HirerProfileLayout>
    );
  }

  const handleSubmit = async (
    values: IFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    if (account.address) {
      setSubmitting(true);
      try {
        await setOwner.mutate({
          /**
           * @dev: If the user modified his name, we must update it with his on-chain handle & regenerate the domain name
           */
          subdomain: values.subdomain,
          owners: [account.address],
          ownerTalentLayerId: user.id,
        });
        router.push('/onboarding/step3');
      } catch (error) {
        console.error('Error updating domain:', error);
      } finally {
        setSubmitting(false);
      }
    }
  };
  //TODO message si déjà updaté

  return (
    <>
      <HirerProfileLayout step={2}>
        <div className='flex flex-col items-center justify-center'>
          <p className=' pb-5 sm:pb-10 pt-5 text-3xl sm:text-5xl font-bold mt-6 text-center'>
            Hello {user.handle} 👋
          </p>
          <Formik
            initialValues={initialValues}
            enableReinitialize={true}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}>
            {({ isSubmitting }) => (
              <Form>
                <div className='grid grid-cols-1 gap-3 sm:gap-4'>
                  {subdomain ? (
                    <p className='text-center'>
                      You are about to link your TalentLayer ID to your domain: {subdomain}
                    </p>
                  ) : (
                    <div className='flex flex-col items-center justify-center sm:flex-row mb-5'>
                      <label className='flex flex-row'>
                        <p className='text-2xl font-semibold text-center sm:mr-4'>
                          Please input your domain name:
                        </p>
                        <Field
                          type='text'
                          id='subdomain'
                          name='subdomain'
                          className='border border-gray-300 rounded-xl p-2 m-2'
                          disabled={subdomain}
                        />
                      </label>
                    </div>
                  )}

                  <span className='text-red-500'>
                    <ErrorMessage name='subdomain' />
                  </span>

                  {isSubmitting ? (
                    <button
                      disabled
                      type='submit'
                      className='grow px-5 py-2 rounded-xl bg-pink-300 text-white'>
                      Loading...
                    </button>
                  ) : (
                    <button
                      type='submit'
                      className='grow px-5 py-2 rounded-xl bg-pink-500 text-white'>
                      Use this Id
                    </button>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </HirerProfileLayout>
    </>
  );
}

export default onboardingStep2;
