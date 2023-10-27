import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import SubmitButton from './SubmitButton';
import * as Yup from 'yup';
import axios from 'axios';
import { showErrorTransactionToast } from '../../utils/toast';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Loading from '../Loading';
import { useChainId } from '../../hooks/useChainId';
import { useAccount, useWalletClient } from 'wagmi';
import { useWeb3Modal } from '@web3modal/react';
import { IUserDetails } from '../../types';
import { sendPlatformMarketingWeb3mail } from '../request';

interface IFormValues {
  subject: string;
  body: string;
  users: IUserDetails[];
}

const validationSchema = Yup.object({
  subject: Yup.string().required('Please provide a subject'),
  body: Yup.string().required('Please provide a body'),
  users: Yup.array().min(1).required('Please select at least one user'),
});
export const ContactListForm = ({
  userDetailList,
  usersLoaded,
}: {
  userDetailList: IUserDetails[];
  usersLoaded: boolean;
}) => {
  const chainId = useChainId();
  const { data: walletClient } = useWalletClient({ chainId });
  const { address } = useAccount();
  const { open: openConnectModal } = useWeb3Modal();

  const [allContractsAdded, setAllContractsAdded] = useState(false);

  const initialValues: IFormValues = {
    subject: '',
    body: '',
    users: [],
  };

  const handleAddOrRemoveAllContacts = (
    event: React.MouseEvent<HTMLInputElement>,
    arrayHelpers: any,
    users: IUserDetails[],
  ) => {
    setAllContractsAdded(!allContractsAdded);
    if (!allContractsAdded) {
      userDetailList.forEach(userDetail => {
        if (!users.includes(userDetail)) {
          arrayHelpers.push(userDetail);
        }
      });
    } else {
      users.splice(0, users.length);
    }
  };

  const onSubmit = async (
    values: IFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    if (walletClient && address) {
      try {
        setSubmitting(true);

        /**
         * @dev Sign message to prove ownership of the address
         */
        const signature = await walletClient.signMessage({
          account: address,
          message: values.subject,
        });

        const userAddresses = values.users.map(user => user.user.address);

        const promise = sendPlatformMarketingWeb3mail(
          values.subject,
          values.body,
          userAddresses,
          signature,
        );

        await toast.promise(promise, {
          pending: `${
            userAddresses.length === 1 ? `Your email is` : `Your emails are`
          } being sent...`,
          success: `${userAddresses.length === 1 ? `Email ` : `Emails `} sent !`,
          error: `An error occurred while sending your ${
            userAddresses.length === 1 ? `emails` : `email`
          } `,
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
      {({ isSubmitting, values }) => (
        <Form>
          <div className='grid grid-cols-1 gap-6 border border-info rounded-xl p-6 bg-base-100'>
            <label className='block'>
              <span className='text-base-content'>Subject</span>
              <Field
                type='text'
                id='subject'
                name='subject'
                className='mt-1 mb-1 block w-full rounded-xl border border-info bg-base-200 shadow-sm focus:ring-opacity-50'
                placeholder='Type your subject here...'
              />
              <span className='text-error'>
                <ErrorMessage name='subject' />
              </span>
            </label>

            <label className='block'>
              <span className='text-base-content'>Body</span>
              <Field
                as='textarea'
                rows='4'
                id='body'
                name='body'
                className='mt-1 mb-1 block w-full rounded-xl border border-info bg-base-200 shadow-sm focus:ring-opacity-50'
                placeholder='Type the email body here...'
              />
              <span className='text-error'>
                <ErrorMessage name='body' />
              </span>
            </label>

            <FieldArray
              name='users'
              render={arrayHelpers => (
                <div className={'flex flex-row space-x-10'}>
                  <div className='block flex-auto'>
                    <span className='text-base-content'>Available Contacts</span>
                    <div className={'overflow-y-auto overflow-x-visible h-24'}>
                      {!usersLoaded && (
                        <div className={'flex flex-row'}>
                          <Loading />
                          <p className={'flex text-base-content justify-center mt-2 ml-4'}>
                            Loading Contacts...
                          </p>
                        </div>
                      )}
                      {usersLoaded && userDetailList && userDetailList.length > 0
                        ? userDetailList.map((userDetail, index) => {
                            const addedUserIds = values.users.map(user => user.id);
                            const isAddressAlreadyAdded = addedUserIds.includes(userDetail.id);
                            return (
                              <div
                                key={index}
                                className={`text-base-content flex ${
                                  isAddressAlreadyAdded ? 'hidden' : ''
                                }`}>
                                {userDetail.user.handle}
                                <span onClick={() => arrayHelpers.insert(index, userDetail)}>
                                  <CheckCircleIcon
                                    className={
                                      'ml-3 h-5 w-5 items-center justify-center text-base-content cursor-pointer'
                                    }
                                  />
                                </span>
                              </div>
                            );
                          })
                        : usersLoaded && <p className={'text-base-content mt-2'}>No Contacts</p>}
                    </div>
                    <div className={'flex flew-row mt-2 center-items'}>
                      <input
                        type='checkbox'
                        checked={allContractsAdded}
                        className='checked:bg-info0 cursor-pointer center-items mt-1'
                        onClick={event => {
                          handleAddOrRemoveAllContacts(event, arrayHelpers, values.users);
                        }}
                      />
                      <p className={'ml-2 text-base-content center-items'}>Add all contacts</p>
                    </div>
                    <span className='text-error'>
                      <ErrorMessage name='users' />
                    </span>
                  </div>
                  <label className='block flex-auto '>
                    <span className='text-base-content'>Selected Contacts</span>
                    <div className={'overflow-y-auto overflow-x-visible w-auto h-24'}>
                      {values.users.length > 0 ? (
                        values.users.map((userDetails, index) => (
                          <div key={index} className={'text-base-content flex'}>
                            {userDetails.user.handle}
                            <span onClick={() => arrayHelpers.remove(index)}>
                              <XCircleIcon
                                className={
                                  'ml-3 h-5 w-5 items-center justify-center text-base-content cursor-pointer'
                                }
                              />
                            </span>
                          </div>
                        ))
                      ) : (
                        <p className={'text-base-content  mt-2'}>No Contacts</p>
                      )}
                    </div>
                  </label>
                </div>
              )}
            />

            <SubmitButton isSubmitting={isSubmitting} label='Send' />
          </div>
        </Form>
      )}
    </Formik>
  );
};
