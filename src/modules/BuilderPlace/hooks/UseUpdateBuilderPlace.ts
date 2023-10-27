import { useMutation, useQueryClient } from 'react-query';
import { UpdateBuilderPlace } from '../types';

export function useUpdateBuilderPlace() {
  const queryClient = useQueryClient();

  const updateBuilderPlaceDomainMutation = useMutation<void, Error, UpdateBuilderPlace>(
    (updateBuilderPlaceData: UpdateBuilderPlace) =>
      fetch('/api/domain/update-builder-place', {
        method: 'PUT',
        body: JSON.stringify(updateBuilderPlaceData),
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
      // onSuccess: (e) => {
      //   queryClient.invalidateQueries([`builder-place-${data.subdomain}`]);
      // },
    },
  );

  return updateBuilderPlaceDomainMutation;
}
