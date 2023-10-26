import { useRouter } from 'next/router';
import Loading from '../../../../components/Loading';
import ServiceDetail from '../../../../components/ServiceDetail';
import useServiceById from '../../../../hooks/useServiceById';
import { getBuilderPlace } from '../../../../modules/BuilderPlace/queries';

export async function getServerSideProps({ params }: any) {
  const data = await getBuilderPlace(params.domain);
  console.log({ data });
  return data;
}

function Service() {
  const router = useRouter();
  const { id } = router.query;
  const service = useServiceById(id as string);

  return (
    <div className='max-w-7xl mx-auto text-stone-800'>
      <div className='-mx-6 -mt-6 sm:mx-0 sm:mt-0'>
        <p className='flex py-2 items-center text-2xl font-bold tracking-wider mb-6 w-full px-6 sm:px-0 mt-6 '>
          Work <span className='text-stone-800 ml-1'> #{id} </span>
        </p>
      </div>
      {service ? <ServiceDetail service={service} /> : <Loading />}
    </div>
  );
}

export default Service;
