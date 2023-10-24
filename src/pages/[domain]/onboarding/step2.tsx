import { getBuilderPlace } from '../../../modules/BuilderPlace/queries';

export async function getServerSideProps({ params }: any) {
  return await getBuilderPlace(params.domain);
}

function workerOnboardingStep2() {
  return (
    <>
      <p>Worker onboarding - step2</p>
    </>
  );
}

export default workerOnboardingStep2;
