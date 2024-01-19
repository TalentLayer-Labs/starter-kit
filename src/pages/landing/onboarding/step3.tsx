import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useChainId, useWalletClient } from 'wagmi';
import * as Yup from 'yup';
import CustomDomain from '../../../components/CustomDomain';
import DefaultPalettes from '../../../components/DefaultPalettes';
import HirerProfileLayout from '../../../components/HirerProfileLayout';
import UploadImage from '../../../components/UploadImage';
import TalentLayerContext from '../../../context/talentLayer';
import { themes } from '../../../utils/themes';
import { generateDomainName, slugify } from '../../../modules/BuilderPlace/utils';
import { sendVerificationEmail } from '../../../modules/BuilderPlace/request';
import { createVerificationEmailToast } from '../../../modules/BuilderPlace/utils/toast';
import { useGetBuilderPlaceById } from '../../../modules/BuilderPlace/hooks/UseGetBuilderPlaceById';
import { useValidateBuilderPlaceAndOwner } from '../../../modules/BuilderPlace/hooks/UseValidateBuilderPlaceAndOwner';
import ConnectBlock from '../../../components/ConnectBlock';
import { showErrorTransactionToast } from '../../../utils/toast';
import Loading from '../../../components/Loading';

interface IFormValues {
  subdomain: string;
  palette: keyof typeof themes;
  logo?: string;
}

const validationSchema = Yup.object({
  subdomain: Yup.string().required('subdomain is required'),
});
function onboardingStep3() {
  const { account, user, workerProfile, loading } = useContext(TalentLayerContext);
  const chainId = useChainId();
  const router = useRouter();
  const { userId, builderPlaceId } = router.query;
  const { data: walletClient } = useWalletClient({ chainId });
  const { mutateAsync: validate } = useValidateBuilderPlaceAndOwner();
  const builderPlaceData = useGetBuilderPlaceById(builderPlaceId as string);

  const initialValues: IFormValues = {
    subdomain: (builderPlaceData?.name && slugify(builderPlaceData.name)) || '',
    logo: builderPlaceData?.logo || '',
    palette: 'lisboa',
  };

  if (loading) {
    return (
      <HirerProfileLayout step={3}>
        <div className='p-8 flex flex-col items-center'>
          <Loading />
        </div>
      </HirerProfileLayout>
    );
  }

  if (!account?.isConnected) {
    return (
      <HirerProfileLayout step={3}>
        <div className='p-8 flex flex-col items-center'>
          <ConnectBlock />
        </div>
      </HirerProfileLayout>
    );
  }

  if (!builderPlaceData) {
    return (
      <HirerProfileLayout step={2}>
        <div className={'flex items-center justify-center'}>
          <span>
            You first need to{' '}
            <strong
              className={`cursor-pointer text-pink-500`}
              onClick={() => router.push(`/onboarding`)}>
              {' '}
              create a BuilderPlace
            </strong>
          </span>
        </div>
      </HirerProfileLayout>
    );
  }

  const handleSubmit = async (
    values: IFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    if (walletClient && account?.address && userId && user?.id) {
      setSubmitting(true);
      try {
        const subdomain = generateDomainName(values.subdomain);

        /**
         * @dev: send validation email to owner to validate email
         */
        if (workerProfile) {
          await sendVerificationEmail(
            workerProfile.email,
            userId as string,
            workerProfile.name,
            subdomain,
          );
          await createVerificationEmailToast();
        }

        /**
         * @dev Sign message to prove ownership of the address
         */
        const signature = await walletClient.signMessage({
          account: account.address,
          message: builderPlaceData.id.toString(),
        });

        /**
         * @dev: validate builderPlace and owner with signature
         */
        const res = await validate({
          builderPlaceId: builderPlaceData.id.toString(),
          ownerId: typeof userId === 'string' ? userId : userId[0],
          subdomain: subdomain,
          palette: themes[values.palette],
          logo: values.logo,
          signature,
        });

        if (res?.error) {
          throw new Error(res.error);
        }

        if (res?.message) {
          router.push(`${window.location.protocol}//${subdomain}/dashboard?hireronboarding=1`);
        }
      } catch (error: any) {
        showErrorTransactionToast(error.message);
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
