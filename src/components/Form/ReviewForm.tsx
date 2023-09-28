import { useWeb3Modal } from '@web3modal/react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useContext } from 'react';
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';
import * as Yup from 'yup';
import TalentLayerContext from '../../context/talentLayer';
import TalentLayerReview from '../../contracts/ABI/TalentLayerReview.json';
import { postToIPFS } from '../../utils/ipfs';
import { createMultiStepsTransactionToast, showErrorTransactionToast } from '../../utils/toast';
import SubmitButton from './SubmitButton';
import { getUserByAddress } from '../../queries/users';
import { delegateMintReview } from '../request';
import { useChainId } from '../../hooks/useChainId';
import { useConfig } from '../../hooks/useConfig';

interface IFormValues {
  content: string;
  rating: number;
}

const validationSchema = Yup.object({
  content: Yup.string().required('Please provide a content'),
  rating: Yup.string().required('rating is required'),
});

const initialValues: IFormValues = {
  content: '',
  rating: 3,
};

function ReviewForm({ serviceId }: { serviceId: string }) {
  const config = useConfig();
  const chainId = useChainId();
  const { open: openConnectModal } = useWeb3Modal();
  const { user } = useContext(TalentLayerContext);
  const { isActiveDelegate } = useContext(TalentLayerContext);
  const publicClient = usePublicClient({ chainId });
  const { data: walletClient } = useWalletClient({ chainId });
  const { address } = useAccount();

  const onSubmit = async (
    values: IFormValues,
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void },
  ) => {
    if (user && publicClient && walletClient) {
      try {
        const uri = await postToIPFS(
          JSON.stringify({
            content: values.content,
            rating: values.rating,
          }),
        );

        const getUser = await getUserByAddress(chainId, user.address);
        const delegateAddresses = getUser.data?.data?.users[0].delegates;
        let tx;
        if (isActiveDelegate) {
          const response = await delegateMintReview(
            chainId,
            user.id,
            user.address,
            serviceId,
            uri,
            values.rating,
          );
          tx = response.data.transaction;
        } else {
          tx = await walletClient.writeContract({
            address: config.contracts.talentLayerReview,
            abi: TalentLayerReview.abi,
            functionName: 'mint',
            args: [user.id, serviceId, uri, values.rating],
            account: address,
          });
        }

        await createMultiStepsTransactionToast(
          chainId,
          {
            pending: 'Creating your review...',
            success: 'Congrats! Your review has been posted',
            error: 'An error occurred while creating your review',
          },
          publicClient,
          tx,
          'review',
          uri,
        );
        setSubmitting(false);
        resetForm();
      } catch (error) {
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
      {({ isSubmitting, errors }) => (
        <Form>
          {/* {Object.keys(errors).map(errorKey => (
            <div key={errorKey}>{errors[errorKey]}</div>
          ))} */}
          <div className='grid grid-cols-1 gap-6 border border-gray-700 rounded-xl p-6 bg-endnight'>
            <label className='block'>
              <span className='text-gray-100'>Message</span>
              <Field
                as='textarea'
                id='content'
                name='content'
                className='mt-1 mb-1 block w-full rounded-xl border border-gray-700 bg-midnight shadow-sm focus:ring-opacity-50'
                placeholder=''
                rows={5}
              />
              <span className='text-red-500'>
                <ErrorMessage name='content' />
              </span>
            </label>

            <label className='block'>
              <span className='text-gray-100'>Rating</span>
              <Field
                type='number'
                id='rating'
                name='rating'
                min={0}
                max={5}
                className='mt-1 mb-1 block w-full rounded-xl border border-gray-700 bg-midnight shadow-sm focus:ring-opacity-50'
              />
              <span className='text-red-500'>
                <ErrorMessage name='rating' />
              </span>
            </label>

            <SubmitButton isSubmitting={isSubmitting} label='Post your review' />
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default ReviewForm;
