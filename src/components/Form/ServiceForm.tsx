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
import useServiceById from '../../hooks/useServiceById';

interface IFormValues {
  title: string;
  about: string;
  keywords: string;
  rateToken: string;
  rateAmount: number;
  referralAmount: number;
}

function ServiceForm({ serviceId }: { serviceId?: string }) {
  const chainId = useChainId();

  const { open: openConnectModal } = useWeb3Modal();
  const { user, account } = useContext(TalentLayerContext);
  const { platformHasAccess } = useContext(Web3MailContext);
  const publiClient = usePublicClient({ chainId });
  const { data: walletClient } = useWalletClient({ chainId });
  const router = useRouter();
  const existingService = useServiceById(serviceId as string);
  const allowedTokenList = useAllowedTokens();
  const existingToken = allowedTokenList.find(value => {
    return value.address === existingService?.rateToken?.address;
  });
  const [selectedToken, setSelectedToken] = useState<IToken>();
  const { isActiveDelegate } = useContext(TalentLayerContext);
  const talentLayerClient = useTalentLayerClient();

  const currentChain = chains.find(chain => chain.id === chainId);
  const platform = usePlatform(process.env.NEXT_PUBLIC_PLATFORM_ID as string);
  const servicePostingFee = platform?.servicePostingFee || 0;
  const servicePostingFeeFormat = servicePostingFee
    ? Number(formatUnits(BigInt(servicePostingFee), Number(currentChain?.nativeCurrency?.decimals)))
    : 0;

  const initialValues: IFormValues = {
    title: existingService?.description?.title || '',
    about: existingService?.description?.about || '',
    keywords: existingService?.description?.keywords_raw || '',
    rateToken: existingService?.rateToken?.address || '',
    rateAmount:
      existingService?.description?.rateAmount &&
      allowedTokenList &&
      existingToken &&
      existingToken.decimals
        ? parseFloat(
            formatUnits(
              BigInt(existingService?.description?.rateAmount ?? 0n),
              Number(existingToken.decimals),
            ),
          )
        : 0,
    referralAmount:
      existingService?.referralAmount && allowedTokenList && existingToken && existingToken.decimals
        ? parseFloat(
            formatUnits(
              BigInt(existingService?.referralAmount ?? 0n),
              Number(existingToken.decimals),
            ),
          )
        : 0,
  };

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

  const validateReferralAmount = (value: number) => {
    if (value < initialValues.referralAmount && initialValues.referralAmount !== 0) {
      return 'Referral amount cannot be inferior to previous amount';
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
        const parsedReferralAmount = await parseRateAmount(
          values.referralAmount.toString(),
          values.rateToken,
          token.decimals,
        );
        const parsedReferralAmountString = parsedReferralAmount.toString();

        let tx, cid;

        cid = await talentLayerClient.service.updloadServiceDataToIpfs({
          title: values.title,
          about: values.about,
          keywords: values.keywords,
          role: 'buyer',
          rateAmount: parsedRateAmountString,
        });

        if (isActiveDelegate) {
          const response = await delegateCreateService(
            chainId,
            user.id,
            user.address,
            cid,
            values.rateToken,
            parsedRateAmountString,
          );
          tx = response.data.transaction;
        } else {
          if (talentLayerClient) {
            const serviceResponse = await talentLayerClient.service.create(
              {
                title: values.title,
                about: values.about,
                keywords: values.keywords,
                rateAmount: parsedRateAmountString,
              },
              user.id,
              parseInt(process.env.NEXT_PUBLIC_PLATFORM_ID as string),
              values.rateToken,
              parsedReferralAmountString,
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
          router.push(`/dashboard/services/${newId}`);
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
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      validateOnChange={true}>
      {({ isSubmitting, setFieldValue }) => (
        <Form>
          <div className='grid grid-cols-1 gap-6 border border-gray-700 rounded-xl p-6 bg-endnight'>
            <label className='block'>
              <span className='text-gray-100'>Title</span>
              <Field
                type='text'
                id='title'
                name='title'
                className='mt-1 mb-1 block w-full rounded-xl border border-gray-700 bg-midnight shadow-sm focus:ring-opacity-50'
                placeholder=''
              />
              <span className='text-red-500'>
                <ErrorMessage name='title' />
              </span>
            </label>

            <label className='block'>
              <span className='text-gray-100'>About</span>
              <Field
                as='textarea'
                id='about'
                name='about'
                className='mt-1 mb-1 block w-full rounded-xl border border-gray-700 bg-midnight shadow-sm focus:ring-opacity-50'
                placeholder=''
              />
              <span className='text-red-500'>
                <ErrorMessage name='about' />
              </span>
            </label>

            <label className='block'>
              <span className='text-gray-100'>Keywords</span>

              <SkillsInput entityId={'keywords'} />

              <Field type='hidden' id='keywords' name='keywords' />
            </label>

            <div className='flex'>
              <label className='block flex-1 mr-4'>
                <span className='text-gray-100'>Amount</span>
                <Field
                  type='number'
                  id='rateAmount'
                  name='rateAmount'
                  className='mt-1 mb-1 block w-full rounded-xl border border-gray-700 bg-midnight shadow-sm focus:ring-opacity-50'
                  placeholder=''
                />
                <span className='text-red-500 mt-2'>
                  <ErrorMessage name='rateAmount' />
                </span>
                {servicePostingFeeFormat !== 0 && (
                  <span className='text-gray-100'>
                    Fee for posting a service: {servicePostingFeeFormat}{' '}
                    {currentChain?.nativeCurrency.symbol}
                  </span>
                )}
              </label>
              <label className='block'>
                <span className='text-gray-100'>Token</span>
                {!existingService ? (
                  <Field
                    component='select'
                    id='rateToken'
                    name='rateToken'
                    className='mt-1 mb-1 block w-full rounded-xl border border-gray-700 bg-midnight shadow-sm focus:ring-opacity-50'
                    placeholder=''
                    onChange={(e: { target: { value: string } }) => {
                      const token = allowedTokenList.find(
                        token => token.address === e.target.value,
                      );
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
                ) : (
                  <p className='my-2 block w-full text-gray-500'>
                    {existingService?.rateToken?.symbol}
                  </p>
                )}
                <span className='text-red-500'>
                  <ErrorMessage name='rateToken' />
                </span>
              </label>
            </div>

            <label className='block'>
              <span className='text-gray-100'>Referral amount (Opt)</span>
              <Field
                type='number'
                id='referralAmount'
                name='referralAmount'
                className='mt-1 mb-1 block w-full rounded-xl border border-gray-700 bg-midnight shadow-sm focus:ring-opacity-50'
                placeholder=''
                validate={validateReferralAmount}
              />
              <span className='text-red-500'>
                <ErrorMessage name='referralAmount' />
              </span>
            </label>

            <SubmitButton isSubmitting={isSubmitting} label='Post' />
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default ServiceForm;
