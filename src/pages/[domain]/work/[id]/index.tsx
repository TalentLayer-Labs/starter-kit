import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import Loading from '../../../../components/Loading';
import NotFound from '../../../../components/NotFound';
import ServiceDetail from '../../../../components/ServiceDetail';
import useServiceById from '../../../../hooks/useServiceById';
import BuilderPlaceContext from '../../../../modules/BuilderPlace/context/BuilderPlaceContext';
import { sharedGetServerSideProps } from '../../../../utils/sharedGetServerSideProps';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return sharedGetServerSideProps(context);
}

function Service() {
  const { builderPlace } = useContext(BuilderPlaceContext);
  const router = useRouter();
  const { id } = router.query;
  const { service, isLoading } = useServiceById(id as string);

  if (isLoading) {
    return <Loading />;
  }

  if (builderPlace?.ownerTalentLayerId !== service?.buyer.id) {
    return <NotFound />;
  }

  return (
    <div className='max-w-7xl mx-auto text-base-content'>
      <div className='-mx-6 -mt-6 sm:mx-0 sm:mt-0'>
        <p className='flex py-2 items-center text-2xl font-bold tracking-wider mb-6 w-full px-6 sm:px-0 mt-6 '>
          mission
        </p>
      </div>
      {service ? <ServiceDetail service={service} /> : <Loading />}
    </div>
  );
}

export default Service;
