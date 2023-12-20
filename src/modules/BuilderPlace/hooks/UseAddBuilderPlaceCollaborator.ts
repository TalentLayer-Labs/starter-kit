import { useMutation, useQueryClient } from 'react-query';
import { AddBuilderPlaceCollaborator } from '../types';

export function useAddBuilderPlaceCollaborator() {
  const queryClient = useQueryClient();

  return useMutation<
    { message: string; id: string; error?: string },
    Error,
    AddBuilderPlaceCollaborator
  >((addBuilderPlaceCollaborator: AddBuilderPlaceCollaborator) =>
    fetch('/api/domain/add-builder-place-collaborator', {
      method: 'PUT',
      body: JSON.stringify(addBuilderPlaceCollaborator),
      headers: {
        'Content-type': 'application/json',
      },
    }).then(res => {
      return res.json();
    }),
  );
}
