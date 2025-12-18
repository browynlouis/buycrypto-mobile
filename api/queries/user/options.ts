import { $queryClient } from '@/api/clients/query-client';
import { QueryClientOptions } from '@/api/types';

import { userKeys } from './keys';

export const getMeQueryOptions = (options?: QueryClientOptions) => {
  return $queryClient.queryOptions(...userKeys.me, undefined, options);
};
