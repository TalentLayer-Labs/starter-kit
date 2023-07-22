import { useWeb3Modal } from '@web3modal/react';
import { ethers } from 'ethers';
import { Field, Form, Formik } from 'formik';
import { useContext, useState } from 'react';
import { useProvider, useSigner } from 'wagmi';
import * as Yup from 'yup';
import StarterKitContext from '../../context/starterKit';
import TalentLayerID from '../../contracts/ABI/TalentLayerID.json';
import { postToIPFS } from '../../utils/ipfs';
import { createMultiStepsTransactionToast, showErrorTransactionToast } from '../../utils/toast';
import Loading from '../Loading';
import SubmitButton from './SubmitButton';
import useUserById from '../../hooks/useUserById';
import { SkillsInput } from './skills-input';
import { useChainId } from '../../hooks/useChainId';
import { useConfig } from '../../hooks/useConfig';
import { QuestionMarkCircle } from 'heroicons-react';
import AddAttestation from '../AddAttestation';
import {EyeIcon} from "@heroicons/react/24/outline";

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
  const provider = useProvider({ chainId });
  const [aiLoading, setAiLoading] = useState(false);
  const userDescription = user?.id ? useUserById(user?.id)?.description : null;
  const { data: signer } = useSigner({
    chainId,
  });
  const { isActiveDelegate } = useContext(StarterKitContext);
  const [activeLvlUpMenu, setActiveLvlUpMenu] = useState(0);
  const menuItems = [
    { label: 'Github', content: <AddAttestation type='github' /> },
    { label: 'WorldCoin', content: <AddAttestation type='worldcoin' /> },
    { label: 'LinkedIn', content: <AddAttestation type='linkedIn' /> },
    { label: 'Upwork', content: <AddAttestation type='upwork' /> },
    { label: 'Malt', content: <AddAttestation type='malt' /> },
  ];

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

  const generatePicture = async (setFieldValue: any) => {
    setAiLoading(true);
    const colors = ['Red', 'Orange', 'Green', 'Blue', 'Purple', 'Black', 'Yellow', 'Aqua'];
    const themes = [
      'ready for the future of work',
      'working on his computer',
      '^playing with a chinese abacus',
      'with a blanket',
      'with a 4 leaf clover',
      'just happy',
      'using a hammer',
      'climbing',
    ];
    const color = colors[getRandomInt(7)];
    const theme = themes[getRandomInt(7)];
    const customPrompt = `A cartoon futurist raccoon ${theme} with ${color} background `;
    const response = await fetch('/api/ai/generate-image', {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: customPrompt,
      }),
    }).then(response => response.json());

    setAiLoading(false);
    setFieldValue('image_url', response.image);
  };
  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  const onSubmit = async (
    values: IFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    if (user && provider && signer) {
      try {
        const cid = await postToIPFS(
          JSON.stringify({
            title: values.title,
            role: values.role,
            image_url: values.image_url,
            video_url: values.video_url,
            name: values.name,
            about: values.about,
            skills: values.skills,
          }),
        );

        let tx;

        const contract = new ethers.Contract(
          config.contracts.talentLayerId,
          TalentLayerID.abi,
          signer,
        );
        tx = await contract.updateProfileData(user.id, cid);

        await createMultiStepsTransactionToast(
          chainId,
          {
            pending: 'Updating profile...',
            success: 'Congrats! Your profile has been updated',
            error: 'An error occurred while updating your profile',
          },
          provider,
          tx,
          'user',
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
    <>
      <div className='flex mb-3 justify-between content-between w-1/2'>
        <span
          className='hover:bg-endnight text-white bg-endnight px-3 py-2 text-sm flex items-center rounded-xl mr-2'
          onClick={() => {
            const iframe = window.document.getElementById('iframe-container');
            let about = document.querySelector('#about').value;
            window.document.querySelector('iframe').src = `http://localhost:3000/public-templates/template-1/index.html?title=${initialValues.title}&about=${about}`;
            window.setTimeout(function() {
              iframe.style.display = 'block';
            },100)
          }}>
          <EyeIcon className='w-[18px] h-[18px] text-redpraha mr-2' />
          See public page 1
        </span>
        <span
          className='hover:bg-endnight text-white bg-endnight px-3 py-2 text-sm flex items-center rounded-xl mr-2'
          onClick={() => {
            const iframe = window.document.getElementById('iframe-container');
            let about = document.querySelector('#about').value;
            window.document.querySelector('iframe').src = `http://localhost:3000/public-templates/template-2/index.html?title=${initialValues.title}&about=${about}`;
            window.setTimeout(function() {
              iframe.style.display = 'block';
            },100)
          }}>
          <EyeIcon className='w-[18px] h-[18px] text-redpraha mr-2' />
          See public page 2
        </span>
        <span
          className='hover:bg-endnight text-white bg-endnight px-3 py-2 text-sm flex items-center rounded-xl mr-2'
          onClick={() => {
            const iframe = window.document.getElementById('iframe-container');
            let about = document.querySelector('#about').value;
            window.document.querySelector('iframe').src = `http://localhost:3000/public-templates/template-3/index.html?title=${initialValues.title}&about=${about}`;
            window.setTimeout(function() {
              iframe.style.display = 'block';
            },100)
          }}>
          <EyeIcon className='w-[18px] h-[18px] text-redpraha mr-2' />
          See public page 3
        </span>
      </div>
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
                {/* <div className='border-gray-700 bg-gray-800 relative w-full border transition-all duration-300 rounded-xl p-4'>
                  {values.image_url && (
                    <div className='flex items-center justify-center py-3'>
                      <img width='300' height='300' src={values.image_url} alt='' />
                    </div>
                  )}
                </div> */}
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
      <div className='block border-t border-gray-700 pt-5 font-bold'>
        <span className=''>Level up your trust score</span>
        <div className='mt-1 flex divide-x rounded-lg border border-gray-700 py-3'>
          <div className='-my-3 divide-y divide-gray-600 text-sm w-1/4'>
            <ul>
              {menuItems.map((menuItem, index) => (
                <li
                  className={`w-full p-4 ${
                    activeLvlUpMenu === index ? 'bg-gray-700' : ''
                  } hover:cursor-pointer hover:bg-gray-600`}
                  key={index}
                  onClick={activeLvlUpMenu === index ? undefined : () => setActiveLvlUpMenu(index)}>
                  {menuItem.label} +3
                </li>
              ))}
            </ul>
          </div>

          <div className='-my-3 divide-y divide-gray-700 text-sm w-3/4 p-3'>
            <dt className='font-medium'>{menuItems[activeLvlUpMenu].content}</dt>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileForm;
