import { useContext, useState } from 'react';
import StarterKitContext from '../context/starterKit';
import { IUser } from '../types';
import Loading from './Loading';
import ReactStoreIndicator from 'react-score-indicator';
import { useRouter } from 'next/navigation';

function UserHuskyScore({ user, score }: { user: IUser; score: number }) {
  const { user: currentUser } = useContext(StarterKitContext);
  const [isHovered, setIsHovered] = useState(false);
  const { push } = useRouter();

  if (!user?.id) {
    return <Loading />;
  }

  return (
    <div
      className={'w-3/12 cursor-pointer'}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      onClick={() => {
        push('/dashboard/profile/edit');
      }}>
      {/*<UserTrustScore user={user} />*/}
      <ReactStoreIndicator value={score} maxValue={10} width={100} />
      <div className={`circle-text-color-anim score-text text-center`}>
        {currentUser?.id === user.id ? (
          <>{isHovered ? 'Improve it 🚀' : 'Husky Score'}</>
        ) : (
          <>TrustyScore</>
        )}
      </div>
    </div>
  );
}

export default UserHuskyScore;
