import { useMutation, useQueryClient } from 'react-query';

export function useUpdateSpaceDomain() {
  const queryClient = useQueryClient();

  const updateSpaceDomainMutation = useMutation<void, Error, UpdateSpaceDomain>(
    (updateSpaceDomainData) =>
      fetch('/api/domain/update-domain', {
        method: 'PUT',
        body: JSON.stringify(updateSpaceDomainData),
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