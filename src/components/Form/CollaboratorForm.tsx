import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useContext } from 'react';
import { usePublicClient, useWalletClient } from 'wagmi';
import * as Yup from 'yup';
import TalentLayerContext from '../../context/talentLayer';
import { useChainId } from '../../hooks/useChainId';
import { showErrorTransactionToast } from '../../utils/toast';
import Loading from '../Loading';
import SubmitButton from './SubmitButton';
import { useAddBuilderPlaceCollaborator } from '../../modules/BuilderPlace/hooks/UseAddBuilderPlaceCollaborator';
import BuilderPlaceContext from '../../modules/BuilderPlace/context/BuilderPlaceContext';
import { toggleDelegation } from '../../contracts/toggleDelegation';
import { useConfig } from '../../hooks/useConfig';
import { ETH_ADDRESS_LENGTH, ETH_ADDRESS_REGEX } from '../../utils';

interface IFormValues {
  collaborator: string;
}

const validationSchema = Yup.object({
  collaborator: Yup.string()
    .required('Collaborator is required')
    .matches(ETH_ADDRESS_REGEX, 'Invalid Ethereum address format')
    .length(ETH_ADDRESS_LENGTH, `Invalid Ethereum address format`),
});

const initialValues: IFormValues = {
  collaborator: '',
};
export const CollaboratorForm = ({ callback }: { callback?: () => void }) => {
  const chainId = useChainId();
  const config = useConfig();
  const { mutateAsync: addBuilderPlaceCollaboratorAsync } = useAddBuilderPlaceCollaborator();
  const { data: walletClient } = useWalletClient({ chainId });
  const { user, account, refreshData } = useContext(TalentLayerContext);
  const { builderPlace } = useContext(BuilderPlaceContext);
  const publicClient = usePublicClient({ chainId });

  if (!user?.id) {
    return <Loading />;
  }

  const onSubmit = async (
    values: IFormValues,
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void },
  ) => {
    try {
      if (walletClient && account?.address && builderPlace?.id) {
        setSubmitting(true);

        if (
          values.collaborator.toLocaleLowerCase() ===
          builderPlace?.owner?.address?.toLocaleLowerCase()
        ) {
          throw new Error('Already owner');
        }
        /**
         * @dev Sign message to prove ownership of the address
         */
        const signature = await walletClient.signMessage({
          message: user.id,
          account: account.address,
        });

        /**
         * @dev Add new collaborator to the BuilderPlace
         * The collaborator must have a BuilderPlace profile & TalentLayer Id
         */
        const response = await addBuilderPlaceCollaboratorAsync({
          ownerId: user.id,
          builderPlaceId: builderPlace.id,
          newCollaboratorAddress: values.collaborator,
          signature,
        });
        if (response?.error) {
          throw new Error(response.error);
        }

        // if address is not delegated yet on chain
        if (!user.delegates?.includes(values.collaborator.toLowerCase())) {
          /**
           * @dev Add the new collaborator as a delegate to the BuilderPlace owner
           */
          await toggleDelegation(
            chainId,
            user.id,
            config,
            values.collaborator,
            publicClient,
            walletClient,
            true,
          );

          resetForm();

          if (callback) {
            callback();
          }
        }
      }
    } catch (error: any) {
      console.log(error);
      showErrorTransactionToast(error.message);
    } finally {
      refreshData();
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {({ isSubmitting }) => (
        <Form>
          <div className='grid grid-cols-1 gap-6'>
            <div className='block border border-base-300 rounded-lg border p-10'>
              <span className='text-base-content font-bold'>
                Invite new members by wallet address
              </span>
              <div className='border-b border-base-300 mb-10 mt-10'></div>
              <span className='text-base-content '>Wallet Address</span>
              <label className='block'>
                <Field
                  type='text'
                  id='collaborator'
                  name='collaborator'
                  className='mt-1 mb-1 block w-full rounded-xl border border-info bg-base-200 shadow-sm focus:ring-opacity-50'
                  placeholder='0x...'
                />
              </label>
              <span className='text-alone-error'>
                <ErrorMessage name='collaborator' />
              </span>
              <div className='border-b border-base-300 mt-10 mb-5'></div>
              <div className='flex  lg:justify-between mr-2'>
                <div className='mb-2 flex-col lg:items-center'>
                  <span className='text-base-content'>Learn more about&nbsp;</span>
                  <a
                    href='https://github.com/TalentLayer-Labs/builder-place'
                    target='_blank'
                    className='text-base-content underline hover:opacity-60'>
                    Collaborator
                  </a>
                </div>
                <div className='ml-2'>
                  <SubmitButton isSubmitting={isSubmitting} label='Add' />
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CollaboratorForm;
