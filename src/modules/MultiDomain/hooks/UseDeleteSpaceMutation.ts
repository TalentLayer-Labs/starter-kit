import { useMutation, useQueryClient } from 'react-query';
import { CreateSpaceProps } from '../types';

export function useDeleteSpaceMutation() {
  const queryClient = useQueryClient();

  return useMutation(
    (spaceId: string): Promise<any> =>
      fetch(`/api/domain/delete-space/${spaceId}`, {
        method: 'DELETE',
      }).then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error('Failed to delete space');
        }
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('createSpaces');
      },
    }
  );
}