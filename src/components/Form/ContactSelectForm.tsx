import { Formik, Form, Field, FieldArray, useFormikContext } from 'formik';
import SubmitButton from './SubmitButton';
import * as Yup from 'yup';
import axios from 'axios';
import { showErrorTransactionToast } from '../../utils/toast';
import { Contact } from '@iexec/web3mail';

interface IFormValues {
  subject: string;
  body: string;
  contacts: string[];
}

const validationSchema = Yup.object({
  // TODO add here
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
            </label>

            <label className='block'>
              <span className='text-gray-100'>Contacts</span>

              <FieldArray
                name='contacts'
                render={arrayHelpers => (
                  <div>
                    {contactList && contactList.length > 0 ? (
                      contactList.map((contact, index) => (
                        <div key={index}>
                          {contact.owner}
                          <button
                            type='button'
                            onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                          >
                            -
                          </button>
                          <button
                            type='button'
                            onClick={() => arrayHelpers.insert(index, contact.address)} // insert an empty string at a position
                          >
                            +
                          </button>
                        </div>
                      ))
                    ) : (
                      <p>No Contacts</p>
                    )}
                    <div>
                      <button type='submit'>Submit</button>
                    </div>
                  </div>
                )}
              />
            </label>

            <SubmitButton isSubmitting={isSubmitting} label='Send' />
          </div>
        </Form>
      )}
    </Formik>
  );
};
