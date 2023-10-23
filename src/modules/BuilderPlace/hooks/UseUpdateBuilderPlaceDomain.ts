import { useMutation, useQueryClient } from 'react-query';
import { UpdateBuilderPlaceDomain } from '../types';

export function useUpdateBuilderPlaceDomain() {
  const queryClient = useQueryClient();

  const updateBuilderPlaceDomainMutation = useMutation<void, Error, UpdateBuilderPlaceDomain>(
    updateBuilderPlaceDomainData =>
      fetch('/api/domain/update-domain', {
        method: 'PUT',
        body: JSON.stringify(updateBuilderPlaceDomainData),
        headers: {
          'Content-type': 'application/json',
        },
      }).then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error('Failed to update builderPlace domain');
        }
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('builderPlaces');
      },
    },
  );

  return updateBuilderPlaceDomainMutation;
}
