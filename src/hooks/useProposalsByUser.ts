import { useContext, useEffect, useState } from 'react';
import { getAllProposalsByUsers } from '../queries/proposals';
import { IProposal } from '../types';
import { useChainId } from './useChainId';
import BuilderPlaceContext from '../modules/BuilderPlace/context/BuilderPlaceContext';

const useProposalsByUser = (id?: string | undefined): IProposal[] => {
  const { builderPlace } = useContext(BuilderPlaceContext);

  const chainId = useChainId();
  const [proposals, setProposals] = useState<IProposal[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const response = await getAllProposalsByUsers(
            chainId,
            id,
            builderPlace?.owner?.talentLayerId as string,
          );

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
  }, [id]);

  return proposals;
};

export default useProposalsByUser;
