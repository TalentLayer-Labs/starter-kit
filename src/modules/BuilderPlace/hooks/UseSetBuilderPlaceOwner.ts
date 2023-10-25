import { useMutation, useQueryClient } from 'react-query';
import { SetBuilderPlaceOwner } from '../types';

export function useSetBuilderPlaceOwner() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, SetBuilderPlaceOwner>(
    (updateBuilderPlaceData: SetBuilderPlaceOwner) =>
      fetch('/api/domain/set-builder-place-owner', {
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
}
