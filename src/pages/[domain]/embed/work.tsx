import { useRouter } from 'next/router';
import ServiceList from '../../../components/ServiceList';
import { getBuilderPlace } from '../../../modules/BuilderPlace/queries';

export async function getServerSideProps({ params }: any) {
  return await getBuilderPlace(params.domain);
}

const EmbedWork = () => {
  const router = useRouter();
  const boardTitle = (router.query?.title as string) || 'discover opportunities in our ecosystem';

  return (
    <div className={'text-base-content bg-base-200'}>
      <h1 className='text-title text-4xl mb-4 text-center'>{boardTitle}</h1>
      <ServiceList />
    </div>
  );
};

export default EmbedWork;
