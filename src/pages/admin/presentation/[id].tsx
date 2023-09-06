import { useRouter } from 'next/router';
import Loading from '../../../components/Loading';
import { useContext, useState } from 'react';
import StarterKitContext from '../../../context/starterKit';
import UserNeedsMoreRights from '../../../components/UserNeedsMoreRights';
import * as Yup from 'yup';
import usePlatform from '../../../hooks/usePlatform';
import { useProvider, useSigner } from 'wagmi';
import { useChainId } from '../../../hooks/useChainId';
import { postToIPFS } from '../../../utils/ipfs';
import { createMultiStepsTransactionToast, showErrorTransactionToast } from '../../../utils/toast';
import { Field, Form, Formik } from 'formik';
import { delegateUpdatePlatformData } from '../../../components/request';
import { ethers } from 'ethers';
import { useConfig } from '../../../hooks/useConfig';
import TalentLayerPlatformID from '../../../contracts/ABI/TalentLayerPlatformID.json';
import { useWeb3Modal } from '@web3modal/react';
import { QuestionMarkCircle } from 'heroicons-react';
import SubmitButton from '../../../components/Form/SubmitButton';
import { generatePicture } from '../../../utils/ai-picture-gen';
import { Container } from '../../../components/newlayout/container';

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
  const { user, isAdmin, isActiveDelegate } = useContext(StarterKitContext);
  const platformDescription = usePlatform(id as string)?.description;
  const chainId = useChainId();
  const { open: openConnectModal } = useWeb3Modal();
  const config = useConfig();
  const provider = useProvider({ chainId });
  const { data: signer } = useSigner({
    chainId,
  });
  const [aiLoading, setAiLoading] = useState(false);

  if (!user) {
    return <Loading />;
  }
  if (!isAdmin) {
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

        let tx;
        if (isActiveDelegate) {
          const platformId = id as string;
          const response = await delegateUpdatePlatformData(platformId, chainId, user.address, cid);
          tx = response.data.transaction;
        } else {
          const contract = new ethers.Contract(
            config.contracts.talentLayerPlatformId,
            TalentLayerPlatformID.abi,
            signer,
          );
          tx = await contract.updateProfileData(id, cid);
        }

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
        {({ isSubmitting, setFieldValue, values }) => (
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
                  <div className='flex w-full items-center gap-3'>
                    <QuestionMarkCircle className='hidden' />
                    <div>
                      <h2 className='font-heading text-xs font-bold text-white mb-1'>
                        <span>Need help?</span>
                      </h2>
                      <p className='font-alt text-xs font-normal'>
                        <span className='text-gray-400'>Use our AI to generate a cool one</span>
                      </p>
                    </div>
                    <div className='ms-auto'>
                      <button
                        disabled={aiLoading}
                        onClick={async e => {
                          e.preventDefault();
                          setAiLoading(true);
                          const imageUrl = await generatePicture();
                          if (imageUrl) {
                            setFieldValue('image_url', imageUrl);
                          }
                          setAiLoading(false);
                        }}
                        className='border text-white bg-gray-700 hover:bg-gray-600 border-gray-600 rounded-md h-10 w-10 p-2 relative inline-flex items-center justify-center space-x-1 font-sans text-sm font-normal leading-5 no-underline outline-none transition-all duration-300'>
                        {aiLoading ? <Loading /> : 'GO'}
                      </button>
                    </div>
                  </div>
                  {values.image_url && (
                    <div className='flex items-center justify-center py-3'>
                      <img width='300' height='300' src={values.image_url} alt='' />
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
