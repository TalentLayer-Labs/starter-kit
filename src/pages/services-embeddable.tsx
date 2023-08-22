import { useRouter } from 'next/router';
import React from 'react';
import ServicesEmbed from '../components/ServicesEmbed';
import { ServiceStatusEnum } from '../types';

const ServicesEmbeddable = () => {
  const router = useRouter();

  const boardTitle = (router.query?.title as string) || 'My Gig board';
  const buyerId = (router.query?.buyerId as string) || '0';
  const boardSkill = router.query?.status || 'Opened';
  const boardSkilEnum = ServiceStatusEnum[boardSkill as keyof typeof ServiceStatusEnum];

  return <ServicesEmbed title={boardTitle} buyerId={buyerId} status={boardSkilEnum} />;
};

export default ServicesEmbeddable;
