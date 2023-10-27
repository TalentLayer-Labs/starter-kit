import { useRouter } from 'next/router';
import Loading from '../../../../components/Loading';
import ServiceDetail from '../../../../components/ServiceDetail';
import useServiceById from '../../../../hooks/useServiceById';
import { getBuilderPlace } from '../../../../modules/BuilderPlace/queries';
import { useContext } from 'react';
import BuilderPlaceContext from '../../../../modules/BuilderPlace/context/BuilderPlaceContext';
import AccessDenied from '../../../../components/AccessDenied';
import NotFound from '../../../../components/NotFound';

export async function getServerSideProps({ params }: any) {
  const data = await getBuilderPlace(params.domain);
  console.log({ data });
  return data;
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
          Work <span className='text-base-content ml-1'> #{id} </span>
        </p>
      </div>
      {service ? <ServiceDetail service={service} /> : <Loading />}
    </div>
  );
}

export default Service;
