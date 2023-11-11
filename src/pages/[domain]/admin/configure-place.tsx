import { Form, Formik } from 'formik';
import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useColor } from 'react-color-palette';
import 'react-color-palette/css';
import { useChainId, useWalletClient } from 'wagmi';
import * as Yup from 'yup';
import AdminSettingsLayout from '../../../components/AdminSettingsLayout';
import CustomDomain from '../../../components/CustomDomain';
import CustomizePalette from '../../../components/CustomizePalette';
import DefaultPalettes from '../../../components/DefaultPalettes';
import Loading from '../../../components/Loading';
import UploadLogo from '../../../components/UploadLogo';
import TalentLayerContext from '../../../context/talentLayer';
import { useUpdateBuilderPlace } from '../../../modules/BuilderPlace/hooks/UseUpdateBuilderPlace';
import { getBuilderPlace } from '../../../modules/BuilderPlace/queries';
import { IBuilderPlace, iBuilderPlacePalette } from '../../../modules/BuilderPlace/types';
import { themes } from '../../../utils/themes';
import { slugify } from '../../../modules/BuilderPlace/utils';
import BuilderPlaceContext from '../../../modules/BuilderPlace/context/BuilderPlaceContext';
import AccessDenied from '../../../components/AccessDenied';

interface IFormValues {
  subdomain: string;
  palette: iBuilderPlacePalette;
  logo?: string;
}

export async function getServerSideProps({ params }: any) {
  return await getBuilderPlace(params.domain);
}

const validationSchema = Yup.object({
  subdomain: Yup.string().required('subdomain is required'),
});

function ConfigurePlace(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { account, loading } = useContext(TalentLayerContext);
  const { isBuilderPlaceOwner } = useContext(BuilderPlaceContext);
  const chainId = useChainId();
  const { data: walletClient } = useWalletClient({ chainId });
  const { mutateAsync: updateBuilderPlaceAsync } = useUpdateBuilderPlace();
  const builderPlace = props.builderPlace as IBuilderPlace;
  const router = useRouter();
  const [logoLoader, setLogoLoader] = useState(false);
  const [logoErrorMessage, setLogoErrorMessage] = useState('');
  const [palette, setPalette] = useState<iBuilderPlacePalette>(props.builderPlace?.palette);

  const [colorName, setColorName] = useState('primary');
  const [color, setColor] = useColor(palette[colorName as keyof iBuilderPlacePalette]);

  const initialValues: IFormValues = {
    subdomain:
      builderPlace.subdomain?.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN as string}`, '') ||
      (builderPlace?.name && slugify(builderPlace.name)) ||
      '',
    logo: builderPlace.logo || '',
    palette,
  };

  useEffect(() => {
    let timeoutId: string | number | NodeJS.Timeout | undefined;
    // Prevents max stack depth being called
    const delayedEffect = () => {
      setPalette(prevPalette => {
        return { ...prevPalette, [colorName]: color.hex };
      });
    };

    timeoutId = setTimeout(delayedEffect, 10);
    return () => clearTimeout(timeoutId);
  }, [color]);

  useEffect(() => {
    document.documentElement.style.setProperty('--primary', palette.primary);
    document.documentElement.style.setProperty('--primary-50', palette.primary + '60');
    document.documentElement.style.setProperty('--primary-focus', palette.primaryFocus);
    document.documentElement.style.setProperty('--primary-content', palette.primaryContent);
    document.documentElement.style.setProperty('--base-100', palette.base100);
    document.documentElement.style.setProperty('--base-200', palette.base200);
    document.documentElement.style.setProperty('--base-300', palette.base300);
    document.documentElement.style.setProperty('--base-content', palette.baseContent);
    document.documentElement.style.setProperty('--info', palette.info);
    document.documentElement.style.setProperty('--info-content', palette.infoContent);
    document.documentElement.style.setProperty('--success', palette.success);
    document.documentElement.style.setProperty('--success-50', palette.success + '60');
    document.documentElement.style.setProperty('--success-content', palette.successContent);
    document.documentElement.style.setProperty('--warning', palette.warning);
    document.documentElement.style.setProperty('--warning-content', palette.warningContent);
    document.documentElement.style.setProperty('--error', palette.error);
    document.documentElement.style.setProperty('--error-content', palette.errorContent);
  }, [palette]);

  if (loading) {
    console.log('no data');
    return (
      <div className='flex flex-col mt-5 pb-8'>
        <Loading />
      </div>
    );
  }

  if (!isBuilderPlaceOwner) {
    return <AccessDenied />;
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
          message: builderPlace._id,
        });
        const fullSubdomain = `${values.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;

        await updateBuilderPlaceAsync({
          _id: builderPlace._id,
          subdomain: fullSubdomain,
          logo: values.logo,
          name: builderPlace.name,
          ownerTalentLayerId: builderPlace.ownerTalentLayerId,
          palette,
          owners: builderPlace.owners,
          status: 'validated',
          signature,
        });
        router.push(`${window.location.protocol}//${fullSubdomain}/dashboard`);
      } catch (e: any) {
        console.error(e);
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <>
      <AdminSettingsLayout title={'customize Your BuilderPlace'} route={'/admin'}>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}>
          {({ isSubmitting, setFieldValue, values }) => (
            <Form>
              <div className='grid grid-cols-1 gap-6'>
                <CustomDomain />

                <UploadLogo
                  logo={values.logo}
                  logoLoader={logoLoader}
                  logoErrorMessage={logoErrorMessage}
                  setLogoLoader={setLogoLoader}
                  setFieldValue={setFieldValue}
                  setLogoErrorMessage={setLogoErrorMessage}
                />

                <DefaultPalettes
                  onChange={palette => {
                    setPalette(themes[palette as keyof typeof themes]);
                  }}
                />

                {palette && (
                  <CustomizePalette
                    palette={palette}
                    color={color}
                    setColor={setColor}
                    setColorName={setColorName}
                  />
                )}

                {isSubmitting ? (
                  <button
                    disabled
                    type='submit'
                    className='grow px-5 py-2 rounded-xl bg-primary-50 text-primary'>
                    Loading...
                  </button>
                ) : (
                  <button
                    type='submit'
                    className='grow px-5 py-2 rounded-xl bg-primary text-primary'>
                    Sign and validate
                  </button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </AdminSettingsLayout>
    </>
  );
}

export default ConfigurePlace;
