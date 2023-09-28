import { useMutation, useQueryClient } from 'react-query';
import { UpdateSpace } from '../types';

export function useUpdateSpace() {
  const queryClient = useQueryClient();

  const updateSpaceDomainMutation = useMutation<void, Error, UpdateSpace>(
    (updateSpaceData) =>
      fetch('/api/domain/update-space', {
        method: 'PUT',
        body: JSON.stringify(updateSpaceData),
        headers: {
          'Content-type': 'application/json',
        },
      }).then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error('Failed to update space domain');
        }
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('spaces');
      },
    }
  );

  return updateSpaceDomainMutation;
}