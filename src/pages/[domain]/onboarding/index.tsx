import { GetServerSidePropsContext } from 'next';
import { sharedGetServerSideProps } from '../../../utils/sharedGetServerSideProps';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return sharedGetServerSideProps(context);
}

function workerOnboardingStep1() {
  return (
    <>
      <p>Worker onboarding - step1</p>
    </>
  );
}

export default workerOnboardingStep1;
