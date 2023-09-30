import { DomainVerificationStatusProps, DomainResponse, Space } from '../types';
import { useQuery } from 'react-query';

export function useGetSpace({ domain }: { domain: string }) {
  const { data, isLoading } = useQuery<{ space: Space }>(`space-${domain}`, () =>
    fetch(`/api/domain/${domain}/get-space`).then(res =>
      res.json()
    ), { refetchInterval: 5000, keepPreviousData: true }
  );

  return {
    space: data,
    loading: isLoading,
  };
}
