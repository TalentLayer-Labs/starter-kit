import { useContext } from 'react';
import Loading from '../../../../components/Loading';
import Steps from '../../../../components/Steps';
import TalentLayerContext from '../../../../context/talentLayer';
import useFetchMyContacts from '../../../../modules/Web3mail/hooks/useFetchMyContacts';
import { ContactListForm } from '../../../../components/Form/ContactSelectForm';
import UserNeedsMoreRights from '../../../../components/UserNeedsMoreRights';
import { Link } from 'heroicons-react';
import { ChartBarIcon } from '@heroicons/react/24/outline';

function Web3mail() {
  const { user, loading } = useContext(TalentLayerContext);
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
      <div className='max-w-7xl mx-auto text-stone-800 sm:px-4 lg:px-0'>
        <div className=' -mx-6 -mt-6 '>
          <div className='flex py-2 px-6 items-center border-b w-full border-redpraha mb-8'>
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
    <div className='max-w-7xl mx-auto text-stone-800 sm:px-4 lg:px-0'>
      <div className=' -mx-6 -mt-6 sm:mx-0 sm:mt-0'>
        <div className='flex py-2 px-6 sm:px-0 items-center border-b w-full border-redpraha mb-8'>
          <p className='text-2xl font-medium flex-1'>
            Send <span className='text-stone-800 ml-1'>Web3mails</span>
          </p>
          <a
            href={`/admin/web3mail/stats`}
            className='  text-stone-800 bg-endnight px-3 py-2 text-sm flex items-center rounded-xl'>
            <ChartBarIcon
              width={18}
              height={18}
              className='w-[18px] h-[18px] text-stone-600 mr-2'
            />
            Stats
          </a>
        </div>
      </div>
      <ContactListForm userDetailList={contactList} usersLoaded={contactsLoaded} />
    </div>
  );
}

export default Web3mail;
