import { CreateBuilderPlaceProps } from '../types';
import { useMutation, useQueryClient } from 'react-query';
import { showMongoErrorTransactionToast } from '../../../utils/toast';

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
        if (res.status === 200) {
          return res.json();
        } else {
          res
            .json()
            .then((data: any) => {
              showMongoErrorTransactionToast(data.error);
            })
            .catch(err => {
              throw new Error('Failed to create builderPlace', err);
            });
        }
      }),

    {
      onError: error => {
        throw new Error('Failed to create builderPlace', error);
      },
      onSuccess: () => {
        queryClient.invalidateQueries('createBuilderPlaces');
      },
    },
  );
}
