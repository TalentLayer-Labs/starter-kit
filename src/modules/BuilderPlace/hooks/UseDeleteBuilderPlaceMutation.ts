import { useMutation, useQueryClient } from 'react-query';
import { DeleteBuilderPlace } from '../types';

export function useDeleteBuilderPlaceMutation() {
  const queryClient = useQueryClient();

  return useMutation(
    (deleteBuilderPlace: DeleteBuilderPlace): Promise<any> =>
      fetch(`/api/domain/create-builder-place/?subDomain=${deleteBuilderPlace.subdomain}`, {
        body: JSON.stringify(deleteBuilderPlace),
        method: 'DELETE',
      }).then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error('Failed to delete builderPlace');
        }
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('createBuilderPlaces');
      },
    },
  );
}
