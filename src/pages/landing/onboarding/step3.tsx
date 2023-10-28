import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useUpdateBuilderPlace } from '../../../modules/BuilderPlace/hooks/UseUpdateBuilderPlace';
import { useGetBuilderPlaceFromOwner } from '../../../modules/BuilderPlace/hooks/UseGetBuilderPlaceFromOwner';
import React, { useContext, useState } from 'react';
import TalentLayerContext from '../../../context/talentLayer';
import { useChainId, useWalletClient } from 'wagmi';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { iBuilderPlacePalette } from '../../../modules/BuilderPlace/types';
import Loading from '../../../components/Loading';
import { uploadImage } from '../../../modules/BuilderPlace/utils';
import SubmitButton from '../../../components/Form/SubmitButton';

interface IFormValues {
  subdomain: string;
  palette?: iBuilderPlacePalette;
  logo?: string;
  cover?: string;
}

const validationSchema = Yup.object({
  subdomain: Yup.string().required('subdomain is required'),
});
function onboardingStep3() {
  const { account, user, loading } = useContext(TalentLayerContext);
  const chainId = useChainId();
  const { data: walletClient } = useWalletClient({ chainId });
  const { data: updateBuilderPlace, mutateAsync: updateBuilderPlaceAsync } =
    useUpdateBuilderPlace();
  const builderPlaceData = useGetBuilderPlaceFromOwner(user?.id as string);
  const router = useRouter();
  const [logoLoader, setLogoLoader] = useState(false);
  const [coverLoader, setCoverLoader] = useState(false);
  const [logoErrorMessage, setLogoErrorMessage] = useState('');
  const [coverErrorMessage, setCoverErrorMessage] = useState('');

  const initialValues: IFormValues = {
    subdomain: builderPlaceData?.subdomain || '',
    logo: builderPlaceData?.logo || '',
    cover: builderPlaceData?.cover || '',
  };

  if (loading) {
    console.log('no data');
    return (
      <div className='flex flex-col mt-5 pb-8'>
        <Loading />
      </div>
    );
  }
  const handleSubmit = async (
    values: IFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    if (walletClient && account?.address) {
      setSubmitting(true);
      try {
        /**
         * @dev Sign message to prove ownership of the address
         */
        const signature = await walletClient.signMessage({
          account: account.address,
          message: values.subdomain,
        });

        if (builderPlaceData) {
          await updateBuilderPlaceAsync({
            subdomain: values.subdomain,
            logo: values.logo || undefined,
            cover: values.cover || undefined,
            name: builderPlaceData.name,
            ownerTalentLayerId: builderPlaceData.ownerTalentLayerId,
            palette: undefined,
            owners: builderPlaceData.owners,
            status: builderPlaceData.status,
            signature,
          });
          router.push(`${window.location.protocol}//${values.subdomain}/dashboard`);
        }
      } catch (e: any) {
        console.error(e);
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <>
      <p>Hirer onboarding - step3</p>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}>
        {({ isSubmitting, setFieldValue, values }) => (
          <>
            <h1>3</h1>
            <p>Configure your workspace</p>
            <Form>
              <div className='grid grid-cols-1 gap-6'>
                <label className='block'>
                  <span className='text-stone-800'>custom domain</span>
                  <Field
                    type='text'
                    id='subdomain'
                    name='subdomain'
                    className='mt-1 mb-1 block w-full rounded-xl border border-redpraha bg-midnight shadow-sm focus:ring-opacity-50'
                    placeholder={`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`}
                  />
                </label>
                <span className='text-red-500'>
                  <ErrorMessage name='subdomain' />
                </span>
                <label className='block'>
                  <span className='text-stone-800'>Logo</span>
                  <input
                    type='file'
                    id='logo'
                    name='logo'
                    onChange={async (event: any) => {
                      await uploadImage(
                        event.currentTarget.files[0],
                        setFieldValue,
                        setLogoErrorMessage,
                        'logo',
                        setLogoLoader,
                        user.handle,
                      );
                    }}
                    className='mt-1 mb-1 block w-full rounded-xl border border-redpraha bg-midnight shadow-sm focus:ring-opacity-50'
                    placeholder=''
                  />
                  {logoLoader && <Loading />}
                  {!!values.logo && (
                    <div className='flex items-center justify-center py-3'>
                      <img width='300' height='300' src={values.logo} alt='' />
                    </div>
                  )}
                </label>
                <span className='text-red-500'>
                  <p>{logoErrorMessage}</p>
                </span>
                <label className='block'>
                  <span className='text-stone-800'>Cover</span>
                  <input
                    type='file'
                    id='cover'
                    name='cover'
                    onChange={async (event: any) => {
                      await uploadImage(
                        event.currentTarget.files[0],
                        setFieldValue,
                        setCoverErrorMessage,
                        'cover',
                        setCoverLoader,
                        user.handle,
                      );
                    }}
                    className='mt-1 mb-1 block w-full rounded-xl border border-redpraha bg-midnight shadow-sm focus:ring-opacity-50'
                    placeholder=''
                  />
                  {coverLoader && <Loading />}
                  {!!values.cover && (
                    <div className='flex items-center justify-center py-3'>
                      <img width='300' height='300' src={values.cover} alt='' />
                    </div>
                  )}
                </label>
                <span className='text-red-500'>
                  <p>{coverErrorMessage}</p>
                </span>
                <SubmitButton isSubmitting={isSubmitting} label={"I'm done"} />
              </div>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
}

export default onboardingStep3;
