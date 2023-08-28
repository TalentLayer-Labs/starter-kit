import { LockClosedIcon } from '@heroicons/react/24/outline';
import { useWeb3Modal } from '@web3modal/react';
import { ethers } from 'ethers';
import { Field, Form, Formik } from 'formik';
import { useContext } from 'react';
import { useProvider, useSigner } from 'wagmi';
import SubmitButton from '../../../components/Form/SubmitButton';
import { Toogle } from '../../../components/Form/Toggle';
import Loading from '../../../components/Loading';
import { delegateUpdateProfileData } from '../../../components/request';
import TalentLayerContext from '../../../context/talentLayer';
import TalentLayerID from '../../../contracts/ABI/TalentLayerID.json';
import { useChainId } from '../../../hooks/useChainId';
import { useConfig } from '../../../hooks/useConfig';
import useUserById from '../../../hooks/useUserById';
import { IWeb3mailPreferences } from '../../../types';
import { postToIPFS } from '../../../utils/ipfs';
import { createMultiStepsTransactionToast, showErrorTransactionToast } from '../../../utils/toast';
import Web3mailCard from './Web3mailCard';

function Web3mailPreferencesForm() {
  const config = useConfig();
  const chainId = useChainId();
  const { open: openConnectModal } = useWeb3Modal();
  const { user } = useContext(TalentLayerContext);
  const provider = useProvider({ chainId });
  const { data: signer } = useSigner({
    chainId,
  });
  const { isActiveDelegate } = useContext(TalentLayerContext);
  const userDescription = user?.id ? useUserById(user?.id)?.description : null;

  if (!user?.id) {
    return <Loading />;
  }

  const initialValues: IWeb3mailPreferences = {
    activeOnNewService: userDescription?.web3mailPreferences?.activeOnNewService || true,
    activeOnNewProposal: userDescription?.web3mailPreferences?.activeOnNewProposal || true,
    activeOnProposalValidated:
      userDescription?.web3mailPreferences?.activeOnProposalValidated || true,
    activeOnFundRelease: userDescription?.web3mailPreferences?.activeOnFundRelease || true,
    activeOnReview: userDescription?.web3mailPreferences?.activeOnReview || true,
    activeOnPlatformMarketing:
      userDescription?.web3mailPreferences?.activeOnPlatformMarketing || true,
  };

  const onSubmit = async (
    values: IWeb3mailPreferences,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    if (user && provider && signer) {
      try {
        const cid = await postToIPFS(
          JSON.stringify({
            title: userDescription?.title,
            role: userDescription?.role,
            imageUrl: userDescription?.imageUrl,
            videoUrl: userDescription?.videoUrl,
            name: userDescription?.name,
            about: userDescription?.about,
            skills: userDescription?.skills_raw,
            web3mailPreferences: {
              activeOnNewService: values.activeOnNewService,
              activeOnNewProposal: values.activeOnNewProposal,
              activeOnProposalValidated: values.activeOnProposalValidated,
              activeOnFundRelease: values.activeOnFundRelease,
              activeOnReview: values.activeOnReview,
              activeOnPlatformMarketing: values.activeOnPlatformMarketing,
            },
          }),
        );

        let tx;
        if (isActiveDelegate) {
          const response = await delegateUpdateProfileData(chainId, user.id, user.address, cid);
          tx = response.data.transaction;
        } else {
          const contract = new ethers.Contract(
            config.contracts.talentLayerId,
            TalentLayerID.abi,
            signer,
          );
          tx = await contract.updateProfileData(user.id, cid);
        }

        await createMultiStepsTransactionToast(
          chainId,
          {
            pending: 'Updating your preferences...',
            success: 'Congrats! Your preferences has been updated',
            error: 'An error occurred while updating your preferences',
          },
          provider,
          tx,
          'user',
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
    <>
      <Formik initialValues={initialValues} enableReinitialize={true} onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <div className='grid grid-cols-1 gap-6'>
              <Web3mailCard />

              <div className='border-b border-gray-700 pb-6'>
                <label className='block'>
                  <div className='mb-2 ml-0.5'>
                    <div className='flex justify-between'>
                      <div>
                        <p className='font-heading text-base font-medium leading-none'>
                          Your email is protected
                        </p>
                        <p className='font-sans text-xs font-normal leading-normal text-gray-400 mt-0.5'>
                          It allow you to configure your preferences to be notified every time an
                          important action happened.
                        </p>
                      </div>
                      <span className='ml-3 px-3 font-sans transition-shadow duration-300 py-0.5 text-xs rounded-xl bg-green-100 bg-opacity-5 border-green-500 text-green-500 border bg-transparent font-medium flex items-center'>
                        <LockClosedIcon width={16} height={16} />
                      </span>
                    </div>
                  </div>
                  <Field
                    type='text'
                    id='email'
                    name='email'
                    className='cursor-not-allowed mt-1 mb-1 block w-full rounded-xl border border-gray-700 bg-midnight shadow-sm focus:ring-opacity-50'
                    placeholder='**********'
                    readOnly
                    disabled
                  />
                </label>
              </div>

              <label className='block'>
                <div className='mb-2 ml-0.5'>
                  <div className='mb-4'>
                    <p className='font-heading text-base font-medium leading-none'>
                      Your notifications preferences
                    </p>
                    <p className='font-sans text-xs font-normal leading-normal text-gray-400 mt-0.5'>
                      Receive email when:
                    </p>
                  </div>
                  <Toogle
                    entityId={'activeOnNewService'}
                    label='A new gig corresponding your skills is open'
                  />

                  <Toogle
                    entityId={'activeOnNewProposal'}
                    label='A new proposal is posted on your Gig'
                  />

                  <Toogle
                    entityId={'activeOnProposalValidated'}
                    label='Your proposal has been validated'
                  />

                  <Toogle entityId={'activeOnFundRelease'} label='The hirer released fund' />

                  <Toogle entityId={'activeOnReview'} label='You received a new review' />

                  <Toogle
                    entityId={'activeOnPlatformMarketing'}
                    label='We want to keep you update on important annoucement, new features..'
                  />
                </div>
              </label>

              <SubmitButton isSubmitting={isSubmitting} label='Update' />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default Web3mailPreferencesForm;
