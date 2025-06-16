import { useQuery } from '@tanstack/react-query';

import { fetchJobById } from '@/lib/api';

export function useJobById(id: string) {
  return useQuery({
    queryKey: ['job', id],
    queryFn: () => fetchJobById(id),
    enabled: !!id,
  });
}
