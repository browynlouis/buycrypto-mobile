import { $queryClient } from '@/api/clients/query-client';
import { QueryClientOptions } from '@/api/types';

import { blockchainKeys } from './keys';

export const getTokensDataQueryOptions = (
  options: QueryClientOptions<'get', '/blockchain/tokens'> = {},
) => {
  const { fetchOptions, queryClientOptions } = options;

  return $queryClient.queryOptions(...blockchainKeys.tokens, fetchOptions, queryClientOptions);
};

export const getTokenDataQueryOptions = (
  options: QueryClientOptions<'get', '/blockchain/tokens/{token}'>,
) => {
  const { fetchOptions, queryClientOptions } = options;

  if (!fetchOptions?.params.path.token) {
    throw new Error('Token symbol required ');
  }

  return $queryClient.queryOptions(
    ...blockchainKeys.token(fetchOptions?.params.path.token),
    fetchOptions,
    queryClientOptions,
  );
};
