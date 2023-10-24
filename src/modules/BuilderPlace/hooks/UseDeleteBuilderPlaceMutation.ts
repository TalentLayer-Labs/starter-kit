import { useMutation, useQueryClient } from 'react-query';
import { CreateBuilderPlaceProps } from '../types';

export function useDeleteBuilderPlaceMutation() {
  const queryClient = useQueryClient();

  return useMutation(
    (subDomain: string): Promise<any> =>
      fetch(`/api/domain/create-builder-place/?subDomain=${subDomain}`, {
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
