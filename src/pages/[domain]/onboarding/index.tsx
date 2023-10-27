import { getBuilderPlace } from '../../../modules/BuilderPlace/queries';

export async function getServerSideProps({ params }: any) {
  return await getBuilderPlace(params.domain);
}

function workerOnboardingStep1() {
  return (
    <>
      <p>Worker onboarding - step1</p>
    </>
  );
}

export default workerOnboardingStep1;
