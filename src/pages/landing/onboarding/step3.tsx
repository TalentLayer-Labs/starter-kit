import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { useChainId, useWalletClient } from 'wagmi';
import * as Yup from 'yup';
import CustomDomain from '../../../components/CustomDomain';
import DefaultPalettes from '../../../components/DefaultPalettes';
import HirerProfileLayout from '../../../components/HirerProfileLayout';
import Loading from '../../../components/Loading';
import UploadImage from '../../../components/UploadImage';
import TalentLayerContext from '../../../context/talentLayer';
import { useGetBuilderPlaceFromOwner } from '../../../modules/BuilderPlace/hooks/UseGetBuilderPlaceFromOwner';
import { useUpdateBuilderPlace } from '../../../modules/BuilderPlace/hooks/UseUpdateBuilderPlace';
import { themes } from '../../../utils/themes';
import { generateDomainName, slugify } from '../../../modules/BuilderPlace/utils';
interface IFormValues {
  subdomain: string;
  palette: keyof typeof themes;
  logo?: string;
}

const validationSchema = Yup.object({
  subdomain: Yup.string().required('subdomain is required'),
});
function onboardingStep3() {
  const { account, user, loading } = useContext(TalentLayerContext);
  const chainId = useChainId();
  const { data: walletClient } = useWalletClient({ chainId });
  const { mutateAsync: updateBuilderPlaceAsync } = useUpdateBuilderPlace();
  const builderPlaceData = useGetBuilderPlaceFromOwner(user?.id as string);
  const router = useRouter();

  const initialValues: IFormValues = {
    subdomain: (builderPlaceData?.name && slugify(builderPlaceData.name)) || '',
    logo: builderPlaceData?.logo || '',
    palette: 'lisboa',
  };

  if (loading) {
    console.log('no data');
    return (
      <div className='flex flex-col mt-5 pb-8'>
        <Loading />
      </div>
    );
  }

  if (!builderPlaceData) {
    return (
      <div className='flex flex-col mt-5 pb-8'>
        <p>No builderPlace found associated to this wallet</p>
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
          message: builderPlaceData._id,
        });

        const subdomain = generateDomainName(values.subdomain);

        const res = await updateBuilderPlaceAsync({
          _id: builderPlaceData._id,
          subdomain: subdomain,
          logo: values.logo,
          name: builderPlaceData.name,
          ownerTalentLayerId: builderPlaceData.ownerTalentLayerId,
          palette: themes[values.palette],
          owners: builderPlaceData.owners,
          status: 'validated',
          signature,
        });
        if (res?.id) {
          router.push(`${window.location.protocol}//${subdomain}/dashboard?onboarding=1`);
        }
      } catch (e: any) {
        console.error(e);
      } finally {
        setTimeout(() => {
          setSubmitting(false);
        }, 1000);
      }
    }
  };

  return (
    <>
      <HirerProfileLayout step={3}>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}>
          {({ isSubmitting, setFieldValue, values }) => (
            <Form>
              <div className='grid grid-cols-1 gap-6'>
                <CustomDomain />

                <UploadImage
                  fieldName='logo'
                  label='logo'
                  legend='rectangle format, used in top of your place'
                  src={values.logo}
                  setFieldValue={setFieldValue}
                />

                <DefaultPalettes
                  onChange={palette => {
                    setFieldValue('palette', palette);
                  }}
                />

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
                    Sign and validate
                  </button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </HirerProfileLayout>
    </>
  );
}

export default onboardingStep3;
