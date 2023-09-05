import { useRouter } from 'next/router';
import Loading from '../../../components/Loading';
import useUserById from '../../../hooks/useUserById';
import { useContext } from 'react';
import StarterKitContext from '../../../context/starterKit';
import UserNeedsMoreRights from '../../../components/UserNeedsMoreRights';

function AdminFees() {
  const router = useRouter();
  const { id } = router.query;
  const { isAdmin } = useContext(StarterKitContext);
  const user = useUserById(id as string);

  if (!user) {
    return <Loading />;
  }
  if (!isAdmin) {
    return <UserNeedsMoreRights />;
  }

  return <div>Admin access Loaded</div>;
}

export default AdminFees;
