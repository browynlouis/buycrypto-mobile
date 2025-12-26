import { $queryClient } from '@/api/clients/query-client';
import { QueryClientOptions } from '@/api/types';

import { kycKeys } from './keys';

export const getKycInfoQueryOptions = (options: QueryClientOptions<'get', '/kyc/status'> = {}) => {
  const { fetchOptions, queryClientOptions } = options;

  return $queryClient.queryOptions(...kycKeys.info, fetchOptions, queryClientOptions);
};
