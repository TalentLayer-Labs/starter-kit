import { GetServerSidePropsContext } from 'next';
import { sharedGetServerSideProps } from '../../../utils/sharedGetServerSideProps';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return sharedGetServerSideProps(context);
}

function onboardingStep3() {
  return (
    <>
      <p>Hirer onboarding - step3</p>
    </>
  );
}

export default onboardingStep3;
