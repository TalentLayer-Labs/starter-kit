import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import StarterKitContext from '../../../context/starterKit';
import UserNeedsMoreRights from '../../../components/UserNeedsMoreRights';
import * as Yup from 'yup';
import usePlatform from '../../../hooks/usePlatform';
import { useProvider, useSigner } from 'wagmi';
import { useChainId } from '../../../hooks/useChainId';
import { postToIPFS } from '../../../utils/ipfs';
import { createMultiStepsTransactionToast, showErrorTransactionToast } from '../../../utils/toast';
import { Field, Form, Formik } from 'formik';
import { ethers } from 'ethers';
import { useConfig } from '../../../hooks/useConfig';
import TalentLayerPlatformID from '../../../contracts/ABI/TalentLayerPlatformID.json';
import { useWeb3Modal } from '@web3modal/react';
import SubmitButton from '../../../components/Form/SubmitButton';
import { Container } from '../../../components/newlayout/container';
import Steps from '../../../components/Steps';
import Loading from '../../../components/Loading';

interface IFormValues {
  name: string;
  about: string;
  website: string;
  video_url: string;
  image_url: string;
}

const validationSchema = Yup.object({
  // nothing required
});

function AdminPresentation({ callback }: { callback?: () => void }) {
  const router = useRouter();
  const { id } = router.query;
  const { user, isAdmin } = useContext(StarterKitContext);
  const platform = usePlatform(id as string);
  const platformDescription = platform?.description;
  const chainId = useChainId();
  const { open: openConnectModal } = useWeb3Modal();
  const config = useConfig();
  const provider = useProvider({ chainId });
  const { data: signer } = useSigner({
    chainId,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isAdminOfThisPlatform, setIsAdminOfThisPlatform] = useState(false);

  // Handle loading state
  useEffect(() => {
    if (isAdmin != null && user != null && platform != null && config != null) {
      setIsAdminOfThisPlatform(platform?.address === user?.address && isAdmin);
      setIsLoading(false);
    }
  }, [isAdmin, user, platform, config]);

  if (isLoading) {
    return <Loading />;
  }
  if (!user) {
    return <Steps />;
  }
  if (!isLoading && !isAdminOfThisPlatform) {
    return <UserNeedsMoreRights />;
  }

  const initialValues: IFormValues = {
    name: platformDescription?.name || '',
    about: platformDescription?.about || '',
    website: platformDescription?.website || '',
    image_url: platformDescription?.image_url || '',
    video_url: platformDescription?.video_url || '',
  };

  const onSubmit = async (
    values: IFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    if (user && provider && signer) {
      try {
        const cid = await postToIPFS(
          JSON.stringify({
            name: values.name,
            about: values.about,
            website: values.website,
            video_url: values.video_url,
            image_url: values.image_url,
          }),
        );

        const contract = new ethers.Contract(
          config.contracts.talentLayerPlatformId,
          TalentLayerPlatformID.abi,
          signer,
        );
        const tx = await contract.updateProfileData(id, cid);

        await createMultiStepsTransactionToast(
          chainId,
          {
            pending: 'Updating platform...',
            success: 'Congrats! Your platform has been updated',
            error: 'An error occurred while updating your platform',
          },
          provider,
          tx,
          'platform',
          cid,
        );

        if (callback) {
          callback();
        }

        setSubmitting(false);
      } catch (error) {
        showErrorTransactionToast(error);
      }
    } else {
      openConnectModal();
    }
  };

  return (
    <Container>
      <p className='text-xl font-medium tracking-wider'>Configuration {'/'} Presentation</p>
      <p className='mb-6 pb-4 border-b border-gray-gray-200 font-medium'>OffChain</p>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={onSubmit}
        validationSchema={validationSchema}>
        {({ isSubmitting, values }) => (
          <Form>
            <div className='w-3/4 grid grid-cols-1 gap-6 border border-gray-700 rounded-xl p-6 bg-endnight mx-auto'>
              <label className='block'>
                <span className='text-gray-100'>Name</span>
                <Field
                  type='text'
                  id='name'
                  name='name'
                  className='mt-1 mb-1 block w-full rounded-xl border border-gray-700 bg-midnight shadow-sm focus:ring-opacity-50'
                  placeholder=''
                />
              </label>

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
    </Container>
  );
}

export default AdminPresentation;
