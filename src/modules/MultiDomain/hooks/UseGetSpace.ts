import { useQuery } from 'react-query';
import { Space } from '../types';

export function useGetSpace({ domain }: { domain: string }) {
  const { data, isLoading } = useQuery<Space>(`space-${domain}`, () =>
    fetch(`/api/domain/${domain}/get-space`).then(res => res.json()),
  );

  return {
    space: data,
    loading: isLoading,
  };
}
