import { $queryClient } from '@/api/clients/query-client';
import { QueryClientOptions } from '@/api/types';

import { userKeys } from './keys';

export const getMeQueryOptions = (options: QueryClientOptions<'get', '/users/me'> = {}) => {
  const { fetchOptions, queryClientOptions } = options;

  return $queryClient.queryOptions(...userKeys.me, fetchOptions, queryClientOptions);
};

export const getUserWalleAddresQueryOptions = (
  options: QueryClientOptions<'get', '/users/me/wallet-address/{network}'> = {},
) => {
  const { fetchOptions, queryClientOptions } = options;

  if (!fetchOptions?.params.path.network) {
    throw new Error('Missing param: network to fetch user wallet address');
  }

  return $queryClient.queryOptions(...userKeys.userWalletAddress, fetchOptions, queryClientOptions);
};
