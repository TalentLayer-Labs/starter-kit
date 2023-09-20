import { useWeb3Modal } from '@web3modal/react';
import { Field, Form, Formik } from 'formik';
import { useContext, useState, useEffect } from 'react';
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';
import * as Yup from 'yup';
import StarterKitContext from '../../context/starterKit';
import TalentLayerID from '../../contracts/ABI/TalentLayerID.json';
import { createMultiStepsTransactionToast, showErrorTransactionToast } from '../../utils/toast';
import Loading from '../Loading';
import SubmitButton from './SubmitButton';
import useUserById from '../../hooks/useUserById';
import { SkillsInput } from './skills-input';
import { delegateUpdateProfileData } from '../request';
import { useChainId } from '../../hooks/useChainId';
import { useConfig } from '../../hooks/useConfig';
import { QuestionMarkCircle } from 'heroicons-react';
import { generatePicture } from '../../utils/ai-picture-gen';
import { TalentLayerClient } from '@TalentLayer/client';

interface IFormValues {
  title?: string;
  role?: string;
  image_url?: string;
  video_url?: string;
  name?: string;
  about?: string;
  skills?: string;
}

const validationSchema = Yup.object({
  title: Yup.string().required('title is required'),
});

function ProfileForm({ callback }: { callback?: () => void }) {
  const config = useConfig();
  const chainId = useChainId();
  const { open: openConnectModal } = useWeb3Modal();
  const { user } = useContext(StarterKitContext);
  const { data: walletClient } = useWalletClient({ chainId });
  const publicClient = usePublicClient({ chainId });
  const { address } = useAccount();
  const [aiLoading, setAiLoading] = useState(false);
  const userDescription = user?.id ? useUserById(user?.id)?.description : null;

  const { isActiveDelegate } = useContext(StarterKitContext);
  const [tlClient, setTlClient] = useState<TalentLayerClient>();

  useEffect(() => {
    if (chainId) {
      const _tlClient = new TalentLayerClient({
        chainId,
        infuraClientId: '2TcBxC3hzB3bMUgpD3FkxI6tt4D',
        infuraClientSecret: '29e380e2b6b89499074b90b2b5b8ebb9',
      });
      setTlClient(_tlClient);
    }
  }, [chainId]);

  if (!user?.id) {
    return <Loading />;
  }

  const initialValues: IFormValues = {
    title: userDescription?.title || '',
    role: userDescription?.role || '',
    image_url: userDescription?.image_url || '',
    video_url: userDescription?.video_url || '',
    name: userDescription?.name || '',
    about: userDescription?.about || '',
    skills: userDescription?.skills_raw || '',
  };

  const generatePictureUrl = async (e: React.FormEvent, callback: (string: string) => void) => {
    e.preventDefault();
    setAiLoading(true);
    const imageUrl = await generatePicture();
    if (imageUrl) {
      callback(imageUrl);
    }
    setAiLoading(false);
  };

  const onSubmit = async (
    values: IFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    if (user && walletClient && publicClient) {
      try {
        const cid = await tlClient?.uploadProfileDataToIpfs({
          title: values.title,
          role: values.role,
          image_url: values.image_url,
          video_url: values.video_url,
          name: values.name,
          about: values.about,
          skills: values.skills,
        });

        let tx;
        console.log("SDK consumer delegate: ", isActiveDelegate)

        if (isActiveDelegate) {
          const response = await delegateUpdateProfileData(chainId, user.id, user.address, cid);
          tx = response.data.transaction;
        } else {
          tx = await tlClient?.updateProfileData(user.id, cid || "");  
        }

        await createMultiStepsTransactionToast(
          chainId,
          {
            pending: 'Updating profile...',
            success: 'Congrats! Your profile has been updated',
            error: 'An error occurred while updating your profile',
          },
          publicClient,
          tx,
          'user',
          cid,
        );

        if (callback) {
          callback();
        }

        setSubmitting(false);
      } catch (error) {
        console.log(error);
        showErrorTransactionToast(error);
      }
    } else {
      openConnectModal();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {({ isSubmitting, setFieldValue, values }) => (
        <Form>
          <div className='grid grid-cols-1 gap-6 border border-gray-700 rounded-xl p-6 bg-endnight'>
            <label className='block'>
              <span className='text-gray-100'>Title</span>
              <Field
                type='text'
                id='title'
                name='title'
                className='mt-1 mb-1 block w-full rounded-xl border border-gray-700 bg-midnight shadow-sm focus:ring-opacity-50'
                placeholder=''
              />
            </label>
            <label className='block hidden'>
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
              <span className='text-gray-100'>Role</span>
              <Field
                as='select'
                id='role'
                name='role'
                className='mt-1 mb-1 block w-full rounded-xl border border-gray-700 bg-midnight shadow-sm focus:ring-opacity-50'
                placeholder=''>
                <option value=''></option>
                <option value='buyer'>Freelance</option>
                <option value='seller'>Hirer</option>
                <option value='buyer-seller'>Both</option>
              </Field>
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
                      onClick={e =>
                        generatePictureUrl(e, newUrl => setFieldValue('image_url', newUrl))
                      }
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

            <label className='block'>
              <span className='text-gray-100'>Skills</span>

              <SkillsInput initialValues={userDescription?.skills_raw} entityId={'skills'} />

              <Field type='hidden' id='skills' name='skills' />
            </label>

            <SubmitButton isSubmitting={isSubmitting} label='Update' />
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default ProfileForm;
