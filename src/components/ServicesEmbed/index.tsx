import React from 'react';
import useServices from '../../hooks/useServices';
import { ServiceStatusEnum } from '../../types';
import Loading from '../Loading';
import ServiceItem from '../ServiceItem';

interface IServicesEmbedProps {
  buyerId: string;
  status: ServiceStatusEnum;
  title: string;
}
const ServicesEmbed = (props: IServicesEmbedProps) => {
  const { services, loading } = useServices(props.status, props.buyerId);

  if (loading) {
    return (
      <div className='flex justify-center items-center gap-10 flex-col pb-5 mt-5'>
        <Loading />
      </div>
    );
  }

  if (services.length === 0) {
    return <h1 className='text-title text-4xl mb-4 text-center mt-3'>You have no gigs</h1>;
  }

  return (
    <div>
      <h1 className='text-title text-4xl mb-4 text-center'>{props.title}</h1>
      {services.map(_service => (
        <div className='my-2' key={_service.id}>
          <ServiceItem service={_service} />
        </div>
      ))}
    </div>
  );
};

export default ServicesEmbed;
