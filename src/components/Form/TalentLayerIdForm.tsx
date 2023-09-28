import { useWeb3Modal } from '@web3modal/react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';
import * as Yup from 'yup';
import TalentLayerContext from '../../context/talentLayer';
import TalentLayerID from '../../contracts/ABI/TalentLayerID.json';
import { createTalentLayerIdTransactionToast, showErrorTransactionToast } from '../../utils/toast';
import HelpPopover from '../HelpPopover';
import SubmitButton from './SubmitButton';
import { HandlePrice } from './handle-price';
import { delegateMintID } from '../request';
import { useChainId } from '../../hooks/useChainId';
import { useConfig } from '../../hooks/useConfig';
import { NetworkEnum } from '../../types';

interface IFormValues {
  handle: string;
}

const initialValues: IFormValues = {
  handle: '',
};

function TalentLayerIdForm() {
  const config = useConfig();
  const chainId = useChainId();
  const { open: openConnectModal } = useWeb3Modal();
  const { user, account } = useContext(TalentLayerContext);
  const { data: walletClient } = useWalletClient({ chainId });
  const { address } = useAccount();
  const publicClient = usePublicClient({ chainId });
  const router = useRouter();

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
    if (account && account.address && account.isConnected && publicClient && walletClient) {
      try {
        let tx;
        const handlePrice: any = await publicClient.readContract({
          address: config.contracts.talentLayerId,
          abi: TalentLayerID.abi,
          functionName: 'getHandlePrice',
          args: [submittedValues.handle],
          account: address,
        });

        if (process.env.NEXT_PUBLIC_ACTIVE_DELEGATE_MINT === 'true') {
          const response = await delegateMintID(
            chainId,
            submittedValues.handle,
            String(handlePrice),
            account.address,
          );
          tx = response.data.transaction;
        } else {
          tx = await walletClient.writeContract({
            address: config.contracts.talentLayerId,
            abi: TalentLayerID.abi,
            functionName: 'mint',
            args: [process.env.NEXT_PUBLIC_PLATFORM_ID, submittedValues.handle],
            account: address,
            value: handlePrice,
          });
        }
        await createTalentLayerIdTransactionToast(
          chainId,
          {
            pending: 'Minting your Talent Layer Id...',
            success: 'Congrats! Your Talent Layer Id is minted',
            error: 'An error occurred while creating your Talent Layer Id',
          },
          publicClient,
          tx,
          account.address,
        );

        setSubmitting(false);
        // TODO: add a refresh function on TL context and call it here rather than hard refresh
        router.reload();
      } catch (error: any) {
        showErrorTransactionToast(error);
      }
    } else {
      openConnectModal();
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ isSubmitting, values }) => (
        <Form>
          <p className='text-center mb-8'>Mint your TalentLayer ID</p>
          <div className='flex  bg-endnight py-4 px-4 mb-2 sm:px-0 justify-center items-center flex-row drop-shadow-lg rounded'>
            <div className='sm:px-6 flex flex-row items-center gap-2'>
              <Field
                type='text'
                className='text-gray-500 py-2 focus:ring-0 outline-none text-sm border-0 rounded-xl h-[40px]'
                placeholder='Choose your handle'
                id='handle'
                name='handle'
                required
              />
            </div>

            <div className='flex items-center'>
              {values.handle && chainId != NetworkEnum.IEXEC && (
                <HandlePrice handle={values.handle} />
              )}
              <div>
                <div className='sm:pl-2 sm:pr-4 sm:space-x-4 relative'>
                  <SubmitButton isSubmitting={isSubmitting} />
                  <HelpPopover>
                    <h3 className='font-semibold text-gray-900 dark:text-white'>
                      What is a TalentLayerID?
                    </h3>
                    <p>
                      AnonID is a work identity that allows ownership and growth of reputation
                      across many gig marketplaces. Anon IDs are ERC-721 NFTs that live inside
                      crypto wallets; this means that reputation is self-custodied by the wallet
                      owner and lives separately from integrated platforms.
                    </p>
                    <h3 className='font-semibold text-gray-900 dark:text-white'>
                      What is the handle?
                    </h3>
                    <p>
                      Your Anon ID Handle is a unique string of characters and numbers that you can
                      choose when you create your Anon ID. This handle is how others can search for
                      your reputation. You can have a maximum of 10 characters in your Anon ID.
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
              </div>
            </div>
          </div>
          <span className='label-text text-red-500 mt-2'>
            <ErrorMessage name='handle' />
          </span>
        </Form>
      )}
    </Formik>
  );
}

export default TalentLayerIdForm;
