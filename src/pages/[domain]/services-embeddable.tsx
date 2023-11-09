import { useRouter } from 'next/router';
import React from 'react';
import ServicesEmbed from './services-embed';

const ServicesEmbeddable = () => {
  const router = useRouter();
  const boardTitle = (router.query?.title as string) || 'My Gig board';

  return <ServicesEmbed title={boardTitle} />;
};

export default ServicesEmbeddable;
