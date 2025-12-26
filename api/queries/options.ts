import { $queryClient } from '../clients/query-client';
import { QueryClientOptions } from '../types';
import { queryKeys } from './keys';

export const getFiatsQueryOptions = (
  options: QueryClientOptions<'get', '/app/metadata/supported-fiats'> = {},
) => {
  const { fetchOptions, queryClientOptions } = options;

  return $queryClient.queryOptions(...queryKeys.fiats, fetchOptions, queryClientOptions);
};

export const getTokensQueryOptions = (
  options: QueryClientOptions<'get', '/app/metadata/supported-tokens'> = {},
) => {
  const { fetchOptions, queryClientOptions } = options;

  return $queryClient.queryOptions(...queryKeys.tokens, fetchOptions, queryClientOptions);
};

export const getWalletsTypeQueryOptions = (
  options: QueryClientOptions<'get', '/app/metadata/wallet-types'> = {},
) => {
  const { fetchOptions, queryClientOptions } = options;

  return $queryClient.queryOptions(...queryKeys.walletTypes, fetchOptions, queryClientOptions);
};
