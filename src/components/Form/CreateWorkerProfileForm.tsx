import { useWeb3Modal } from '@web3modal/react';
import { Field, Form, Formik } from 'formik';
import { QuestionMarkCircle } from 'heroicons-react';
import { useContext, useState } from 'react';
import { usePublicClient, useWalletClient } from 'wagmi';
import * as Yup from 'yup';
import TalentLayerContext from '../../context/talentLayer';
import { useChainId } from '../../hooks/useChainId';
import useUserById from '../../hooks/useUserById';
import Web3MailContext from '../../modules/Web3mail/context/web3mail';
import { createWeb3mailToast } from '../../modules/Web3mail/utils/toast';
import { createMultiStepsTransactionToast, showErrorTransactionToast } from '../../utils/toast';
import Loading from '../Loading';
import { delegateUpdateProfileData } from '../request';
import SubmitButton from './SubmitButton';
import { SkillsInput } from './skills-input';
import useTalentLayerClient from '../../hooks/useTalentLayerClient';

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

function CreateWorkerProfileForm({ callback }: { callback?: () => void }) {
  const chainId = useChainId();
  const { open: openConnectModal } = useWeb3Modal();
  const { user, isActiveDelegate, refreshData } = useContext(TalentLayerContext);
  const { platformHasAccess } = useContext(Web3MailContext);
  const { data: walletClient } = useWalletClient({ chainId });
  const publicClient = usePublicClient({ chainId });
  const [selectedTypes, setSelectedTypes] = useState(['']);
  const userDescription = user?.id ? useUserById(user?.id)?.description : null;
  const talentLayerClient = useTalentLayerClient();

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

  const toggleType = (type: string) => {
    if (selectedTypes.includes(type)) {
      // If the type is already in the array, remove it
      setSelectedTypes(selectedTypes.filter((selectedType) => selectedType !== type));
    } else {
      // If the type is not in the array, add it
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const onSubmit = async (
    values: IFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    if (user && walletClient && publicClient && talentLayerClient) {
      try {
        const profile = {
          title: values.title,
          role: values.role,
          image_url: values.image_url,
          video_url: values.video_url,
          name: values.name,
          about: values.about,
          skills: values.skills,
          web3mailPreferences: user.description?.web3mailPreferences,
        };

        let cid = await talentLayerClient.profile.upload(profile);

        let tx;
        if (isActiveDelegate) {
          const response = await delegateUpdateProfileData(chainId, user.id, user.address, cid);
          tx = response.data.transaction;
        } else {
          const res = await talentLayerClient?.profile.update(profile, user.id);

          tx = res.tx;
          cid = res.cid;
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

        refreshData();
        setSubmitting(false);
        if (process.env.NEXT_PUBLIC_ACTIVE_WEB3MAIL == 'true' && !platformHasAccess) {
          createWeb3mailToast();
        }
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
          <div className='grid grid-cols-1 gap-6'>
            <label className='block'>
              <span className='text-stone-800'>Handle</span>
              <Field
                type='text'
                id='handle'
                name='handle'
                className='mt-1 mb-1 block w-full rounded-xl border border-redpraha bg-midnight shadow-sm focus:ring-opacity-50'
                placeholder=''
              />
            </label>
            <label className='block'>
              <span className='text-stone-800'>HeadLine</span>
              <Field
                type='text'
                id='headline'
                name='headline'
                className='mt-1 mb-1 block w-full rounded-xl border border-redpraha bg-midnight shadow-sm focus:ring-opacity-50'
                placeholder=''
              />
            </label>
            <label className='block'>
              <span className='text-stone-800'>Name</span>
              <Field
                type='text'
                id='name'
                name='name'
                className='mt-1 mb-1 block w-full rounded-xl border border-redpraha bg-midnight shadow-sm focus:ring-opacity-50'
                placeholder=''
              />
            </label>

            <label className='block'>
              <span className='text-stone-800'>Skills</span>

              <SkillsInput initialValues={userDescription?.skills_raw} entityId={'skills'} />

              <Field type='hidden' id='skills' name='skills' />
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
            
            <label className='block'>
            <span className='text-stone-800'>I'm Interested in</span>
            <div className='flex space-x-2'>
              <button
               type="button"
                className={`rounded-xl border border-redpraha p-2 ${
                  selectedTypes.includes('jobs') ? 'bg-redpraha' : 'bg-midnight'
                }`}
                onClick={() => toggleType('jobs')}
              >
                Jobs
              </button>
              <button
               type="button"
                className={`rounded-xl border border-redpraha p-2 ${
                  selectedTypes.includes('bounties') ? 'bg-redpraha' : 'bg-midnight'
                }`}
                onClick={() => toggleType('bounties')}
              >
                Bounties
              </button>
              <button
               type="button"
                className={`rounded-xl border border-redpraha p-2 ${
                  selectedTypes.includes('grants') ? 'bg-redpraha' : 'bg-midnight'
                }`}
                onClick={() => toggleType('grants')}
              >
                Grants
              </button>
              <button
               type="button"
                className={`rounded-xl border border-redpraha p-2 ${
                  selectedTypes.includes('gigs') ? 'bg-redpraha' : 'bg-midnight'
                }`}
                onClick={() => toggleType('gigs')}
              >
                Gigs
              </button>
            </div>
          </label>

          <label className='block'>
  <span className='text-stone-800'>Profile Photo</span>
  <div className='relative rounded-xl border border-redpraha bg-midnight shadow-sm focus:ring-opacity-50'>
    <input
      type='file'
      id='profile_photo'
      name='profile_photo'
      accept='image/*'
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const image_url = e.target?.result;
            setFieldValue('image_url', image_url);
          };
          reader.readAsDataURL(file);
        }
      }}
      className='opacity-0 absolute h-full w-full top-0 left-0 cursor-pointer'
    />
    <label htmlFor='profile_photo' className='h-full w-full flex items-center justify-center cursor-pointer'>
      Upload File
    </label>
  </div>
</label>

        {values.image_url && (
                <div className='flex items-center justify-center py-3'>
                    <img width='300' height='300' src={values.image_url} alt='' />
                </div>
        )}
            <SubmitButton isSubmitting={isSubmitting} label='Update' />
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default CreateWorkerProfileForm;
