import type { NextApiRequest, NextApiResponse } from 'next';
import { getServices } from '../../../queries/services';
import keywordFilter from './filter.json';
import { ServiceStatusEnum } from '../../../types';
import { useChainId } from 'wagmi';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const query = req.query;
  const chainId = useChainId();
  // @dev : here you can add the filter logic
  let keywordList = keywordFilter.keywords;

  const serviceStatus = query.serviceStatus as ServiceStatusEnum;
  const buyerId = query.buyerId as string;
  const sellerId = query.sellerId as string;
  const numberPerPage = Number(query.numberPerPage);
  const offset = Number(query.offset);
  const searchQuery = query.searchQuery as string;

  try {
    let response = await getServices(chainId, {
      serviceStatus,
      buyerId,
      sellerId,
      numberPerPage,
      offset,
      keywordList,
      searchQuery,
    });

    const filteredServices = response?.data?.data?.services;

    res.status(200).json({ services: filteredServices });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}