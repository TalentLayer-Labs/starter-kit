import { useMutation, useQueryClient } from 'react-query';
import { SetBuilderPlaceAndHirerOwner } from '../types';

export function useSetBuilderPlaceAndHirerOwner() {
  const queryClient = useQueryClient();

  return useMutation<
    { message: string; builderPlaceId: string; hirerId: string; error?: string },
    Error,
    SetBuilderPlaceAndHirerOwner
  >(
    (updateBuilderPlaceData: SetBuilderPlaceAndHirerOwner) =>
      fetch('/api/domain/set-builder-place-and-hirer-owner', {
        method: 'PUT',
        body: JSON.stringify(updateBuilderPlaceData),
        headers: {
          'Content-type': 'application/json',
        },
      }).then(res => {
        return res.json();
      }),
    {
      onError: error => {
        throw new Error('Failed to create builderPlace', error);
      },
    },
  );
}
