import { useMutation } from 'react-query';
import { RemoveBuilderPlaceCollaborator } from '../types';

export function useRemoveBuilderPlaceOwnerMutation() {
  //TODO ne pas autoriser de remove l'address du owner du TLID.

  return useMutation<
    { message: string; id: string; error?: string },
    Error,
    RemoveBuilderPlaceCollaborator
  >((addBuilderPlaceOwner: RemoveBuilderPlaceCollaborator) =>
    fetch('/api/domain/remove-builder-place-collaborator', {
      method: 'PUT',
      body: JSON.stringify(addBuilderPlaceOwner),
      headers: {
        'Content-type': 'application/json',
      },
    }).then(res => {
      return res.json();
    }),
  );
}
