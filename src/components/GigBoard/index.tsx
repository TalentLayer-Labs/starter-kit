import React from 'react';
import useServices from '../../hooks/useServices';
import { ServiceStatusEnum } from '../../types';
import ServiceItem from '../ServiceItem';

interface IGigBoardProps {
  buyerId: string;
  status: ServiceStatusEnum;
  title: string;
}
const GigBoard = (props: IGigBoardProps) => {
  const { services, loading } = useServices(
    props.status,
    props.buyerId,
    undefined,
    undefined,
    undefined,
  );

  if (loading) {
    return <div>Loading</div>;
  }
  if (services.length === 0) {
    return <div>You have no services</div>;
  }
  return (
    <div>
      <h1>{props.title}</h1>
      {services.map(_service => (
        <ServiceItem key={_service.id} service={_service} />
      ))}
    </div>
  );
};

export default GigBoard;
