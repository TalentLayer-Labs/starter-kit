import { useEffect, useState } from 'react';
import { getAllProposalsByServiceId } from '../queries/proposals';
import { IProposal } from '../types';
import { useChainId } from './useChainId';

const useProposalsByService = (serviceId?: string | undefined): IProposal[] => {
  const chainId = useChainId();
  const [proposals, setProposals] = useState<IProposal[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (serviceId) {
        try {
          const response = await getAllProposalsByServiceId(chainId, serviceId);

          if (response?.data?.data?.proposals) {
            setProposals(response.data.data.proposals);
          }
        } catch (error: any) {
          // eslint-disable-next-line no-console
          console.error(error);
        }
      } else {
        setProposals([]);
      }
    };
    fetchData();
  }, [serviceId]);

  return proposals;
};

export default useProposalsByService;
