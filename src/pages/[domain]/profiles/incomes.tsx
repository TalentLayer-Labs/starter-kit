import { useContext } from 'react';
import TalentLayerContext from '../../../context/talentLayer';
import Loading from '../../../components/Loading';
import UserIncomes from '../../../components/UserIncomes';
import { getBuilderPlace } from '../../../modules/BuilderPlace/queries';

export async function getServerSideProps({ params }: any) {
  return await getBuilderPlace(params.domain);
}

function Incomes() {
  const { user } = useContext(TalentLayerContext);

  if (!user) {
    return <Loading />;
  }

  return (
    <div className='max-w-7xl mx-auto text-stone-800 sm:px-4 lg:px-0'>
      <div className='-mx-6 -mt-6 sm:mx-0 sm:mt-0'>
        <p className='flex py-2 px-6 sm:px-0 items-center text-2xl font-medium tracking-wider mb-8 border-b w-full border-redpraha md:px-8 '>
          Your incomes: <span className='text-stone-800 ml-1'> {user?.handle} </span>
        </p>
      </div>
      <div>
        <div className='mb-6'>{user?.id && <UserIncomes id={user.id} />}</div>
      </div>
    </div>
  );
}

export default Incomes;
