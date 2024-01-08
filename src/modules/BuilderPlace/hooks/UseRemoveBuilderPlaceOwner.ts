import { useMutation } from 'react-query';
import { RemoveBuilderPlaceCollaborator } from '../types';

export function useRemoveBuilderPlaceOwnerMutation() {
  return useMutation<
    { message: string; id: string; error?: string },
    Error,
    RemoveBuilderPlaceCollaborator
  >((removeBuilderPlaceCollaborator: RemoveBuilderPlaceCollaborator) =>
    fetch('/api/domain/remove-builder-place-collaborator', {
      method: 'PUT',
      body: JSON.stringify(removeBuilderPlaceCollaborator),
      headers: {
        'Content-type': 'application/json',
      },
    }).then(res => {
      return res.json();
    }),
  );
}
