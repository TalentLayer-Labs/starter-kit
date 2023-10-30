import { ErrorMessage, Field, Form, Formik } from 'formik';
import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { ColorPicker, useColor } from 'react-color-palette';
import 'react-color-palette/css';
import { useChainId, useWalletClient } from 'wagmi';
import * as Yup from 'yup';
import HirerProfileLayout from '../../../components/HirerProfileLayout';
import Loading from '../../../components/Loading';
import TalentLayerContext from '../../../context/talentLayer';
import { useGetBuilderPlaceFromOwner } from '../../../modules/BuilderPlace/hooks/UseGetBuilderPlaceFromOwner';
import { useUpdateBuilderPlace } from '../../../modules/BuilderPlace/hooks/UseUpdateBuilderPlace';
import { getBuilderPlace } from '../../../modules/BuilderPlace/queries';
import { iBuilderPlacePalette } from '../../../modules/BuilderPlace/types';
import { uploadImage } from '../../../modules/BuilderPlace/utils';

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
  const { account, user, loading } = useContext(TalentLayerContext);
  const chainId = useChainId();
  const { data: walletClient } = useWalletClient({ chainId });
  const { data: updateBuilderPlace, mutateAsync: updateBuilderPlaceAsync } =
    useUpdateBuilderPlace();
  const builderPlaceData = useGetBuilderPlaceFromOwner(user?.id as string);
  const router = useRouter();
  const [logoLoader, setLogoLoader] = useState(false);
  const [logoErrorMessage, setLogoErrorMessage] = useState('');
  const [palette, setPalette] = useState<iBuilderPlacePalette>(props.builderPlace?.palette);

  const [colorName, setColorName] = useState('primary');
  const [color, setColor] = useColor(palette[colorName as keyof iBuilderPlacePalette]);

  const initialValues: IFormValues = {
    subdomain: builderPlaceData?.subdomain || '',
    logo: builderPlaceData?.logo || '',
    palette,
  };

  useEffect(() => {
    let timeoutId: string | number | NodeJS.Timeout | undefined;
    // Prevents max stack depth being called
    const delayedEffect = () => {

      setPalette(prevPalette => {
        return { ...prevPalette, [colorName]: color.hex };
      });
    }

    timeoutId = setTimeout(delayedEffect, 10);
    return () => clearTimeout(timeoutId);
  }, [color]);

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
        <p>No builderPlace found in link to this wallet</p>
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

        await updateBuilderPlaceAsync({
          subdomain: values.subdomain,
          logo: values.logo,
          name: builderPlaceData.name,
          ownerTalentLayerId: builderPlaceData.ownerTalentLayerId,
          palette,
          owners: builderPlaceData.owners,
          status: 'validated',
          signature,
        });
        router.push(`${window.location.protocol}//${values.subdomain}/dashboard`);
      } catch (e: any) {
        console.error(e);
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <>
      <HirerProfileLayout step={0}>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}>
          {({ isSubmitting, setFieldValue, values }) => (
            <Form>
              <div className='grid grid-cols-1 gap-6'>
                <label className='block'>
                  <span className='text-stone-800 font-bold text-md'>custom domain</span>
                  <Field
                    type='text'
                    id='subdomain'
                    name='subdomain'
                    className='mt-1 mb-1 block w-full rounded-xl border-2 border-gray-200 bg-midnight shadow-sm focus:ring-opacity-50'
                    placeholder={`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`}
                  />
                </label>
                <span className='text-red-500'>
                  <ErrorMessage name='subdomain' />
                </span>
                <label className='block'>
                  <span className='text-stone-800 font-bold text-md'>logo</span>
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
                        user?.handle,
                      );
                    }}
                    className='mt-1 mb-1 block w-full rounded-xl border-2 border-gray-200 shadow-sm focus:ring-opacity-50'
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

                {palette && (
                  <label className='block'>
                    <span className='text-stone-800 font-bold text-md'>
                      customize your current palette
                    </span>

                    <div className='flex flex-col gap-2 mt-1'>
                      <label className=' peer-checked:border-blue-500 border-2 border-solid rounded-lg flex flex-wrap items-center p-2 w-full'>
                        {Object.keys(palette).map(color => {
                          if (color !== '_id')
                            return (
                              <div
                                className='group relative inline-block w-[36px] h-[36px] border'
                                style={{
                                  backgroundColor: palette[color as keyof iBuilderPlacePalette],
                                }}
                                onClick={() => setColorName(color)}>
                                <span className="absolute hidden group-hover:flex -top-2 -right-3 translate-x-full w-auto px-2 py-1 bg-gray-700 rounded-lg text-center text-white text-sm before:content-[''] before:absolute before:top-1/2  before:right-[100%] before:-translate-y-1/2 before:border-8 before:border-y-transparent before:border-l-transparent before:border-r-gray-700 z-50">
                                  {color} <br />
                                  {palette[color as keyof iBuilderPlacePalette]}
                                </span>
                              </div>
                            );
                        })}
                        <div className='w-full mt-4'>
                          <ColorPicker color={color} onChange={setColor} />
                        </div>
                      </label>
                    </div>
                  </label>
                )}

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

export default ConfigurePlace;
