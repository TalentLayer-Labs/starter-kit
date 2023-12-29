import { useMutation } from 'react-query';
import { SetWorkerProfileOwner } from '../types';

export function useSetWorkerProfileOwner() {
  return useMutation<{ message: string; id: string; error?: string }, Error, SetWorkerProfileOwner>(
    (updateWorkerProfileData: SetWorkerProfileOwner) =>
      fetch('/api/domain/set-worker-profile-owner', {
        method: 'PUT',
        body: JSON.stringify(updateWorkerProfileData),
        headers: {
          'Content-type': 'application/json',
        },
      }).then(res => {
        return res.json();
      }),
  );
}
