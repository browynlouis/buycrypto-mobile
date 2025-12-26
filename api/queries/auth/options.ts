import { $queryClient } from '@/api/clients/query-client';
import { QueryClientOptions } from '@/api/types';

import { authKeys } from './keys';

export const getAuthQueryOptions = (options: QueryClientOptions<'get', '/auth'> = {}) => {
  const { fetchOptions, queryClientOptions } = options;

  return $queryClient.queryOptions(...authKeys.auth, fetchOptions, queryClientOptions);
};
