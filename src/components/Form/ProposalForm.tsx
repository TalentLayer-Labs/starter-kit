import { ErrorMessage, Field, Form, Formik } from 'formik';
import { QuestionMarkCircle } from 'heroicons-react';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { formatUnits } from 'viem';
import { usePublicClient, useWalletClient } from 'wagmi';
import * as Yup from 'yup';
import TalentLayerContext from '../../context/talentLayer';
import useAllowedTokens from '../../hooks/useAllowedTokens';
import { useChainId } from '../../hooks/useChainId';
import { postOpenAiRequest } from '../../modules/OpenAi/utils';
import Web3MailContext from '../../modules/Web3mail/context/web3mail';
import { createWeb3mailToast } from '../../modules/Web3mail/utils/toast';
import { IProposal, IService, IUser } from '../../types';
import { parseRateAmount } from '../../utils/currency';
import { createMultiStepsTransactionToast, showErrorTransactionToast } from '../../utils/toast';
import Loading from '../Loading';
import ServiceItem from '../ServiceItem';
import { delegateCreateOrUpdateProposal } from '../request';
import SubmitButton from './SubmitButton';
import useTalentLayerClient from '../../hooks/useTalentLayerClient';
import usePlatform from '../../hooks/usePlatform';
import { chains } from '../../pages/_app';

interface IFormValues {
  about: string;
  rateToken: string;
  rateAmount: number;
  expirationDate: number;
  video_url: string;
}

const validationSchema = Yup.object({
  about: Yup.string().required('Please provide a description of your service'),
  rateToken: Yup.string().required('Please select a payment token'),
  rateAmount: Yup.string().required('Please provide an amount for your service'),
  expirationDate: Yup.number().integer().required('Please provide an expiration date'),
});

