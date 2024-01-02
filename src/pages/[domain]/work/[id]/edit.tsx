import { GetServerSidePropsContext } from 'next';
import { useContext } from 'react';
import AccessDenied from '../../../../components/AccessDenied';
import ServiceForm from '../../../../components/Form/ServiceForm';
import Steps from '../../../../components/Steps';
import TalentLayerContext from '../../../../context/talentLayer';
import BuilderPlaceContext from '../../../../modules/BuilderPlace/context/BuilderPlaceContext';
import { sharedGetServerSideProps } from '../../../../utils/sharedGetServerSideProps';
import useServiceById from '../../../../hooks/useServiceById';
import Loading from '../../../../components/Loading';
import { useRouter } from 'next/router';
import NotFound from '../../../../components/NotFound';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return sharedGetServerSideProps(context);
}

function EditService() {
  const router = useRouter();
  const { id } = router.query;
  const { service, isLoading } = useServiceById(id as string);
  const { account, user } = useContext(TalentLayerContext);
  const { isBuilderPlaceCollaborator } = useContext(BuilderPlaceContext);

  if (isLoading) {
    return <Loading />;
  }

  if (!user) {
    return <Steps />;
  }

  if (!isBuilderPlaceCollaborator) {
    return <AccessDenied />;
  }

  if (!service) {
    return <NotFound />;
  }

  return (
    <div className='max-w-7xl mx-auto text-base-content'>
      <div className='-mx-6 -mt-6 sm:mx-0 sm:mt-0'>
        <p className='flex py-2 items-center text-2xl font-bold tracking-wider mb-6 w-full px-6 sm:px-0 mt-6 '>
          Edit <span className='text-base-content ml-1'>mission #{service.id} </span>
        </p>
      </div>

      {account?.isConnected && user && <ServiceForm existingService={service} />}
    </div>
  );
}

export default EditService;
