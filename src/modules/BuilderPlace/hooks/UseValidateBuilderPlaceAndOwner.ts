import { useMutation } from 'react-query';
import { ValidateBuilderPlaceAndOwner } from '../types';

export function useValidateBuilderPlaceAndOwner() {
  return useMutation<{ message: string; error?: string }, Error, ValidateBuilderPlaceAndOwner>(
    (validateBuilderPlaceAndOwnerData: ValidateBuilderPlaceAndOwner) =>
      fetch('/api/domain/validate-builder-place', {
        method: 'PUT',
        body: JSON.stringify(validateBuilderPlaceAndOwnerData),
        headers: {
          'Content-type': 'application/json',
        },
      }).then(res => {
        return res.json();
      }),
    {
      // onSuccess: (e) => {
      //   queryClient.invalidateQueries([`builder-place-${data.subdomain}`]);
      // },
    },
  );
}
