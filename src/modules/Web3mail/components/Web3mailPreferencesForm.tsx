import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import { useWeb3Modal } from '@web3modal/react';
import { Form, Formik } from 'formik';
import Link from 'next/link';
import { useContext } from 'react';
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';
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
  const { user, isActiveDelegate, refreshData } = useContext(TalentLayerContext);
  const { data: walletClient } = useWalletClient({ chainId });
  const { address } = useAccount();
  const publicClient = usePublicClient({ chainId });
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
      userDescription?.web3mailPreferences?.activeOnPlatformMarketing || false,
  };

  const onSubmit = async (
    values: IWeb3mailPreferences,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    if (user && publicClient && walletClient) {
      try {
        const cid = await postToIPFS(
          JSON.stringify({
            title: userDescription?.title,
            role: userDescription?.role,
            image_url: userDescription?.image_url,
            video_url: userDescription?.video_url,
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
          tx = await walletClient.writeContract({
            address: config.contracts.talentLayerId,
            abi: TalentLayerID.abi,
            functionName: 'updateProfileData',
            args: [user.id, cid],
            account: address,
          });
        }

        await createMultiStepsTransactionToast(
          chainId,
          {
            pending: 'Updating your preferences...',
            success: 'Congrats! Your preferences has been updated',
            error: 'An error occurred while updating your preferences',
          },
          publicClient,
          tx,
          'user',
          cid,
        );

        refreshData();
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

              <div className='border-b border-info pb-6'>
                <label className='block'>
                  <div className='mb-2 ml-0.5'>
                    <div className='flex justify-between'>
                      <div>
                        <p className='font-heading text-base-content font-medium leading-none'>
                          1. Setup your email
                        </p>
                        <p className='font-sans text-xs font-normal leading-normal text-base-content mt-0.5'>
                          It allow you to configure your preferences to be notified every time an
                          important action happened.
                        </p>
                      </div>
                    </div>
                  </div>
                </label>
                <Link
                  href='/web3mail'
                  className='grow px-5 py-2 rounded-xl bg-info text-base-content hover:bg-base-200 inline-flex align-center justify-center '>
                  <span>Manage your email</span>
                  <ArrowUpRightIcon width='16' height='16' className='ml-2 mt-1' />
                </Link>
              </div>

              <label className='block'>
                <div className='mb-2 ml-0.5'>
                  <div className='mb-4'>
                    <p className='font-heading text-base-content font-medium leading-none'>
                      2. Setup your notifications preferences
                    </p>
                    <p className='font-sans text-xs font-normal leading-normal text-base-content mt-0.5'>
                      Receive email when:
                    </p>
                  </div>

                  <Toogle
                    entityId={'activeOnNewProposal'}
                    label='A new proposal is posted on your Work Post'
                  />

                  <Toogle
                    entityId={'activeOnProposalValidated'}
                    label='Your proposal has been validated'
                  />

                  <Toogle entityId={'activeOnFundRelease'} label='You received new fund' />

                  <Toogle entityId={'activeOnReview'} label='You received a new review' />

                  <Toogle
                    entityId={'activeOnNewService'}
                    label='A new gig corresponding to your skills is open'
                  />

                  <Toogle
                    entityId={'activeOnPlatformMarketing'}
                    label='Important annoucement, new features, new partnerships..'
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
