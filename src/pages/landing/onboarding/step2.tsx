import React, { useContext } from 'react';
import TalentLayerContext from '../../../context/talentLayer';
import { useRouter } from 'next/router';
import Steps from '../../../modules/BuilderPlace/components/Steps';

function onboardingStep2() {
  const { account, user, loading } = useContext(TalentLayerContext);
  const router = useRouter();

  if (!account?.isConnected || !user) {
    return <Steps />;
  }

  const goToStep3 = () => {
    router.push('/dashboard/onboarding/step3');
  };
  //TODO Fire API "setOwner" qui set le tlid et l'address (ajouter sécu sur owner & address déjà populate).
  //TODO 2 update metadata aussi
  //TODO 3 set une signature pour update
  return (
    <>
      <div className={'flex flex-col items-center justify-center'}>
        <h1>Hello {user.handle}</h1>
        <p>
          if you would like to use a different TalentLayer ID, please connect a different wallet.
          you’ll then be prompted to create a new ID
        </p>
        <button
          onClick={() => {
            goToStep3();
          }}>
          Use this Id
        </button>
      </div>
    </>
  );
}

export default onboardingStep2;
