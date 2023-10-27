import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useUpdateBuilderPlace } from '../../../modules/BuilderPlace/hooks/UseUpdateBuilderPlace';
import { useGetBuilderPlaceFromOwner } from '../../../modules/BuilderPlace/hooks/UseGetBuilderPlaceFromOwner';
import { useContext } from 'react';
import TalentLayerContext from '../../../context/talentLayer';
import { useChainId, useWalletClient } from 'wagmi';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { upload } from '../../../modules/BuilderPlace/request';
import { iBuilderPlacePallete } from '../../../modules/BuilderPlace/types';

interface IFormValues {
  subdomain: string;
  palette?: iBuilderPlacePallete;
  logo?: File;
  cover?: File;
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

        let logo;
        if (values.logo) {
          logo = await upload(values.logo);
          console.log({ logo, url: logo?.variants[0] });
        }

        let cover;
        if (values.cover) {
          cover = await upload(values.cover);
          console.log({ cover, url: cover?.variants[0] });
        }

        if (builderPlaceData) {
          await updateBuilderPlaceAsync({
            subdomain: values.subdomain,
            logo: logo?.variants[0] || null,
            cover: cover?.variants[0] || null,
            name: builderPlaceData.name,
            ownerTalentLayerId: builderPlaceData.ownerTalentLayerId,
            pallete: undefined,
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
                  onChange={(event: any) => {
                    setFieldValue('logo', event.currentTarget.files[0]);
                  }}
                  className='mt-1 mb-1 block w-full rounded-xl border border-redpraha bg-midnight shadow-sm focus:ring-opacity-50'
                  placeholder=''
                />
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
                  onChange={(event: any) => {
                    setFieldValue('cover', event.currentTarget.files[0]);
                  }}
                  className='mt-1 mb-1 block w-full rounded-xl border border-redpraha bg-midnight shadow-sm focus:ring-opacity-50'
                  placeholder=''
                />
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
        )}
      </Formik>
    </>
  );
}

export default onboardingStep3;
