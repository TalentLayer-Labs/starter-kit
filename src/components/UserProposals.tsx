import { useProposals } from '@talentlayer/react/dist';
import { IUser } from '../types';
import UserProposalItem from './UserProposalItem';

interface IProps {
  user: IUser;
}

function UserProposals({ user }: IProps) {
  const [proposals] = useProposals({ userId: user.id });

  if (!proposals || proposals.length === 0) {
    return null;
  }

  return (
    <>
      <h2 className='mb-6 pb-4 border-b border-gray-gray-200 text-gray-100 font-medium break-all'>
        Your pending Proposals
      </h2>
      <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4'>
        {proposals.map((proposal, i) => {
          return <UserProposalItem proposal={proposal} key={i} />;
        })}
      </div>
    </>
  );
}

export default UserProposals;
