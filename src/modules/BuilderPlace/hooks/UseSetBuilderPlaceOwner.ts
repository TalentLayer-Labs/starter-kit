import { useMutation, useQueryClient } from 'react-query';
import { SetBuilderPlaceOwner } from '../types';
import { showMongoErrorTransactionToast } from '../../../utils/toast';

export function useSetBuilderPlaceOwner() {
  const queryClient = useQueryClient();

  return useMutation<{ message: string; id: string; error?: string }, Error, SetBuilderPlaceOwner>(
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
          res
            .json()
            .then((data: any) => {
              showMongoErrorTransactionToast(data.error);
              return data;
            })
            .catch(err => {
              throw new Error('Failed to update builderPlace', err.fileName);
            });
        }
      }),
    {
      onError: error => {
        throw new Error('Failed to create builderPlace', error);
      },
    },
  );
}
