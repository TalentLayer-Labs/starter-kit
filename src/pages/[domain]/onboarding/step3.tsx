import { getBuilderPlace } from '../../../modules/BuilderPlace/queries';

export async function getServerSideProps({ params }: any) {
  return await getBuilderPlace(params.domain);
}

function onboardingStep3() {
  return (
    <>
      <p>Hirer onboarding - step3</p>
    </>
  );
}

export default onboardingStep3;
