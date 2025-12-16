import { $queryClient } from '@/api/clients/query-client';
import { QueryClientOptions } from '@/api/types';

import { kycKeys } from './keys';

export const getKycInfoQueryOptions = (options?: QueryClientOptions) => {
  return $queryClient.queryOptions(...kycKeys.info, undefined, options);
};
