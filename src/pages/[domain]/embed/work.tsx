import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import ServiceList from '../../../components/ServiceList';
import { sharedGetServerSideProps } from '../../../utils/sharedGetServerSideProps';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return sharedGetServerSideProps(context);
}

const EmbedWork = () => {
  const router = useRouter();
  const boardTitle = (router.query?.title as string) || '';

  return (
    <div className={'text-base-content bg-base-200'}>
      <h1 className='text-title text-4xl mb-4 text-center'>{boardTitle}</h1>
      <ServiceList />
    </div>
  );
};

export default EmbedWork;
