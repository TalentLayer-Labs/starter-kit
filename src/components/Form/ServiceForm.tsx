import { useWeb3Modal } from '@web3modal/react';
import { formatUnits } from 'viem';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { usePublicClient, useWalletClient } from 'wagmi';
import * as Yup from 'yup';
import TalentLayerContext from '../../context/talentLayer';
import { createMultiStepsTransactionToast, showErrorTransactionToast } from '../../utils/toast';
import { parseRateAmount } from '../../utils/currency';
import SubmitButton from './SubmitButton';
import useAllowedTokens from '../../hooks/useAllowedTokens';
import { IToken } from '../../types';
import { SkillsInput } from './skills-input';
import { delegateCreateService } from '../request';
import { useChainId } from '../../hooks/useChainId';
import { createWeb3mailToast } from '../../modules/Web3mail/utils/toast';
import Web3MailContext from '../../modules/Web3mail/context/web3mail';
import useTalentLayerClient from '../../hooks/useTalentLayerClient';
import usePlatform from '../../hooks/usePlatform';
import { chains } from '../../pages/_app';

interface IFormValues {
  title: string;
  about: string;
  keywords: string;
  rateToken: string;
  rateAmount: number;
}

const initialValues: IFormValues = {
  title: '',
  about: '',
  keywords: '',
  rateToken: '',
  rateAmount: 0,
};

