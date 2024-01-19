import { useMutation, useQueryClient } from 'react-query';
import { UpdateUserEmail } from '../types';

export function useUpdateEmailMutation() {
  const queryClient = useQueryClient();

  return useMutation<{ message: string; id: string; error?: string }, Error, UpdateUserEmail>(
    updateEmail =>
      fetch('/api/domain/update-user-email', {
        method: 'PUT',
        body: JSON.stringify(updateEmail),
        headers: {
          'Content-type': 'application/json',
        },
      }).then(res => {
        return res.json();
      }),
    {
      onError: error => {
        throw new Error('Failed to update email', error);
      },
      onSuccess: () => {
        queryClient.invalidateQueries('updateEmail');
      },
    },
  );
}
