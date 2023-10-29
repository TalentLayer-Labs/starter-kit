import { useContext, useEffect } from 'react';
import CreateWorkerId from '../../../components/Home/CreateWorkerId';
import Steps from '../../../components/Steps';
import TalentLayerContext from '../../../context/talentLayer';
import Loading from '../../../components/Loading';
import { useRouter } from 'next/router';
import OnboardingSteps from '../../../components/OnboardingSteps';

function workerOnboardingStep1() {
  const { account, loading, user } = useContext(TalentLayerContext);
  const router = useRouter();

  useEffect(() => {
    if (account?.isConnected && user) {
      router.push('/worker-onboarding/step2');
    }
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <OnboardingSteps currentStep={1} type="Worker" />
      <CreateWorkerId />
      <div className='flex flex-col items-center justify-center gap-10'>
        <Steps />
      </div>
    </>
  );
}

export default workerOnboardingStep1;
