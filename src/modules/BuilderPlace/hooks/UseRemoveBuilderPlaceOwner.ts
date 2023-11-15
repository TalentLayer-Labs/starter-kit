import { useMutation, useQueryClient } from 'react-query';
import { AddBuilderPlaceOwner, SetBuilderPlaceOwner } from '../types';
import { showMongoErrorTransactionToast } from '../../../utils/toast';

export function useRemoveBuilderPlaceOwnerMutation() {
  const queryClient = useQueryClient();
  //TODO ne pas autoriser de remove l'address du owner du TLID.

  return useMutation<{ message: string; id: string; error?: string }, Error, AddBuilderPlaceOwner>(
    (addBuilderPlaceOwner: AddBuilderPlaceOwner) =>
      fetch('/api/domain/add-builder-place-owner', {
        method: 'PUT',
        body: JSON.stringify(addBuilderPlaceOwner),
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
              throw new Error('Failed to add owner', err.fileName);
            });
        }
      }),
    {
      onError: error => {
        throw new Error('Failed to add owner', error);
      },
    },
  );
}
