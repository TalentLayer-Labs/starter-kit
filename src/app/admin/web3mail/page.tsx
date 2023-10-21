"use client"

import Loading from '../../../components/Loading';
import Steps from '../../../components/Steps';
import useFetchMyContacts from '../../../modules/Web3mail/hooks/useFetchMyContacts';
import { ContactListForm } from '../../../components/Form/ContactSelectForm';
import UserNeedsMoreRights from '../../../components/UserNeedsMoreRights';
import { useTalentLayer } from '@talentlayer/react/dist';

export default function Web3mail() {
  const { user, loading } = useTalentLayer();
  const { contacts: contactList, contactsLoaded } = useFetchMyContacts();
  const isWeb3mailActive = process.env.NEXT_PUBLIC_ACTIVE_WEB3MAIL as string;

  if (loading) {
    return <Loading />;
  }
  if (!user) {
    return <Steps />;
  }
  if (!user.isAdmin) {
    return <UserNeedsMoreRights />;
  }

  if (isWeb3mailActive === 'false') {
    return (
      <div className='max-w-7xl mx-auto text-gray-200 sm:px-4 lg:px-0'>
        <div className=' -mx-6 -mt-6 '>
          <div className='flex py-2 px-6 items-center border-b w-full border-gray-700 mb-8'>
            <p className='text-2xl font-medium flex-1'>Send Web3 Mails</p>
          </div>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <p className='text-2xl font-medium flex-1'>Web3mail is not active</p>
        </div>
      </div>
    );
  }

  return (
    <div className='max-w-7xl mx-auto text-gray-200 sm:px-4 lg:px-0'>
      <div className=' -mx-6 -mt-6 '>
        <div className='flex py-2 px-6 items-center border-b w-full border-gray-700 mb-8'>
          <p className='text-2xl font-medium flex-1'>Send Web3 Mails</p>
        </div>
      </div>
      <ContactListForm userDetailList={contactList} usersLoaded={contactsLoaded} />
    </div>
  );
}
