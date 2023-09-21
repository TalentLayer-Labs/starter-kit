import { useWeb3Modal } from '@web3modal/react';
import { Field, FieldArray, Form, Formik } from 'formik';
import { useContext } from 'react';
import * as Yup from 'yup';
import SubmitButton from '../../components/Form/SubmitButton';
import Loading from '../../components/Loading';
import Steps from '../../components/Steps';
import TalentLayerContext from '../../context/talentLayer';
import { showErrorTransactionToast } from '../../utils/toast';
import { Contact } from '@iexec/web3mail';
import useFetchMyContacts from '../../modules/Web3mail/hooks/useFetchMyContacts';
import axios from 'axios';

interface IFormValues {
  subject: string;
  body: string;
  contacts: string[];
}

const validationSchema = Yup.object({
  // nothing required
});

function Web3Mail() {
  const { user, loading } = useContext(TalentLayerContext);
  const { open: openConnectModal } = useWeb3Modal();
  const contactList: Contact[] = useFetchMyContacts();

  if (loading) {
    return <Loading />;
  }
  if (!user) {
    return <Steps />;
  }
  // if (!user.isAdmin) {
  //   return <UserNeedsMoreRights />;
  // }

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
    <div className='max-w-7xl mx-auto text-gray-200 sm:px-4 lg:px-0'>
      <div className=' -mx-6 -mt-6 '>
        <div className='flex py-2 px-6 items-center border-b w-full border-gray-700 mb-8'>
          <p className='text-2xl font-medium flex-1'>Send a Web3 Mail</p>
        </div>
      </div>

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

                {/*<SkillsInput initialValues={userDescription?.skills_raw} entityId={'skills'} />*/}

                {/*<Field type='hidden' id='contacts' name='contacts' />*/}
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
    </div>
  );
}

export default Web3Mail;
