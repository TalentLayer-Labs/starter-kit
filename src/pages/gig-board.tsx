import { useRouter } from 'next/router';
import React from 'react';
import { useLocation } from 'react-router-dom';
import GigBoard from '../components/GigBoard';
import { ServiceStatusEnum } from '../types';

const GigBoardEmbeddable = () => {
  const router = useRouter();

  const boardTitle = (router.query?.title as string) || 'My Gig board';
  const buyerId = (router.query?.buyerId as string) || '0';
  const boardSkill = router.query?.status || 'Opened';
  const boardSkilEnum = ServiceStatusEnum[boardSkill as keyof typeof ServiceStatusEnum];
  return <GigBoard title={boardTitle} buyerId={buyerId} status={boardSkilEnum} />;
};

export default GigBoardEmbeddable;
