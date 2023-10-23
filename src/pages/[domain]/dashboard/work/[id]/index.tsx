import { useRouter } from 'next/router';
import Loading from '../../../../../components/Loading';
import ServiceDetail from '../../../../../components/ServiceDetail';
import useServiceById from '../../../../../hooks/useServiceById';

function Service() {
  const router = useRouter();
  const { id } = router.query;
  const service = useServiceById(id as string);

  return (
    <div className='max-w-7xl mx-auto text-stone-800 sm:px-4 lg:px-0'>
      <div className='-mx-6 -mt-6 sm:mx-0 sm:mt-0'>
        <p className='flex py-2 px-6 sm:px-0 items-center text-2xl font-medium tracking-wider mb-8 border-b w-full border-redpraha md:px-8 '>
          Work <span className='text-stone-800 ml-1'> #{id} </span>
        </p>
      </div>
      {service ? <ServiceDetail service={service} /> : <Loading />}
    </div>
  );
}

export default Service;
