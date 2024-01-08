import { CreateWorkerProfileProps } from '../types';
import { useMutation, useQueryClient } from 'react-query';

export function useCreateWorkerProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation<
    { message: string; id: string; error?: string },
    Error,
    CreateWorkerProfileProps
  >(
    createWorkerProfile =>
      fetch('/api/domain/create-worker-profile', {
        method: 'POST',
        body: JSON.stringify(createWorkerProfile),
        headers: {
          'Content-type': 'application/json',
        },
      }).then(res => {
        return res.json();
      }),

    {
      onError: error => {
        throw new Error('Failed to create worker profile', error);
      },
      onSuccess: () => {
        queryClient.invalidateQueries('createWorkerProfile');
      },
    },
  );
}
