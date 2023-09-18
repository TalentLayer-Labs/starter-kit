import { useWeb3Modal } from '@web3modal/react';
import { Field, Form, Formik } from 'formik';
import { useContext } from 'react';
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';
import * as Yup from 'yup';
import SubmitButton from '../../components/Form/SubmitButton';
import Loading from '../../components/Loading';
import Steps from '../../components/Steps';
import UserNeedsMoreRights from '../../components/UserNeedsMoreRights';
import TalentLayerContext from '../../context/talentLayer';
import TalentLayerPlatformID from '../../contracts/ABI/TalentLayerPlatformID.json';
import { useChainId } from '../../hooks/useChainId';
import { useConfig } from '../../hooks/useConfig';
import usePlatform from '../../hooks/usePlatform';
import { postToIPFS } from '../../utils/ipfs';
import { createMultiStepsTransactionToast, showErrorTransactionToast } from '../../utils/toast';

interface IFormValues {
  about: string;
  website: string;
  video_url: string;
  image_url: string;
}

const validationSchema = Yup.object({
  // nothing required
});

function AdminPresentation() {
  const { user, loading } = useContext(TalentLayerContext);
  const platform = usePlatform(process.env.NEXT_PUBLIC_PLATFORM_ID as string);
  const platformDescription = platform?.description;
  const chainId = useChainId();
  const { open: openConnectModal } = useWeb3Modal();
  const config = useConfig();
  const publicClient = usePublicClient({ chainId });
  const { data: walletClient } = useWalletClient({ chainId });
  const { address } = useAccount();

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
    if (user && publicClient && walletClient) {
      try {
        const cid = await postToIPFS(
          JSON.stringify({
            about: values.about,
            website: values.website,
            video_url: values.video_url,
            image_url: values.image_url,
          }),
        );

        const tx = await walletClient.writeContract({
          address: config.contracts.talentLayerId,
          abi: TalentLayerPlatformID.abi,
          functionName: 'updateProfileData',
          args: [user.id, cid],
          account: address,
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
    <div className='max-w-7xl mx-auto text-gray-200 sm:px-4 lg:px-0'>
      <div className=' -mx-6 -mt-6 '>
        <div className='flex py-2 px-6 items-center border-b w-full border-gray-700 mb-8'>
          <p className='text-2xl font-medium flex-1'>Presentation</p>
        </div>
      </div>

      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={onSubmit}
        validationSchema={validationSchema}>
        {({ isSubmitting, values }) => (
          <Form>
            <div className='grid grid-cols-1 gap-6 border border-gray-700 rounded-xl p-6 bg-endnight'>
              <label className='block'>
                <span className='text-gray-100'>Website</span>
                <Field
                  type='text'
                  id='website'
                  name='website'
                  className='mt-1 mb-1 block w-full rounded-xl border border-gray-700 bg-midnight shadow-sm focus:ring-opacity-50'
                  placeholder=''
                />
              </label>

              <label className='block'>
                <span className='text-gray-100'>Picture Url</span>
                <Field
                  type='text'
                  id='image_url'
                  name='image_url'
                  className='mt-1 mb-1 block w-full rounded-xl border border-gray-700 bg-midnight shadow-sm focus:ring-opacity-50'
                  placeholder=''
                />
                <div className='border-gray-700 bg-gray-800 relative w-full border transition-all duration-300 rounded-xl p-4'>
                  {values.image_url && (
                    <div className='flex items-center justify-center py-3'>
                      <img width='300' height='300' src={values.image_url} alt='image preview' />
                    </div>
                  )}
                </div>
              </label>

              <label className='block'>
                <span className='text-gray-100'>About</span>
                <Field
                  as='textarea'
                  id='about'
                  name='about'
                  rows='4'
                  className='mt-1 mb-1 block w-full rounded-xl border border-gray-700 bg-midnight shadow-sm focus:ring-opacity-50'
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
