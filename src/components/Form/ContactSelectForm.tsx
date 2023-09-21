import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import SubmitButton from './SubmitButton';
import * as Yup from 'yup';
import axios from 'axios';
import { showErrorTransactionToast } from '../../utils/toast';
import { Contact } from '@iexec/web3mail';

interface IFormValues {
  subject: string;
  body: string;
  contacts: { address: string; index: number }[];
}

const validationSchema = Yup.object({
  subject: Yup.string().required('Please provide a subject'),
  body: Yup.string().required('Please provide a body'),
  contacts: Yup.array().min(1).required('Please provide at least one contact'),
});
export const ContactListForm = ({ contactList }: { contactList: Contact[] }) => {
  const initialValues: IFormValues = {
    subject: '',
    body: '',
    contacts: [],
  };

  const onSubmit = async (
    values: IFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    console.log(values);
    // if (user && provider && signer) {
    try {
      setSubmitting(true);

      await axios.post('/api/iexec/send-web3mail-to-addresses', {
        subject: values.subject,
        body: values.body,
        contacts: values.contacts,
      });

      setSubmitting(false);
    } catch (error) {
      showErrorTransactionToast(error);
    }
    // } else {
    //   openConnectModal();
    // }
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
                  <label className='block flex-auto'>
                    <span className='text-gray-100'>Available Contacts</span>
                    <div className={'overflow-y-auto overflow-x-visible h-24'}>
                      {contactList && contactList.length > 0 ? (
                        contactList.map((contact, index) => {
                          const handleAddContact = () => {
                            arrayHelpers.insert(index, {
                              address: contact.owner,
                              index,
                            });
                            console.log(values.contacts);
                          };
                          const handleRemoveContact = () => {
                            arrayHelpers.remove(index);
                          };
                          const addressAlreadyAdded = values.contacts
                            .map(contact => contact.address)
                            .includes(contact.owner);
                          return (
                            <div
                              key={index}
                              className={`text-gray-400 ${addressAlreadyAdded ? 'hidden' : ''}`}>
                              {contact.owner}
                              <button
                                type='button'
                                onClick={handleRemoveContact} // remove a friend from the list
                              >
                                -
                              </button>
                              <button
                                type='button'
                                onClick={handleAddContact} // insert an empty string at a position
                              >
                                +
                              </button>
                            </div>
                          );
                        })
                      ) : (
                        <p>No Contacts</p>
                      )}
                    </div>
                    <span className='text-red-500'>
                      <ErrorMessage name='contacts' />
                    </span>
                  </label>
                  <label className='block flex-auto '>
                    <span className='text-gray-100'>Selected Contacts</span>
                    <div className={'overflow-y-auto overflow-x-visible w-auto h-24'}>
                      {values.contacts.length > 0 ? (
                        values.contacts.map(contact => (
                          <div key={contact.index} className={'text-gray-400'}>
                            {contact.address}
                            <button
                              type='button'
                              onClick={() => arrayHelpers.remove(contact.index)}>
                              -
                            </button>
                          </div>
                        ))
                      ) : (
                        <p>No Contacts</p>
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
