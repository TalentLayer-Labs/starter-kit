import { useMutation, useQueryClient } from 'react-query';
import { VerifyEmailProps } from '../types';

export function useVerifyEmailMutation() {
  const queryClient = useQueryClient();

  return useMutation<{ message: string; id: string; error?: string }, Error, VerifyEmailProps>(
    verifyEmail =>
      fetch('/api/domain/verify-email', {
        method: 'PUT',
        body: JSON.stringify(verifyEmail),
        headers: {
          'Content-type': 'application/json',
        },
      }).then(res => {
        return res.json();
      }),
    {
      onError: error => {
        throw new Error('Failed to verify email', error);
      },
      onSuccess: () => {
        queryClient.invalidateQueries('verifyEmail');
      },
    },
  );
}
