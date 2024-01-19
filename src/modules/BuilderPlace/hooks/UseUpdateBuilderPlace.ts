import { useMutation } from 'react-query';
import { UpdateBuilderPlace } from '../types';

export function useUpdateBuilderPlace() {
  const updateBuilderPlaceDomainMutation = useMutation<
    { message: string; id: string; error?: string },
    Error,
    UpdateBuilderPlace
  >(
    (updateBuilderPlaceData: UpdateBuilderPlace) =>
      fetch('/api/domain/update-builder-place', {
        method: 'PUT',
        body: JSON.stringify(updateBuilderPlaceData),
        headers: {
          'Content-type': 'application/json',
        },
      }).then(res => {
        return res.json();
      }),
    {
      // onSuccess: (e) => {
      //   queryClient.invalidateQueries([`builder-place-${data.subdomain}`]);
      // },
    },
  );

  return updateBuilderPlaceDomainMutation;
}