function ProposalForm({
  user,
  service,
  existingProposal,
}: {
  user: IUser;
  service: IService;
  existingProposal?: IProposal;
}) {
  const chainId = useChainId();
  const publicClient = usePublicClient({ chainId });
  const { data: walletClient } = useWalletClient({ chainId });
  const router = useRouter();
  const allowedTokenList = useAllowedTokens();
  const { isActiveDelegate } = useContext(TalentLayerContext);
  const { platformHasAccess } = useContext(Web3MailContext);
  const [aiLoading, setAiLoading] = useState(false);
  const talentLayerClient = useTalentLayerClient();

  const currentChain = chains.find(chain => chain.id === chainId);
  const platform = usePlatform(process.env.NEXT_PUBLIC_PLATFORM_ID as string);
  const proposalPostingFee = platform?.proposalPostingFee || 0;
  const proposalPostingFeeFormat = proposalPostingFee
    ? Number(formatUnits(BigInt(proposalPostingFee), Number(currentChain?.nativeCurrency.decimals)))
    : 0;

  if (allowedTokenList.length === 0) {
    return <div>Loading...</div>;
  }

  let existingExpirationDate, existingRateTokenAmount;

  if (existingProposal) {
    existingExpirationDate = Math.floor(
      (Number(existingProposal?.expirationDate) - Date.now() / 1000) / (60 * 60 * 24),
    );

    const token = allowedTokenList.find(
      token => token.address === existingProposal?.rateToken.address,
    );

    existingRateTokenAmount = parseFloat(
      formatUnits(BigInt(existingProposal.rateAmount), Number(token?.decimals)),
    );
  }

  const initialValues: IFormValues = {
    about: existingProposal?.description?.about || '',
    rateToken: existingProposal?.rateToken.address || '',
    rateAmount: existingRateTokenAmount || 0,
    expirationDate: existingExpirationDate || 15,
    video_url: existingProposal?.description?.video_url || '',
  };

  const askAI = async (input: string, setFieldValue: any) => {
    setAiLoading(true);
    const context = 'I am a freelance and I need help to generate a proposal for a gig.';
    const serviceContext = `The is the job title:${service?.description?.title}.`;
    const serviceBuyerContext = `This is the client name:${service.buyer.handle}.`;
    const userContext = `My name is:${user.handle}. And this is a bit more about me: ${user?.description?.about}.`;
    const proposalContext = `And this is some information about the proposal I want to makde: ${input}.`;
    const agregatedContext =
      context + serviceContext + serviceBuyerContext + userContext + proposalContext;
    try {
      const responseText = await postOpenAiRequest(agregatedContext);
      setFieldValue('about', responseText);
    } catch (error) {
      console.error(error);
    } finally {
      setAiLoading(false);
    }
  };

  const onSubmit = async (
    values: IFormValues,
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void },
  ) => {
    const token = allowedTokenList.find(token => token.address === values.rateToken);
    if (publicClient && token && walletClient) {
      try {
        const parsedRateAmount = await parseRateAmount(
          values.rateAmount.toString(),
          values.rateToken,
          token.decimals,
        );
        const now = Math.floor(Date.now() / 1000);
        const convertExpirationDate = now + 60 * 60 * 24 * values.expirationDate;
        const convertExpirationDateString = convertExpirationDate.toString();

        const parsedRateAmountString = parsedRateAmount.toString();

        const proposal = {
          about: values.about,
          video_url: values.video_url,
        };

        let tx, cid, proposalResponse;

        cid = await talentLayerClient?.proposal?.upload(proposal);

        if (isActiveDelegate) {
          const proposalResponse = await delegateCreateOrUpdateProposal(
            chainId,
            user.id,
            user.address,
            service.id,
            values.rateToken,
            parsedRateAmountString,
            cid || '',
            convertExpirationDateString,
            existingProposal?.status,
          );
          tx = proposalResponse.data.transaction;
        } else {
          if (existingProposal) {
            proposalResponse = await talentLayerClient?.proposal.update(
              proposal,
              user.id,
              service.id,
              values.rateToken,
              parsedRateAmountString,
              convertExpirationDateString,
            );
          } else {
            proposalResponse = await talentLayerClient?.proposal.create(
              proposal,
              user.id,
              service.id,
              values.rateToken,
              parsedRateAmountString,
              convertExpirationDateString,
            );
          }
          tx = proposalResponse?.tx;
          cid = proposalResponse?.cid;
        }

        await createMultiStepsTransactionToast(
          chainId,
          {
            pending: 'Creating your proposal...',
            success: 'Congrats! Your proposal has been added',
            error: 'An error occurred while creating your proposal',
          },
          publicClient,
          tx,
          'proposal',
          cid,
        );
        setSubmitting(false);
        resetForm();
        router.push(`/dashboard`);
        if (process.env.NEXT_PUBLIC_ACTIVE_WEB3MAIL == 'true' && !platformHasAccess) {
          createWeb3mailToast();
        }
      } catch (error) {
        showErrorTransactionToast(error);
      }
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ isSubmitting, values, setFieldValue }) => (
        <Form>
          <h2 className='mb-2 text-base-content font-bold'>For the job:</h2>
          <ServiceItem service={service} />

          <h2 className=' mt-8 mb-2 text-base-content font-bold'>
            Describe your proposal in details:
          </h2>
          <div className='grid grid-cols-1 gap-6 border border-info rounded-xl p-6 bg-base-100'>
            <label className='block'>
              <span className='text-base-content'>about</span>
              <Field
                as='textarea'
                id='about'
                rows={8}
                name='about'
                className='mt-1 mb-1 block w-full rounded-xl border border-info bg-base-200 shadow-sm focus:ring-opacity-50'
                placeholder=''
              />
              <div className='border-info bg-info relative w-full border transition-all duration-300 rounded-xl p-4'>
                <div className='flex w-full items-center gap-3'>
                  <QuestionMarkCircle className='hidden' />
                  <div>
                    <h2 className='font-heading text-xs font-bold text-base-content mb-1'>
                      <span>Need help?</span>
                    </h2>
                    <p className='font-alt text-xs font-normal'>
                      <span className='text-base-content'>
                        Write few lines above and get some help from our AI
                      </span>
                    </p>
                  </div>
                  <div className='ms-auto'>
                    <button
                      disabled={aiLoading}
                      onClick={e => {
                        e.preventDefault();
                        askAI(values.about, setFieldValue);
                      }}
                      className='border text-base-content bg-base-300 hover:bg-base-100 border-white rounded-md h-10 w-10 p-2 relative inline-flex items-center justify-center space-x-1 font-sans text-sm font-normal leading-5 no-underline outline-none transition-all duration-300'>
                      {aiLoading ? <Loading /> : 'GO'}
                    </button>
                  </div>
                </div>
              </div>
              <span className='text-error'>
                <ErrorMessage name='about' />
              </span>
            </label>

            <div className='flex'>
              <label className='block flex-1 mr-4'>
                <span className='text-base-content'>Amount</span>
                <Field
                  type='number'
                  id='rateAmount'
                  name='rateAmount'
                  className='mt-1 mb-1 block w-full rounded-xl border border-info bg-base-200 shadow-sm focus:ring-opacity-50'
                  placeholder=''
                />
                <span className='text-error'>
                  <ErrorMessage name='rateAmount' />
                </span>
              </label>
              <label className='block'>
                <span className='text-base-content'>Token</span>
                <Field
                  component='select'
                  id='rateToken'
                  name='rateToken'
                  className='mt-1 mb-2 block w-full rounded-xl border border-info bg-base-200 shadow-sm focus:ring-opacity-50'
                  placeholder=''>
                  <option value=''>Select a token</option>
                  {allowedTokenList.map((token, index) => (
                    <option key={index} value={token.address}>
                      {token.symbol}
                    </option>
                  ))}
                </Field>
                <span className='text-error'>
                  <ErrorMessage name='rateToken' />
                </span>
              </label>
            </div>
            <label className='block flex-1'>
              <span className='text-base-content'>Expiration Date (Days)</span>
              <Field
                type='number'
                id='expirationDate'
                name='expirationDate'
                className='mt-1 mb-2 block w-full rounded-xl border border-info bg-base-200 shadow-sm focus:ring-opacity-50'
                placeholder=''
              />
              <span className='text-error'>
                <ErrorMessage name='expirationDate' />
              </span>
            </label>
            <label className='block flex-1'>
              <span className='text-base-content'>Video URL (optional)</span>
              <Field
                type='text'
                id='video_url'
                name='video_url'
                className='mt-1 mb-2 block w-full rounded-xl border border-info bg-base-200 shadow-sm focus:ring-opacity-50'
                placeholder='Enter  video URL'
              />
              <span className='text-error'>
                <ErrorMessage name='video_url' />
              </span>
            </label>
            {proposalPostingFeeFormat !== 0 && !existingProposal && (
              <span className='text-base-content'>
                Fee for making a proposal: {proposalPostingFeeFormat}{' '}
                {currentChain?.nativeCurrency.symbol}
              </span>
            )}
            <SubmitButton isSubmitting={isSubmitting} label='Post' />
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default ProposalForm;
