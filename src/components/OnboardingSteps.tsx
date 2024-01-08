function OnboardingSteps({ currentStep, type }: { currentStep: number; type: string }) {
  const getCircleColor = (step: number) => {
    if (step === currentStep) {
      return 'bg-pink-500';
    } else {
      return 'bg-pink-200';
    }
  };

  return (
    <div className='mt-6 hidden sm:flex justify-center items-center '>
      <div className='w-full md:w-3/4 border-2 bg-base-100 border-solid border-opacity-10 border-info rounded-2xl p-4 mx-6'>
        <div className='flex flex-col sm:flex-row'>
          <div className='sm:flex-1 border-r border-dark bg-base-100 flex sm:mb-0 mb-2 items-center justify-center'>
            <div
              className={`w-12 h-12 p-2 rounded-full flex items-center justify-center ${getCircleColor(
                1,
              )}`}>
              <div className='text-white text-xl font-semibold'>1</div>
            </div>
            <div className='ml-3 flex flex-col'>
              <div className='text-light text-xl font-semibold leading-6'>create</div>
              <div className='text-light text-sm'>{type} profile</div>
            </div>
          </div>
          <div className='sm:flex-1 border-r border-info bg-base-100 flex sm:mb-0 mb-2 items-center justify-center'>
            <div
              className={`w-12 h-12 p-2 rounded-full flex items-center justify-center ${getCircleColor(
                2,
              )}`}>
              <div className='text-white text-xl font-semibold'>2</div>
            </div>
            <div className='ml-3 flex flex-col'>
              <div className='text-light text-xl font-semibold leading-6'>setup</div>
              <div className='text-light text-sm'>on-chain Identity</div>
            </div>
          </div>
          <div className='sm:flex-1 bg-base-100 flex items-center justify-center'>
            <div
              className={`w-12 h-12 p-2 rounded-full flex items-center justify-center ${getCircleColor(
                3,
              )}`}>
              <div className='text-white text-xl font-semibold'>3</div>
            </div>
            <div className='ml-3 flex flex-col'>
              <div className='text-light text-xl font-semibold leading-6'>
                {type == 'hirer' ? 'customize' : 'view'}
              </div>
              <div className='text-light text-sm'>profile</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OnboardingSteps;
