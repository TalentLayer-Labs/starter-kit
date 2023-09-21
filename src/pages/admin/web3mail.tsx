import { useWeb3Modal } from '@web3modal/react';
import { useContext } from 'react';
import Loading from '../../components/Loading';
import Steps from '../../components/Steps';
import TalentLayerContext from '../../context/talentLayer';
import { Contact } from '@iexec/web3mail';
import useFetchMyContacts from '../../modules/Web3mail/hooks/useFetchMyContacts';
import { ContactListForm } from '../../components/Form/ContactSelectForm';

function Web3mail() {
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

  return (
    <div className='max-w-7xl mx-auto text-gray-200 sm:px-4 lg:px-0'>
      <div className=' -mx-6 -mt-6 '>
        <div className='flex py-2 px-6 items-center border-b w-full border-gray-700 mb-8'>
          <p className='text-2xl font-medium flex-1'>Send a Web3 Mail</p>
        </div>
      </div>
      <ContactListForm contactList={contactList} />
    </div>
  );
}

export default Web3mail;