import { useWeb3Modal } from '@web3modal/react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { QuestionMarkCircle } from 'heroicons-react';
import { useContext, useState } from 'react';
import { usePublicClient, useWalletClient } from 'wagmi';
import * as Yup from 'yup';
import TalentLayerContext from '../../context/talentLayer';
import { useChainId } from '../../hooks/useChainId';
import useUserById from '../../hooks/useUserById';
import Web3MailContext from '../../modules/Web3mail/context/web3mail';
import { createWeb3mailToast } from '../../modules/Web3mail/utils/toast';
import { generatePicture } from '../../utils/ai-picture-gen';
import { createMultiStepsTransactionToast, showErrorTransactionToast } from '../../utils/toast';
import Loading from '../Loading';
import { delegateUpdateProfileData } from '../request';
import SubmitButton from './SubmitButton';
import { SkillsInput } from './skills-input';
import useTalentLayerClient from '../../hooks/useTalentLayerClient';
import {useAddBuilderPlaceOwner} from "../../modules/BuilderPlace/hooks/UseAddBuilderPlaceOwner";
import {useCreateBuilderPlaceMutation} from "../../modules/BuilderPlace/hooks/UseCreateBuilderPlaceMutation";
import {useRemoveBuilderPlaceOwnerMutation} from "../../modules/BuilderPlace/hooks/UseRemoveBuilderPlaceOwner";

interface IFormValues {
  collaborator?: string;
}

const validationSchema = Yup.object({
  collaborator: Yup.string().required('Collaborator is required'),
});
const initialValues: IFormValues = {
  collaborator: '',
};
//TODO renommer Owners => Collaborators | ajouter champ address du Onwer
export const CollaboratorForm = ({ callback }: { callback?: () => void }) => {
  const chainId = useChainId();
  { mutateAsync: useRemoveBuilderPlaceOwnerAsync } = useRemoveBuilderPlaceOwnerMutation();
  const { data: walletClient } = useWalletClient({ chainId });
  const { open: openConnectModal } = useWeb3Modal();
  const { user, account, refreshData } = useContext(TalentLayerContext);
  const { platformHasAccess } = useContext(Web3MailContext);
  const publicClient = usePublicClient({ chainId });
  const [aiLoading, setAiLoading] = useState(false);
  const userDescription = user?.id ? useUserById(user?.id)?.description : null;
  const talentLayerClient = useTalentLayerClient();

  if (!user?.id) {
    return <Loading />;
  }

  const onSubmit = async (
    values: IFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    if (user && publicClient && talentLayerClient && walletClient && account?.address) {
      try {
        setTimeout(() => '', 2000);
        // let tx;
        // const res = await
        //
        // tx = res.tx;
        //
        // TODO Add delegate
        // await createMultiStepsTransactionToast(
        //   chainId,
        //   {
        //     pending: 'Adding a collaborator...',
        //     success: 'Congrats! A new collaborator has been added',
        //     error: 'An error occurred while adding a collaborator',
        //   },
        //   publicClient,
        //   tx,
        //   'user',
        // );

        if (walletClient && account?.address) {
          setSubmitting(true);
          try {
            /**
             * @dev Sign message to prove ownership of the address
             */
            const signature = await walletClient.signMessage({
              account: account.address,
              message: user.id,
            });

            await useAddBuilderPlaceOwner();
          } catch (e: any) {
            console.error(e);
          } finally {
            setSubmitting(false);
          }

        if (callback) {
          callback();
        }

        refreshData();
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
          <div className='grid grid-cols-1 gap-6'>
            <label className='block'>
              <span className='text-base-content'>Collaborator</span>
              <Field
                type='text'
                id='collaborator'
                name='collaborator'
                className='mt-1 mb-1 block w-full rounded-xl border border-info bg-base-200 shadow-sm focus:ring-opacity-50'
                placeholder=''
              />
            </label>
            <span className='text-alone-error'>
              <ErrorMessage name='collaborator' />
            </span>

            <SubmitButton isSubmitting={isSubmitting} label='Add' />
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default CollaboratorForm;
