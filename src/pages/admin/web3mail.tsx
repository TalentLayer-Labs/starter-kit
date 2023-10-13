import { useWeb3Modal } from '@web3modal/react';
import { useContext } from 'react';
import Loading from '../../components/Loading';
import Steps from '../../components/Steps';
import TalentLayerContext from '../../context/talentLayer';
import useFetchMyContacts from '../../modules/Web3mail/hooks/useFetchMyContacts';
import { ContactListForm } from '../../components/Form/ContactSelectForm';
import UserNeedsMoreRights from '../../components/UserNeedsMoreRights';

function Web3mail() {
  const { user, loading } = useContext(TalentLayerContext);
  const { contacts: contactList, contactsLoaded } = useFetchMyContacts();

  if (loading) {
    return <Loading />;
  }
  if (!user) {
    return <Steps />;
  }
  if (!user.isAdmin) {
    return <UserNeedsMoreRights />;
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

export default Web3mail;
