import React from 'react';
import ServiceList from '../../components/ServiceList';

interface IServicesEmbedProps {
  title: string;
}
const ServicesEmbed = (props: IServicesEmbedProps) => {
  return (
    <div>
      <h1 className='text-title text-4xl mb-4 text-center'>{props.title}</h1>
      <ServiceList />
    </div>
  );
};

export default ServicesEmbed;
