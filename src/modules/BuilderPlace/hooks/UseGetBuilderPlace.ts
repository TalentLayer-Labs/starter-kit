import { useQuery } from 'react-query';
import { IBuilderPlace } from '../types';

export function useGetBuilderPlace({ domain }: { domain: string }) {
  const { data, isLoading } = useQuery<IBuilderPlace>(`builder-place-${domain}`, () =>
    fetch(`/api/domain/${domain}/get-builder-place`).then(res => res.json()),
  );

  return {
    data: data,
    loading: isLoading,
  };
}
