import { GetServerSidePropsContext } from 'next';
import { useContext } from 'react';
import CustomMarkdown from '../../components/CustomMarkdown';
import Loading from '../../components/Loading';
import OrganizationHeader from '../../components/OrganizationHeader';
import BuilderPlaceContext from '../../modules/BuilderPlace/context/BuilderPlaceContext';
import { sharedGetServerSideProps } from '../../utils/sharedGetServerSideProps';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return sharedGetServerSideProps(context);
}

export default function BuilderPlaceTech() {
  const { builderPlace } = useContext(BuilderPlaceContext);

  if (!builderPlace) return <Loading />;

  return (
    <div className='max-w-7xl mx-auto text-base-content'>
      <OrganizationHeader />

      <div className='-mx-6 -mt-6 sm:mx-0 sm:mt-0'>
        <div className='flex py-2 px-6 sm:px-0 w-full mb-3'>
          <p className='text-2xl sm:text-4xl font-bold mt-12'>our tech</p>
        </div>
      </div>
      <div className='markdown-body text-sm text-base-content mt-4'>
        <CustomMarkdown content={builderPlace.aboutTech} />
      </div>
    </div>
  );
}
