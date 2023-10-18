import { useEffect, useState } from 'react';
import { fetchEmailAmount } from '../components/request';

const useSentEmailAmount = (): { sentEmailsNumber: number } => {
  const [sentEmailsNumber, setSentEmailAmount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchEmailAmount();
        const emailsNumber: number = response?.data?.data;
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
