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

  // console.log('subdomain', subdomain);
  // console.log('data', data);

  if (subdomain && !data) {
    console.log('no data');
    return (
      <div className='flex flex-col mt-5 pb-8'>
        <Loading />
      </div>
    );
  }

  if (!account?.isConnected || !user) {
    return (
      <Steps
        handle={slugify(data?.name)}
        description={data?.presentation}
        profilePicture={data?.profilePicture}
      />
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
        setSubmitting(false);
        router.push('/onboarding/step3');
      } catch (error) {
        console.error('Error updating domain:', error);
        setSubmitting(false);
      }
    }
  };
  //TODO message si déjà updaté

  return (
    <div className={'flex flex-col items-center justify-center'}>
      <h1>Hello {user.handle}</h1>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}>
        {({ isSubmitting }) => (
          <Form>
            <label className='flex flex-row'>
              {subdomain ? (
                <p>You are about to link your TalentLayer ID to your domain: {subdomain}</p>
              ) : (
                <>
                  <p>Please input your domain name:</p>
                  <Field
                    type='text'
                    id='subdomain'
                    name='subdomain'
                    className={`mt-1 mb-1 rounded-xl border border-redpraha bg-midnight shadow-sm focus:ring-opacity-50`}
                    disabled={subdomain}
                  />
                </>
              )}
            </label>
            <p>
              if you would like to use a different TalentLayer ID, please connect a different
              wallet. you’ll then be prompted to create a new ID
            </p>
            <span className='text-red-500'>
              <ErrorMessage name='subdomain' />
            </span>
            <SubmitButton isSubmitting={isSubmitting} label={'Use this Id'} />
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default onboardingStep2;
