import { useEffect, useState } from 'react';
import { fetchEmailAmount } from '../components/request';
import { Web3MailStats } from '../../../types';

const useWeb3MailStats = (): { web3MailStats: Web3MailStats } => {
  const [web3MailStats, setWeb3MailStats] = useState<Web3MailStats>({ emailAmount: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchEmailAmount();
        const emailStats: Web3MailStats = response?.data?.data;
        setWeb3MailStats(emailStats);
      } catch (error: any) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return { web3MailStats };
};

export default useWeb3MailStats;
