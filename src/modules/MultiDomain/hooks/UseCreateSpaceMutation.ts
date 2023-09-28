import { DomainVerificationStatusProps, DomainResponse, CreateSpaceProps } from '../types';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export function useCreateSpaceMutation() {
  const queryClient = useQueryClient();

  return useMutation(
    (createSpace): Promise<CreateSpaceProps> =>
      fetch('/api/domain/create-space', {
        method: 'POST',
        body: JSON.stringify(createSpace),
        headers: {
          'Content-type': 'application/json',
        },
      }).then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error('Failed to create space');
        }
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('createSpaces');
      },
    }
  );
}