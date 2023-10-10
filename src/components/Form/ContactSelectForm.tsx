import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import SubmitButton from './SubmitButton';
import * as Yup from 'yup';
import axios from 'axios';
import { showErrorTransactionToast } from '../../utils/toast';
import { Contact } from '@iexec/web3mail';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Loading from '../Loading';
import { useChainId } from '../../hooks/useChainId';
import { useAccount, useWalletClient } from 'wagmi';
import { useWeb3Modal } from '@web3modal/react';

interface IFormValues {
  subject: string;
  body: string;
  contacts: string[];
}

const validationSchema = Yup.object({
  subject: Yup.string().required('Please provide a subject'),
  body: Yup.string().required('Please provide a body'),
  contacts: Yup.array().min(1).required('Please provide at least one contact'),
});
export const ContactListForm = ({
  contactList,
  contactsLoaded,
}: {
  contactList: Contact[];
  contactsLoaded: boolean;
}) => {
  const chainId = useChainId();
  const { data: walletClient } = useWalletClient({ chainId });
  const { address } = useAccount();
  const { open: openConnectModal } = useWeb3Modal();

  const [allContractsAdded, setAllContractsAdded] = useState(false);

  const initialValues: IFormValues = {
    subject: '',
    body: '',
    contacts: [],
  };

  const handleAddOrRemoveAllContacts = (
    event: React.MouseEvent<HTMLInputElement>,
    arrayHelpers: any,
    contacts: string[],
  ) => {
    setAllContractsAdded(!allContractsAdded);
    if (!allContractsAdded) {
      contactList.forEach(contact => {
        if (!contacts.includes(contact.owner)) {
          arrayHelpers.push(contact.owner);
        }
      });
    } else {
      contacts.splice(0, contacts.length);
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

        const promise = axios.post('/api/web3mail/send-web3mail-to-addresses', {
          subject: values.subject,
          body: values.body,
          contacts: values.contacts,
          signature: signature,
        });

        await toast.promise(promise, {
          pending: 'Your emails are being sent...',
          success: 'Emails sent !',
          error: 'An error occurred while sending emails',
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
          <div className='grid grid-cols-1 gap-6 border border-gray-700 rounded-xl p-6 bg-endnight'>
            <label className='block'>
              <span className='text-gray-100'>Subject</span>
              <Field
                type='text'
                id='subject'
                name='subject'
                className='mt-1 mb-1 block w-full rounded-xl border border-gray-700 bg-midnight shadow-sm focus:ring-opacity-50'
                placeholder='Type your subject here...'
              />
              <span className='text-red-500'>
                <ErrorMessage name='subject' />
              </span>
            </label>

            <label className='block'>
              <span className='text-gray-100'>Body</span>
              <Field
                as='textarea'
                rows='4'
                id='body'
                name='body'
                className='mt-1 mb-1 block w-full rounded-xl border border-gray-700 bg-midnight shadow-sm focus:ring-opacity-50'
                placeholder='Type the email body here...'
              />
              <span className='text-red-500'>
                <ErrorMessage name='body' />
              </span>
            </label>

            <FieldArray
              name='contacts'
              render={arrayHelpers => (
                <div className={'flex flex-row space-x-10'}>
                  <div className='block flex-auto'>
                    <span className='text-gray-100'>Available Contacts</span>
                    <div className={'overflow-y-auto overflow-x-visible h-24'}>
                      {!contactsLoaded && (
                        <div className={'flex flex-row'}>
                          <Loading />
                          <p className={'flex text-gray-400 justify-center mt-2 ml-4'}>
                            Loading Contacts...
                          </p>
                        </div>
                      )}
                      {contactsLoaded && contactList && contactList.length > 0
                        ? contactList.map((contact, index) => {
                            const addressAlreadyAdded = values.contacts.includes(contact.owner);
                            return (
                              <div
                                key={index}
                                className={`text-gray-400 flex ${
                                  addressAlreadyAdded ? 'hidden' : ''
                                }`}>
                                {contact.owner}
                                <span onClick={() => arrayHelpers.insert(index, contact.owner)}>
                                  <CheckCircleIcon
                                    className={
                                      'ml-3 h-5 w-5 items-center justify-center text-zinc-300 cursor-pointer'
                                    }
                                  />
                                </span>
                              </div>
                            );
                          })
                        : contactsLoaded && <p className={'text-gray-400 mt-2'}>No Contacts</p>}
                    </div>
                    <div className={'flex flew-row mt-2 center-items'}>
                      <input
                        type='checkbox'
                        checked={allContractsAdded}
                        className='checked:bg-gray-500 cursor-pointer center-items mt-1'
                        onClick={event => {
                          handleAddOrRemoveAllContacts(event, arrayHelpers, values.contacts);
                        }}
                      />
                      <p className={'ml-2 text-gray-400 center-items'}>Add all contacts</p>
                    </div>
                    <span className='text-red-500'>
                      <ErrorMessage name='contacts' />
                    </span>
                  </div>
                  <label className='block flex-auto '>
                    <span className='text-gray-100'>Selected Contacts</span>
                    <div className={'overflow-y-auto overflow-x-visible w-auto h-24'}>
                      {values.contacts.length > 0 ? (
                        values.contacts.map((contact, index) => (
                          <div key={index} className={'text-gray-400 flex'}>
                            {contact}
                            <span onClick={() => arrayHelpers.remove(index)}>
                              <XCircleIcon
                                className={
                                  'ml-3 h-5 w-5 items-center justify-center text-zinc-300 cursor-pointer'
                                }
                              />
                            </span>
                          </div>
                        ))
                      ) : (
                        <p className={'text-gray-400  mt-2'}>No Contacts</p>
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
