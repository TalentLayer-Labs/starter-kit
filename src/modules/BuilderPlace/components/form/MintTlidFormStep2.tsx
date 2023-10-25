import { useWeb3Modal } from '@web3modal/react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';
import * as Yup from 'yup';
import { useChainId } from '../../../../hooks/useChainId';
import useTalentLayerClient from '../../../../hooks/useTalentLayerClient';
import {
  createMultiStepsTransactionToast,
  showErrorTransactionToast,
} from '../../../../utils/toast';
import { NetworkEnum } from '../../../../types';
import { HandlePrice } from '../../../../components/Form/HandlePrice';
import SubmitButton from '../../../../components/Form/SubmitButton';
import HelpPopover from '../../../../components/HelpPopover';
import { useContext } from 'react';
import TalentLayerContext from '../../../../context/talentLayer';
import { useGetBuilderPlace } from '../../hooks/UseGetBuilderPlace';
import { slugify } from '../../utils';

interface IFormValues {
  handle: string;
}

function MintTlidFormStep2({
  handle,
  description,
  image,
}: {
  handle?: string;
  description?: string;
  image?: string;
}) {
  const chainId = useChainId();
  const { account, refreshData } = useContext(TalentLayerContext);
  const { open: openConnectModal } = useWeb3Modal();
  const { data: walletClient } = useWalletClient({ chainId });
  const publicClient = usePublicClient({ chainId });
  const talentLayerClient = useTalentLayerClient();

  const initialValues: IFormValues = {
    handle: slugify(handle as string) || '',
  };

  const validationSchema = Yup.object().shape({
    handle: Yup.string()
      .min(2)
      .max(10)
      .matches(/^[a-z0-9][a-z0-9-_]*$/, 'Only a-z, 0-9 and -_ allowed, and cannot begin with -_')
      .when('isConnected', {
        is: account && account.isConnected,
        then: schema => schema.required('handle is required'),
      }),
  });

  const onSubmit = async (
    submittedValues: IFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    if (
      account &&
      account.address &&
      account.isConnected &&
      publicClient &&
      walletClient &&
      talentLayerClient
    ) {
      try {
        //TODO update metadata
        // const tx = await talentLayerClient.profile.create(submittedValues.handle);
        //
        // await createTalentLayerIdTransactionToast(
        //   chainId,
        //   {
        //     pending: 'Minting your Talent Layer Id...',
        //     success: 'Congrats! Your Talent Layer Id is minted',
        //     error: 'An error occurred while creating your Talent Layer Id',
        //   },
        //   publicClient,
        //   tx,
        //   account.address,
        // );
        //
        const userId = await talentLayerClient.profile.getByAddress(account.address);
        console.log('userId', userId);

        const profile = {
          image_url: image,
          about: description,
        };

        const resCid = await talentLayerClient.profile.upload(profile);
        console.log('resCid', resCid);
        //TODO issue here, invalidBigintSyntax
        // (need extra step for this ?)
        const res = await talentLayerClient?.profile.update(profile, userId);

        await createMultiStepsTransactionToast(
          chainId,
          {
            pending: 'Updating profile...',
            success: 'Congrats! Your profile has been updated',
            error: 'An error occurred while updating your profile',
          },
          publicClient,
          res.tx,
          'user',
          res.cid,
        );

        setSubmitting(false);
        refreshData();
      } catch (error: any) {
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
      {({ isSubmitting, values }) => (
        <Form>
          <div className='flex items-center justify-center'>
            <p className='flex text-center mb-8'>TalentLayer id handle</p>
            <div className='flex py-4 px-4 mb-2 sm:px-0 justify-center items-center flex-row drop-shadow-lg rounded'>
              <div className='sm:px-6 flex flex-row items-center gap-2'>
                <Field
                  type='text'
                  className='text-stone-400 py-2 focus:ring-0 outline-none text-sm border-0 rounded-xl h-[40px]'
                  placeholder='Choose your handle'
                  id='handle'
                  name='handle'
                  required
                />
              </div>
              {values.handle && chainId != NetworkEnum.IEXEC && (
                <HandlePrice handle={values.handle} />
              )}
              <div></div>
            </div>
          </div>
          <div className='sm:pl-2 sm:pr-4 sm:space-x-4 relative'>
            <SubmitButton isSubmitting={isSubmitting} />
            <HelpPopover>
              <h3 className='font-semibold text-stone-800 dark:text-stone-800'>
                What is a TalentLayerID?
              </h3>
              <p>
                AnonID is a work identity that allows ownership and growth of reputation across many
                gig marketplaces. Anon IDs are ERC-721 NFTs that live inside crypto wallets; this
                means that reputation is self-custodied by the wallet owner and lives separately
                from integrated platforms.
              </p>
              <h3 className='font-semibold text-stone-800 dark:text-stone-800'>
                What is the handle?
              </h3>
              <p>
                Your Anon ID Handle is a unique string of characters and numbers that you can choose
                when you create your Anon ID. This handle is how others can search for your
                reputation. You can have a maximum of 10 characters in your Anon ID.
              </p>
              <a
                target='_blank'
                href='https://docs.talentlayer.org/basics/elements/what-is-talentlayer-id'
                className='flex items-center font-medium text-blue-600 dark:text-blue-500 dark:hover:text-blue-600 hover:text-blue-700'>
                Read more{' '}
                <svg
                  className='w-4 h-4 ml-1'
                  aria-hidden='true'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    fillRule='evenodd'
                    d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                    clipRule='evenodd'></path>
                </svg>
              </a>
            </HelpPopover>
          </div>
          <span className='label-text text-red-500 mt-2'>
            <ErrorMessage name='handle' />
          </span>
        </Form>
      )}
    </Formik>
  );
}

export default MintTlidFormStep2;
