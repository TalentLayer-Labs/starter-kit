import { useRouter } from "next/router";
import { useContext } from "react";
import TalentLayerContext from "../context/talentLayer";
import OnboardingSteps from "./OnboardingSteps";

function WorkerOnboardSuccess() {
    const { user } = useContext(TalentLayerContext);
    const router = useRouter();
    const viewFullProfile = () => {
      router.push(`/profiles/${user?.id}`);
    };
    return (
      <>
        <div className='bg-white'>
        <OnboardingSteps currentStep={3} />
          <div className='max-w-7xl mx-auto text-stone-800 sm:px-4 lg:px-0 py-20'>
            <div className='flex flex-col items-center justify-center gap-10'>
              <p className='text-5xl sm:text-7xl font-medium tracking-wider max-w-5xl text-center'>Done!</p>
              <p className='text-3xl sm:text-5xl font-medium tracking-wider max-w-5xl text-center'>
                Looking good! Now, time to work.
              </p>
              <p className='text-xl sm:text-2xl text-stone-400 text-center'>
                Your profile looks great - you are all set to apply for opportunities.
              </p>
              <div className='flex flex-col items-center gap-8'>
                <div className='w-48 h-48 rounded-full overflow-hidden'>
                  <img
                    src={user?.description?.image_url}
                    alt='Profile Photo'
                    className='object-cover w-full h-full'
                  />
                </div>
                <p className='text-2xl text-stone-400'>{user?.description?.name}</p>
                <p className='text-xl text-stone-400'>{user?.description?.title}</p>
                <p className='text-xl text-stone-400 text-center max-w-lg'>{user?.description?.about}</p>
                <button
                className='bg-redpraha text-black rounded-lg px-4 py-2 mt-4 text-lg font-medium'
                onClick={viewFullProfile}
                >
                View My Full Profile
              </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  export default WorkerOnboardSuccess;
  