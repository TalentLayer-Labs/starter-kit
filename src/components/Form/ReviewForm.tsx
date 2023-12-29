import { useWeb3Modal } from '@web3modal/wagmi/react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useContext } from 'react';
import { usePublicClient, useWalletClient } from 'wagmi';
import * as Yup from 'yup';
import TalentLayerContext from '../../context/talentLayer';
import { postToIPFS } from '../../utils/ipfs';
import { createMultiStepsTransactionToast, showErrorTransactionToast } from '../../utils/toast';
import SubmitButton from './SubmitButton';
import { delegateMintReview } from '../request';
import { useChainId } from '../../hooks/useChainId';
import useTalentLayerClient from '../../hooks/useTalentLayerClient';
import BuilderPlaceContext from '../../modules/BuilderPlace/context/BuilderPlaceContext';

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
  const chainId = useChainId();
  const { open: openConnectModal } = useWeb3Modal();
  const { user, canUseDelegation, refreshWorkerProfile } = useContext(TalentLayerContext);
  const { isBuilderPlaceCollaborator, builderPlace } = useContext(BuilderPlaceContext);
  const publicClient = usePublicClient({ chainId });
  const { data: walletClient } = useWalletClient({ chainId });
  const talentLayerClient = useTalentLayerClient();

  /**
   * @dev If the user is a Collaborator, use the owner's TalentLayerId
   * @param values
   * @param setSubmitting
   * @param resetForm
   */
  const onSubmit = async (
    values: IFormValues,
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void },
  ) => {
    if (user && publicClient && walletClient && builderPlace?.ownerTalentLayerId) {
      try {
        const uri = await postToIPFS(
          JSON.stringify({
            content: values.content,
            rating: values.rating,
          }),
        );

        let tx;
        if (canUseDelegation) {
          const response = await delegateMintReview(
            chainId,
            isBuilderPlaceCollaborator ? builderPlace.ownerTalentLayerId : user.id,
            user.address,
            serviceId,
            uri,
            values.rating,
          );
          tx = response.data.transaction;
        } else {
          if (talentLayerClient) {
            const res = await talentLayerClient.review.create(
              {
                rating: values.rating,
                content: values.content,
              },
              serviceId,
              isBuilderPlaceCollaborator ? builderPlace.ownerTalentLayerId : user.id,
            );
            tx = res.tx;
          }
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
      } finally {
        if (canUseDelegation) await refreshWorkerProfile();
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
          <div className='grid grid-cols-1 gap-6 border border-info rounded-xl p-6 bg-base-100'>
            <label className='block'>
              <span className='text-base-content'>Message</span>
              <Field
                as='textarea'
                id='content'
                name='content'
                className='mt-1 mb-1 block w-full rounded-xl border border-info bg-base-200 shadow-sm focus:ring-opacity-50'
                placeholder=''
                rows={5}
              />
              <span className='text-alone-error'>
                <ErrorMessage name='content' />
              </span>
            </label>

            <label className='block'>
              <span className='text-base-content'>Rating</span>
              <Field
                type='number'
                id='rating'
                name='rating'
                min={0}
                max={5}
                className='mt-1 mb-1 block w-full rounded-xl border border-info bg-base-200 shadow-sm focus:ring-opacity-50'
              />
              <span className='text-alone-error'>
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
