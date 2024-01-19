import { CreateHirerProfileProps } from '../types';
import { useMutation, useQueryClient } from 'react-query';

export function useCreateHirerProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation<
    { message: string; id: string; error?: string },
    Error,
    CreateHirerProfileProps
  >(
    createHirerProfile =>
      fetch('/api/domain/create-hirer-profile', {
        method: 'POST',
        body: JSON.stringify(createHirerProfile),
        headers: {
          'Content-type': 'application/json',
        },
      }).then(res => {
        return res.json();
      }),

    {
      onSuccess: () => {
        queryClient.invalidateQueries('createHirerProfile');
      },
    },
  );
}
