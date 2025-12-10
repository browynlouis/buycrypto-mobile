import { $queryClient } from '@/api/clients/query-client';
import { QueryClientOptions } from '@/api/types';

import { authKeys } from './keys';

export const getAuthQueryOptions = (options?: QueryClientOptions) => {
  return $queryClient.queryOptions(...authKeys.auth, undefined, options);
};
