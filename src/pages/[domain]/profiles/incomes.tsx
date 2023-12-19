import { useContext } from 'react';
import Loading from '../../../components/Loading';
import UserIncomes from '../../../components/UserIncomes';
import TalentLayerContext from '../../../context/talentLayer';

import { GetServerSidePropsContext } from 'next';
import { sharedGetServerSideProps } from '../../../utils/sharedGetServerSideProps';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return sharedGetServerSideProps(context);
}

function Incomes() {
  const { user } = useContext(TalentLayerContext);

  if (!user) {
    return <Loading />;
  }

  return (
    <div className='max-w-7xl mx-auto text-base-content'>
      <div className='-mx-6 -mt-6 sm:mx-0 sm:mt-0'>
        <p className='flex py-2 items-center text-2xl font-bold tracking-wider mb-6 w-full px-6 sm:px-0 mt-6 '>
          your incomes: <span className='text-base-content ml-1'> {user?.handle} </span>
        </p>
      </div>
      <div>
        <div className='mb-6'>{user?.id && <UserIncomes id={user.id} />}</div>
      </div>
    </div>
  );
}

export default Incomes;
