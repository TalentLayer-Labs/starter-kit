import { CreateBuilderPlaceProps } from '../types';
import { useMutation, useQueryClient } from 'react-query';

export function useCreateBuilderPlaceMutation() {
  const queryClient = useQueryClient();

  return useMutation<
    { message: string; id: string; error?: string },
    Error,
    CreateBuilderPlaceProps
  >(
    createBuilderPlace =>
      fetch('/api/domain/create-builder-place', {
        method: 'POST',
        body: JSON.stringify(createBuilderPlace),
        headers: {
          'Content-type': 'application/json',
        },
      }).then(res => {
        return res.json();
      }),

    {
      onSuccess: () => {
        queryClient.invalidateQueries('createBuilderPlaces');
      },
    },
  );
}
