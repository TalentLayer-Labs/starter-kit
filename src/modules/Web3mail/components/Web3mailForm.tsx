import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline';
import { useWeb3Modal } from '@web3modal/react';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { usePublicClient, useSwitchNetwork, useWalletClient } from 'wagmi';
import * as Yup from 'yup';
import ConnectBlock from '../../../components/ConnectBlock';
import SubmitButton from '../../../components/Form/SubmitButton';
import Loading from '../../../components/Loading';
import Step from '../../../components/Step';
import TalentLayerContext from '../../../context/talentLayer';
import { useChainId } from '../../../hooks/useChainId';
import { NetworkEnum } from '../../../types';
import { showErrorTransactionToast } from '../../../utils/toast';
import Web3MailContext from '../context/web3mail';
import Web3mailStep1 from './Web3mailStep1';

interface IFormValues {
  email: string;
}

function Web3mailForm() {
  const chainId = useChainId();
  const { switchNetwork } = useSwitchNetwork();
  const { open: openConnectModal } = useWeb3Modal();
  const { account, loading } = useContext(TalentLayerContext);
  const { platformHasAccess, protectEmailAndGrantAccess, emailIsProtected } =
    useContext(Web3MailContext);
  const { data: walletClient } = useWalletClient({ chainId });
  const publicClient = usePublicClient({ chainId });
  const router = useRouter();

  console.log({ account });

  if (loading) {
    return <Loading />;
  }

  if (!account?.isConnected) {
    return <ConnectBlock />;
  }

  if (platformHasAccess) {
    return (
      <div className='pb-6'>
        <label className='block'>
          <div className='mb-2 ml-0.5'>
            <div className='flex justify-between'>
              <div>
                <p className='font-heading font-medium leading-none'>Everything is setup</p>
                <p className='font-sans text-xs font-normal leading-normal text-stone-600 mt-0.5'>
                  your web3mail is ready to use, you can come back to polygon and to your profile
                  setup
                </p>
              </div>
            </div>
          </div>
        </label>
        <button
          onClick={async () => {
            switchNetwork &&
              (await switchNetwork(
                process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID as unknown as NetworkEnum,
              ));

            router.push('/profiles/edit/privacy');
          }}
          className='grow px-5 py-2 rounded-xl bg-redpraha text-stone-800 hover:bg-midnight inline-flex align-center justify-center '>
          <ArrowLeftCircleIcon className='w-[22px] h-[22px] text-stone-600 mr-2 mt-05' />
          <span>Switch back to Polygon and go back to my profile</span>
        </button>
      </div>
    );
  }

  const initialValues: IFormValues = {
    email: '',
  };

  const validationSchema = Yup.object({
    email: emailIsProtected
      ? Yup.string().notRequired()
      : Yup.string().required('email is required').email('email is not valid'),
  });

  const onSubmit = async (
    values: IFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    if (walletClient && publicClient) {
      try {
        const promise = protectEmailAndGrantAccess(values.email);
        await toast.promise(promise, {
          pending: 'Pending transactions, follow instructions in your wallet',
          success: 'Access granted succefully',
          error: 'An error occurred while granting access',
        });
        setSubmitting(false);
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
      {({ isSubmitting }) => (
        <Form>
          <div className='pb-6'>
            <nav className='mb-8'>
              <ol
                role='list'
                className='divide-y divide-gray-200 rounded-xl border border-redpraha md:flex md:divide-y-0'>
                <Step
                  title='Switch Chain'
                  status={chainId != NetworkEnum.IEXEC ? 'inprogress' : 'done'}
                  order={1}
                />
                <Step
                  title='Fill your email'
                  status={chainId != NetworkEnum.IEXEC ? 'todo' : 'inprogress'}
                  order={2}
                  isLast={true}
                />
              </ol>
            </nav>

            <Web3mailStep1 />
          </div>

          {chainId == NetworkEnum.IEXEC && (
            <>
              <label className='block'>
                <div className='mb-2 ml-1'>
                  <p className='font-heading text-base font-medium leading-none'>Your email</p>
                  <p className='font-sans text-xs font-normal leading-normal text-stone-600 mt-0.5'>
                    It will allow you to configure your preferences to be notified every time an
                    important action happened.
                  </p>
                </div>

                {emailIsProtected ? (
                  <>
                    <Field
                      type='text'
                      id='email'
                      name='email'
                      className='cursor-not-allowed mt-1 mb-1 block w-full rounded-xl border border-redpraha bg-midnight shadow-sm focus:ring-opacity-50'
                      placeholder='**********'
                      readOnly
                      disabled
                      title='You already protect your email, just need to grant access now'
                    />
                    <span className='text-xs text-stone-600 ml-1'>
                      You already protect your email, just need to grant access now
                    </span>
                  </>
                ) : (
                  <Field
                    type='text'
                    id='email'
                    name='email'
                    className='mt-1 mb-1 block w-full rounded-xl border border-redpraha bg-midnight shadow-sm focus:ring-opacity-50'
                    placeholder=''
                  />
                )}
              </label>

              <SubmitButton
                isSubmitting={isSubmitting}
                label={emailIsProtected ? 'Grant access' : 'Protect and Grant access'}
              />
            </>
          )}
        </Form>
      )}
    </Formik>
  );
}

export default Web3mailForm;