function ServiceForm() {
  const chainId = useChainId();

  const { open: openConnectModal } = useWeb3Modal();
  const { user, account } = useContext(TalentLayerContext);
  const { platformHasAccess } = useContext(Web3MailContext);
  const publiClient = usePublicClient({ chainId });
  const { data: walletClient } = useWalletClient({ chainId });
  const router = useRouter();
  const allowedTokenList = useAllowedTokens();
  const [selectedToken, setSelectedToken] = useState<IToken>();
  const { isActiveDelegate } = useContext(TalentLayerContext);
  const talentLayerClient = useTalentLayerClient();

  const currentChain = chains.find(chain => chain.id === chainId);
  const platform = usePlatform(process.env.NEXT_PUBLIC_PLATFORM_ID as string);
  const servicePostingFee = platform?.servicePostingFee || 0;
  const servicePostingFeeFormat = servicePostingFee
    ? Number(formatUnits(BigInt(servicePostingFee), Number(currentChain?.nativeCurrency?.decimals)))
    : 0;

  const validationSchema = Yup.object({
    title: Yup.string().required('Please provide a title for your service'),
    about: Yup.string().required('Please provide a description of your service'),
    rateToken: Yup.string().required('Please select a payment token'),
    rateAmount: Yup.number()
      .required('Please provide an amount for your service')
      .when('rateToken', {
        is: (rateToken: string) => rateToken !== '',
        then: schema =>
          schema.min(
            selectedToken
              ? parseFloat(
                  formatUnits(
                    BigInt(selectedToken?.minimumTransactionAmount ?? 0n),
                    Number(selectedToken?.decimals),
                  ),
                )
              : 0,
            `Amount must be greater or equal than ${
              selectedToken
                ? formatUnits(
                    BigInt(selectedToken?.minimumTransactionAmount ?? 0n),
                    Number(selectedToken?.decimals),
                  )
                : 0
            }`,
          ),
      }),
  });

  const onSubmit = async (
    values: IFormValues,
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void },
  ) => {
    const token = allowedTokenList.find(token => token.address === values.rateToken);
    if (
      account?.isConnected === true &&
      publiClient &&
      walletClient &&
      token &&
      user &&
      talentLayerClient
    ) {
      try {
        const parsedRateAmount = await parseRateAmount(
          values.rateAmount.toString(),
          values.rateToken,
          token.decimals,
        );
        const parsedRateAmountString = parsedRateAmount.toString();

        let tx, cid;

        cid = await talentLayerClient.service.updloadServiceDataToIpfs({
          title: values.title,
          about: values.about,
          keywords: values.keywords,
          rateToken: values.rateToken,
          rateAmount: parsedRateAmountString,
        });

        if (isActiveDelegate) {
          const response = await delegateCreateService(chainId, user.id, user.address, cid);
          tx = response.data.transaction;
        } else {
          if (talentLayerClient) {
            const serviceResponse = await talentLayerClient.service.create(
              {
                title: values.title,
                about: values.about,
                keywords: values.keywords,
                rateToken: values.rateToken,
                rateAmount: parsedRateAmountString,
              },
              user.id,
              parseInt(process.env.NEXT_PUBLIC_PLATFORM_ID as string),
            );

            cid = serviceResponse.cid;
            tx = serviceResponse.tx;
          } else {
            throw new Error('TL client not initialised');
          }
        }

        const newId = await createMultiStepsTransactionToast(
          chainId,
          {
            pending: 'Creating your job...',
            success: 'Congrats! Your job has been added',
            error: 'An error occurred while creating your job',
          },
          publiClient,
          tx,
          'service',
          cid,
        );
        setSubmitting(false);
        resetForm();
        if (newId) {
          router.push(`/work/${newId}`);
        }
        if (process.env.NEXT_PUBLIC_ACTIVE_WEB3MAIL == 'true' && !platformHasAccess) {
          createWeb3mailToast();
        }
      } catch (error) {
        showErrorTransactionToast(error);
      }
    } else {
      openConnectModal();
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ isSubmitting, setFieldValue }) => (
        <Form>
          <div className='grid grid-cols-1 gap-6 border border-redpraha rounded-xl p-6 bg-white'>
            <label className='block'>
              <span className='text-stone-800'>Title</span>
              <Field
                type='text'
                id='title'
                name='title'
                className='mt-1 mb-1 block w-full rounded-xl border border-redpraha bg-midnight shadow-sm focus:ring-opacity-50'
                placeholder=''
              />
              <span className='text-red-500'>
                <ErrorMessage name='title' />
              </span>
            </label>

            <label className='block'>
              <span className='text-stone-800'>About</span>
              <Field
                as='textarea'
                id='about'
                name='about'
                className='mt-1 mb-1 block w-full rounded-xl border border-redpraha bg-midnight shadow-sm focus:ring-opacity-50'
                placeholder=''
              />
              <span className='text-red-500'>
                <ErrorMessage name='about' />
              </span>
            </label>

            <label className='block'>
              <span className='text-stone-800'>Keywords</span>

              <SkillsInput entityId={'keywords'} />

              <Field type='hidden' id='keywords' name='keywords' />
            </label>

            <div className='flex'>
              <label className='block flex-1 mr-4'>
                <span className='text-stone-800'>Amount</span>
                <Field
                  type='number'
                  id='rateAmount'
                  name='rateAmount'
                  className='mt-1 mb-1 block w-full rounded-xl border border-redpraha bg-midnight shadow-sm focus:ring-opacity-50'
                  placeholder=''
                />
                <span className='text-red-500 mt-2'>
                  <ErrorMessage name='rateAmount' />
                </span>
                {servicePostingFeeFormat !== 0 && (
                  <span className='text-stone-800'>
                    Fee for posting a service: {servicePostingFeeFormat}{' '}
                    {currentChain?.nativeCurrency.symbol}
                  </span>
                )}
              </label>
              <label className='block'>
                <span className='text-stone-800'>Token</span>
                <Field
                  component='select'
                  id='rateToken'
                  name='rateToken'
                  className='mt-1 mb-1 block w-full rounded-xl border border-redpraha bg-midnight shadow-sm focus:ring-opacity-50'
                  placeholder=''
                  onChange={(e: { target: { value: string } }) => {
                    const token = allowedTokenList.find(token => token.address === e.target.value);
                    setSelectedToken(token);
                    setFieldValue('rateToken', e.target.value);
                  }}>
                  <option value=''>Select a token</option>
                  {allowedTokenList.map((token, index) => (
                    <option key={index} value={token.address}>
                      {token.symbol}
                    </option>
                  ))}
                </Field>
                <span className='text-red-500'>
                  <ErrorMessage name='rateToken' />
                </span>
              </label>
            </div>

            <SubmitButton isSubmitting={isSubmitting} label='Post' />
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default ServiceForm;
