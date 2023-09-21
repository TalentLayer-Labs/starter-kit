import { useEffect, useState } from 'react';
import { IExecWeb3mail, getWeb3Provider as getMailProvider, Contact } from '@iexec/web3mail';

const useFetchMyContacts = (): Contact[] => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const privateKey = process.env.NEXT_PUBLIC_WEB3MAIL_PLATFORM_PRIVATE_KEY;
        const mailWeb3Provider = getMailProvider(privateKey as string);
        const web3mail = new IExecWeb3mail(mailWeb3Provider);
        const contactList: Contact[] = await web3mail.fetchMyContacts();
        console.log('contactList', contactList);
        if (contactList.length > 0) {
          setContacts(contactList);
        }
      } catch (error: any) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return contacts;
};

export default useFetchMyContacts;
