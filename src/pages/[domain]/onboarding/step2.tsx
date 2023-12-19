import { GetServerSidePropsContext } from 'next';
import { sharedGetServerSideProps } from '../../../utils/sharedGetServerSideProps';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return sharedGetServerSideProps(context);
}

function workerOnboardingStep2() {
  return (
    <>
      <p>Worker onboarding - step2</p>
    </>
  );
}

export default workerOnboardingStep2;
