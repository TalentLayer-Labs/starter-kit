import { CreateWorkerProfileProps } from '../types';
import { useMutation, useQueryClient } from 'react-query';
import { showMongoErrorTransactionToast } from '../../../utils/toast';

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
        if (res.status === 200) {
          return res.json();
        } else {
          res
            .json()
            .then((data: any) => {
              showMongoErrorTransactionToast(data.error);
            })
            .catch(err => {
              throw new Error('Failed to create worker profile', err);
            });
        }
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
