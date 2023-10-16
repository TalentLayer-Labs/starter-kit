import { useEffect, useState } from 'react';
import { IExecWeb3mail, getWeb3Provider as getMailProvider, Contact } from '@iexec/web3mail';
import { getUsersWeb3MailPreference } from '../../../queries/users';
import { IUserDetails } from '../../../types';
import { useChainId } from '../../../hooks/useChainId';

const useFetchMyContacts = (): { contacts: IUserDetails[]; contactsLoaded: boolean } => {
  const [contacts, setContacts] = useState<IUserDetails[]>([]);
  const [contactsLoaded, setContactsLoaded] = useState(false);
  const chainId = useChainId();

  useEffect(() => {
    const fetchData = async () => {
      if (chainId) {
        try {
          const privateKey = process.env.NEXT_PRIVATE_WEB3MAIL_PLATFORM_PRIVATE_KEY;
          const mailWeb3Provider = getMailProvider(privateKey as string);
          const web3mail = new IExecWeb3mail(mailWeb3Provider);
          const contactList: Contact[] = await web3mail.fetchMyContacts();

          if (contactList && contactList.length > 0) {
            // This array has all the addresses of the users that have granted access to their email to this platform
            const contactAddresses = contactList.map(contact => contact.owner);

            const response = await getUsersWeb3MailPreference(
              Number(chainId),
              contactAddresses,
              'activeOnPlatformMarketing',
            );

            // This array has all the users that have granted access to their email to this platform and opted for the platform marketing feature
            let validUsers: IUserDetails[] = [];

            if (
              response?.data?.data?.userDescriptions &&
              response.data.data.userDescriptions.length > 0
            ) {
              validUsers = response.data.data.userDescriptions;
              // Only select the latest version of each user metaData
              validUsers = validUsers.filter(
                userDetails => userDetails.user?.description?.id === userDetails.id,
              );
              setContacts(validUsers);
            }
          }
        } catch (error: any) {
          // eslint-disable-next-line no-console
          console.error(error);
        } finally {
          setContactsLoaded(true);
        }
      }
    };
    fetchData();
  }, [chainId]);

  return { contacts, contactsLoaded };
};

export default useFetchMyContacts;
