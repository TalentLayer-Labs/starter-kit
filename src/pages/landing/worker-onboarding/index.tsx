import CreateProfileLayout from '../../../components/CreateProfileLayout';
import CreateWorkerProfileForm from '../../../components/Form/CreateWorkerProfileForm';
import { useContext } from 'react';
import TalentLayerContext from '../../../context/talentLayer';
import { useRouter } from 'next/router';
import { EntityStatus } from '@prisma/client';

function workerOnboardingStep1() {
  const router = useRouter();
  const { workerProfile } = useContext(TalentLayerContext);
  if (workerProfile?.status === EntityStatus.VALIDATED) {
    router.push('/worker-onboarding/step3');
  }

  return (
    <CreateProfileLayout step={1}>
      <CreateWorkerProfileForm />
    </CreateProfileLayout>
  );
}

export default workerOnboardingStep1;
