import { useEffect, useState } from 'react';
import { fetchEmailAmount } from '../components/request';

const useSentEmailAmount = (): { sentEmailsNumber: number | undefined } => {
  const [sentEmailsNumber, setSentEmailAmount] = useState<number>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchEmailAmount();
        const emailsNumber: number = response?.data?.data;
        console.log('emailsNumber', emailsNumber);
        setSentEmailAmount(emailsNumber);
      } catch (error: any) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return { sentEmailsNumber };
};

export default useSentEmailAmount;
