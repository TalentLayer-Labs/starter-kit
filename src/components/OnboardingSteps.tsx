function OnboardingSteps({ currentStep,type }: { currentStep: number, type:string}) {
  const getCircleColor = (step: number) => {
    if (step === currentStep) {
      return 'bg-pink-500';
    } else {
      return 'bg-pink-200';
    }
  };

  return (
    <div className='mt-6 flex justify-center items-center'>
      <div className='w-full md:w-3/4 bg-FFF8F1 border border-2 border-solid border-opacity-10 rounded-2xl p-4'>
        <div className='flex flex-col md:flex-row'>
          <div className='md:flex-1 border-r border-dark bg-base-100 flex sm:mb-0 mb-2 items-center justify-center'>
            <div
              className={`w-12 h-12 p-2 rounded-full border border-dark flex items-center justify-center ${getCircleColor(1)}`}
            >
              <div className='text-white text-xl font-semibold'>1</div>
            </div>
            <div className='ml-4 flex flex-col'>
              <div className='text-light text-xl font-semibold'>Create</div>
              <div className='text-light text-sm'>{type} Profile</div>
            </div>
          </div>
          <div className='md:flex-1 border-r border-dark bg-base-100 flex sm:mb-0 mb-2 items-center justify-center' >
            <div
              className={`w-12 h-12 p-2 rounded-full border border-dark flex items-center justify-center ${getCircleColor(2)}`}
            >
              <div className='text-white text-xl font-semibold'>2</div>
            </div>
            <div className='ml-4 flex flex-col'>
              <div className='text-light text-xl font-semibold'>Setup</div>
              <div className='text-light text-sm'>On-chain Identity</div>
            </div>
          </div>
          <div className='md:flex-1 bg-base-100 flex items-center justify-center'>
            <div
              className={`w-12 h-12 p-2 rounded-full border border-dark flex items-center justify-center ${getCircleColor(3)}`}
            >
              <div className='text-white text-xl font-semibold'>3</div>
            </div>
            <div className='ml-4 flex flex-col'>
              <div className='text-light text-xl font-semibold'>{type == "Hirer" ? "Customize" :"View"}</div>
              <div className='text-light text-sm'>Profile</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OnboardingSteps;
