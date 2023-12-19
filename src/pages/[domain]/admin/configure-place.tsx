import { ErrorMessage, Field, Form, Formik } from 'formik';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useColor } from 'react-color-palette';
import 'react-color-palette/css';
import { useChainId, useWalletClient } from 'wagmi';
import * as Yup from 'yup';
import AccessDenied from '../../../components/AccessDenied';
import AdminSettingsLayout from '../../../components/AdminSettingsLayout';
import CustomDomain from '../../../components/CustomDomain';
import CustomizePalette from '../../../components/CustomizePalette';
import DefaultPalettes from '../../../components/DefaultPalettes';
import Loading from '../../../components/Loading';
import UploadImage from '../../../components/UploadImage';
import TalentLayerContext from '../../../context/talentLayer';
import BuilderPlaceContext from '../../../modules/BuilderPlace/context/BuilderPlaceContext';
import { useUpdateBuilderPlace } from '../../../modules/BuilderPlace/hooks/UseUpdateBuilderPlace';
import { IBuilderPlace, iBuilderPlacePalette } from '../../../modules/BuilderPlace/types';
import { slugify } from '../../../modules/BuilderPlace/utils';
import { sharedGetServerSideProps } from '../../../utils/sharedGetServerSideProps';
import { themes } from '../../../utils/themes';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return sharedGetServerSideProps(context);
}

interface IFormValues {
  subdomain: string;
  palette?: iBuilderPlacePalette;
  logo?: string;
  name: string;
  baseline: string;
  about: string;
  aboutTech: string;
  profilePicture?: string;
  cover?: string;
}

const validationSchema = Yup.object({
  subdomain: Yup.string().required('subdomain is required'),
});

function ConfigurePlace(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { account, loading } = useContext(TalentLayerContext);
  const { isBuilderPlaceOwner, builderPlace } = useContext(BuilderPlaceContext);
  const chainId = useChainId();
  const { data: walletClient } = useWalletClient({ chainId });
  const { mutateAsync: updateBuilderPlaceAsync } = useUpdateBuilderPlace();
  const router = useRouter();
  const [palette, setPalette] = useState<iBuilderPlacePalette | undefined>(builderPlace?.palette);
  const [colorName, setColorName] = useState('primary');
  const [color, setColor] = useColor(
    palette ? palette[colorName as keyof iBuilderPlacePalette] : '#FF71A2',
  );

  const initialValues: IFormValues = {
    subdomain:
      builderPlace?.subdomain?.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN as string}`, '') ||
      (builderPlace?.name && slugify(builderPlace.name)) ||
      '',
    logo: builderPlace?.logo || '',
    palette,
    name: builderPlace?.name || '',
    baseline: builderPlace?.baseline || '',
    about: builderPlace?.about || '',
    aboutTech: builderPlace?.aboutTech || '',
    profilePicture: builderPlace?.profilePicture || '',
    cover: builderPlace?.cover || '',
  };

  useEffect(() => {
    let timeoutId: string | number | NodeJS.Timeout | undefined;
    // Prevents max stack depth being called
    const delayedEffect = () => {
      setPalette(prevPalette => {
        if (!prevPalette) return;
        return { ...prevPalette, [colorName]: color.hex };
      });
    };

    timeoutId = setTimeout(delayedEffect, 10);
    return () => clearTimeout(timeoutId);
  }, [color]);

  useEffect(() => {
    if (!palette) return;

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
    if (walletClient && account?.address && builderPlace) {
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
          name: values.name,
          baseline: values.baseline,
          about: values.about,
          aboutTech: values.aboutTech,
          profilePicture: values.profilePicture,
          cover: values.cover,
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
      <AdminSettingsLayout title={'configure your place'} route={'/admin'}>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}>
          {({ isSubmitting, setFieldValue, values }) => (
            <Form>
              <div className='grid grid-cols-1 gap-6'>
                <div>
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
                </div>

                <div>
                  <label className='block'>
                    <span className='font-bold text-md'>organization baseline</span>
                    <Field
                      type='text'
                      id='baseline'
                      name='baseline'
                      className='mt-1 mb-1 block w-full rounded-xl border-2 border-info bg-base-200 shadow-sm focus:ring-opacity-50'
                      placeholder='your organization baseline'
                    />
                  </label>
                  <span className='text-red-500'>
                    <ErrorMessage name='baseline' />
                  </span>
                </div>

                <div>
                  <label className='block'>
                    <span className='font-bold text-md'>about your organization</span>
                    <Field
                      as='textarea'
                      id='about'
                      name='about'
                      rows='9'
                      className='mt-1 mb-1 block w-full rounded-xl border-2 border-info bg-base-200 shadow-sm focus:ring-opacity-50'
                      placeholder='tell everyone about what you work on and why you’re doing it (ps: open-source contributors love to hear about your mission and vision)'
                    />
                  </label>
                  <p className='font-alt text-xs font-normal opacity-60'>
                    <span className='text-base-content'>
                      This supports markdown format. Learn more about how to write markdown{' '}
                      <a
                        href='https://stackedit.io/app#'
                        target='_blank'
                        className='underline text-info'>
                        here
                      </a>
                      .
                    </span>
                  </p>
                  <span className='text-red-500'>
                    <ErrorMessage name='about' />
                  </span>
                </div>

                <div>
                  <label className='block'>
                    <span className='font-bold text-md'>about your tech</span>
                    <Field
                      as='textarea'
                      id='aboutTech'
                      name='aboutTech'
                      rows='9'
                      className='mt-1 mb-1 block w-full rounded-xl border-2 border-info bg-base-200 shadow-sm focus:ring-opacity-50'
                    />
                  </label>
                  <p className='font-alt text-xs font-normal opacity-60'>
                    <span className='text-base-content'>
                      This supports markdown format. Learn more about how to write markdown{' '}
                      <a
                        href='https://stackedit.io/app#'
                        target='_blank'
                        className='underline text-info'>
                        here
                      </a>
                      .
                    </span>
                  </p>
                  <span className='text-red-500'>
                    <ErrorMessage name='aboutTech' />
                  </span>
                </div>

                <CustomDomain />

                <UploadImage
                  fieldName='logo'
                  label='logo'
                  legend='rectangle format, used in top of your place'
                  src={values.logo}
                  setFieldValue={setFieldValue}
                />

                <UploadImage
                  fieldName='profilePicture'
                  label='profile picture'
                  legend='large rectangle format, used in top of your place'
                  src={values.profilePicture}
                  setFieldValue={setFieldValue}
                />

                <UploadImage
                  fieldName='cover'
                  label='cover'
                  legend='large rectangle format, used in top of your place'
                  src={values.cover}
                  setFieldValue={setFieldValue}
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
