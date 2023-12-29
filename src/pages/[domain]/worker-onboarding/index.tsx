import CreateProfileLayout from '../../../components/CreateProfileLayout';
import CreateWorkerProfileForm from '../../../components/Form/CreateWorkerProfileForm';
import React, { useContext } from 'react';
import TalentLayerContext from '../../../context/talentLayer';
import { useRouter } from 'next/router';

function workerOnboardingStep1() {
  const router = useRouter();
  const { workerProfile } = useContext(TalentLayerContext);
  if (workerProfile?.status === 'validated') {
    router.push('/worker-onboarding/step3');
  }

  return (
    <CreateProfileLayout step={1}>
      <CreateWorkerProfileForm />
    </CreateProfileLayout>
  );
}

export default workerOnboardingStep1;
