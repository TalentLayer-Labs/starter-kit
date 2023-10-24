import { useWeb3Modal } from '@web3modal/react';
import { Field, Form, Formik } from 'formik';
import { useContext } from 'react';
import { usePublicClient, useWalletClient } from 'wagmi';
import * as Yup from 'yup';
import SubmitButton from '../../../components/Form/SubmitButton';
import Loading from '../../../components/Loading';
import Steps from '../../../components/Steps';
import UserNeedsMoreRights from '../../../components/UserNeedsMoreRights';
import TalentLayerContext from '../../../context/talentLayer';
import { useChainId } from '../../../hooks/useChainId';
import usePlatform from '../../../hooks/usePlatform';
import useTalentLayerClient from '../../../hooks/useTalentLayerClient';
import { createMultiStepsTransactionToast, showErrorTransactionToast } from '../../../utils/toast';
import { getBuilderPlace } from '../../../modules/BuilderPlace/queries';

interface IFormValues {
  about: string;
  website: string;
  video_url: string;
  image_url: string;
}

const validationSchema = Yup.object({
  // nothing required
});

export async function getServerSideProps({ params }: any) {
  return await getBuilderPlace(params.domain);
}

function AdminPresentation() {
  const { user, loading } = useContext(TalentLayerContext);
  const platform = usePlatform(process.env.NEXT_PUBLIC_PLATFORM_ID as string);
  const platformDescription = platform?.description;
  const chainId = useChainId();
  const { open: openConnectModal } = useWeb3Modal();
  const publicClient = usePublicClient({ chainId });
  const { data: walletClient } = useWalletClient({ chainId });
  const talentLayerClient = useTalentLayerClient();

  if (loading) {
    return <Loading />;
  }
  if (!user) {
    return <Steps />;
  }
  if (!user.isAdmin) {
    return <UserNeedsMoreRights />;
  }

  const initialValues: IFormValues = {
    about: platformDescription?.about || '',
    website: platformDescription?.website || '',
    image_url: platformDescription?.image_url || '',
    video_url: platformDescription?.video_url || '',
  };

  const onSubmit = async (
    values: IFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    if (user && publicClient && walletClient && talentLayerClient) {
      try {
        const { tx, cid } = await talentLayerClient.platform.update({
          about: values.about,
          website: values.website,
          video_url: values.video_url,
          image_url: values.image_url,
        });

        await createMultiStepsTransactionToast(
          chainId,
          {
            pending: 'Updating platform...',
            success: 'Congrats! Your platform has been updated',
            error: 'An error occurred while updating your platform',
          },
          publicClient,
          tx,
          'platform',
          cid,
        );

        setSubmitting(false);
      } catch (error) {
        showErrorTransactionToast(error);
      }
    } else {
      openConnectModal();
    }
  };

  return (
    <div className='max-w-7xl mx-auto text-stone-800'>
      <div className=' -mx-6 -mt-6 '>
        <div className='flex py-2 px-6 items-center border-b w-full border-redpraha mb-8'>
          <p className='text-2xl font-bold flex-1 mt-6'>Presentation</p>
        </div>
      </div>

      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={onSubmit}
        validationSchema={validationSchema}>
        {({ isSubmitting, values }) => (
          <Form>
            <div className='grid grid-cols-1 gap-6 border border-redpraha rounded-xl p-6 bg-white'>
              <label className='block'>
                <span className='text-stone-800'>Website</span>
                <Field
                  type='text'
                  id='website'
                  name='website'
                  className='mt-1 mb-1 block w-full rounded-xl border border-redpraha bg-midnight shadow-sm focus:ring-opacity-50'
                  placeholder=''
                />
              </label>

              <label className='block'>
                <span className='text-stone-800'>Picture Url</span>
                <Field
                  type='text'
                  id='image_url'
                  name='image_url'
                  className='mt-1 mb-1 block w-full rounded-xl border border-redpraha bg-midnight shadow-sm focus:ring-opacity-50'
                  placeholder=''
                />
                <div className='border-redpraha bg-redpraha relative w-full border transition-all duration-300 rounded-xl p-4'>
                  {values.image_url && (
                    <div className='flex items-center justify-center py-3'>
                      <img width='300' height='300' src={values.image_url} alt='image preview' />
                    </div>
                  )}
                </div>
              </label>

              <label className='block'>
                <span className='text-stone-800'>About</span>
                <Field
                  as='textarea'
                  id='about'
                  name='about'
                  rows='4'
                  className='mt-1 mb-1 block w-full rounded-xl border border-redpraha bg-midnight shadow-sm focus:ring-opacity-50'
                  placeholder=''
                />
              </label>

              <SubmitButton isSubmitting={isSubmitting} label='Update' />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AdminPresentation;
