import { useMutation } from 'react-query';
import { UpdateBuilderPlace } from '../types';
import { showMongoErrorTransactionToast } from '../../../utils/toast';

export function useUpdateBuilderPlace() {
  const updateBuilderPlaceDomainMutation = useMutation<
    { message: string; id: string; error?: string },
    Error,
    UpdateBuilderPlace
  >(
    (updateBuilderPlaceData: UpdateBuilderPlace) =>
      fetch('/api/domain/update-builder-place', {
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
      // onSuccess: (e) => {
      //   queryClient.invalidateQueries([`builder-place-${data.subdomain}`]);
      // },
    },
  );

  return updateBuilderPlaceDomainMutation;
}
