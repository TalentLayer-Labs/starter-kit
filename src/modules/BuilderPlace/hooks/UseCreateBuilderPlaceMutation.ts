import {
  DomainVerificationStatusProps,
  DomainResponse,
  CreateBuilderPlaceProps,
  IBuilderPlace,
} from '../types';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export function useCreateBuilderPlaceMutation() {
  const queryClient = useQueryClient();

  return useMutation<IBuilderPlace, Error, CreateBuilderPlaceProps>(
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
          throw new Error('Failed to create builderPlace');
        }
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('createBuilderPlaces');
      },
    },
  );
}
