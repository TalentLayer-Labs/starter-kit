import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useUpdateBuilderPlace } from '../../../modules/BuilderPlace/hooks/UseUpdateBuilderPlace';
import { useGetBuilderPlaceFromOwner } from '../../../modules/BuilderPlace/hooks/UseGetBuilderPlaceFromOwner';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import TalentLayerContext from '../../../context/talentLayer';
import { useChainId, useWalletClient } from 'wagmi';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { upload } from '../../../modules/BuilderPlace/request';
import { iBuilderPlacePalette } from '../../../modules/BuilderPlace/types';
import Loading from '../../../components/Loading';

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

  const initialValues: IFormValues = {
    subdomain: builderPlaceData?.subdomain || '',
  };

  const handleSubmit = async (
    values: IFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    if (walletClient && account?.address) {
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

          setSubmitting(false);
          router.push(`${window.location.protocol}//${values.subdomain}/dashboard`);
        }
      } catch (e: any) {
        console.error(e);
      }
    }
  };

  const uploadImage = async (
    file: File,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
    fieldName: string,
    setLoader: Dispatch<SetStateAction<boolean>>,
  ) => {
    setLoader(true);
    const profilePictureUrl = await upload(file);
    console.log({ logo: profilePictureUrl, url: profilePictureUrl?.variants[0] });
    setFieldValue(fieldName, profilePictureUrl?.variants[0]);
    setLoader(false);
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
          <Form>
            <div className='grid grid-cols-1 gap-6'>
              <label className='block'>
                <span className='text-stone-800'>Subdomain</span>
                <Field
                  type='text'
                  id='subdomain'
                  name='subdomain'
                  className='mt-1 mb-1 block w-full rounded-xl border border-redpraha bg-midnight shadow-sm focus:ring-opacity-50'
                  placeholder=''
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
                        'logo',
                        setLogoLoader,
                      );
                    }}
                    className='mt-1 mb-1 block w-full rounded-xl border border-redpraha bg-midnight shadow-sm focus:ring-opacity-50'
                    placeholder=''
                  />
                  {logoLoader && <Loading />}
                  {values.logo && (
                    <div className='flex items-center justify-center py-3'>
                      <img width='300' height='300' src={values.logo} alt='' />
                    </div>
                  )}
                </label>
                <span className='text-red-500'>
                  <ErrorMessage name='logo' />
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
                        'cover',
                        setCoverLoader,
                      );
                    }}
                    className='mt-1 mb-1 block w-full rounded-xl border border-redpraha bg-midnight shadow-sm focus:ring-opacity-50'
                    placeholder=''
                  />
                  {coverLoader && <Loading />}
                  {values.cover && (
                    <div className='flex items-center justify-center py-3'>
                      <img width='300' height='300' src={values.cover} alt='' />
                    </div>
                  )}
                </label>
                <span className='text-red-500'>
                  <ErrorMessage name='cover' />
                </span>

                <button
                  type='submit'
                  className='grow px-5 py-2 rounded-xl bg-redpraha text-stone-800'>
                  I'm done
                </button>
              </div>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
}

export default onboardingStep3;
