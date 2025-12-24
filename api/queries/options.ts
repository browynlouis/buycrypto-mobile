import { $queryClient } from '../clients/query-client';
import { QueryClientOptions } from '../types';
import { queryKeys } from './keys';

export const getFiatsQueryOptions = (options?: QueryClientOptions) => {
  return $queryClient.queryOptions(...queryKeys.fiats, undefined, options);
};

export const getTokensQueryOptions = (options?: QueryClientOptions) => {
  return $queryClient.queryOptions(...queryKeys.tokens, undefined, options);
};

export const getWalletsTypeQueryOptions = (options?: QueryClientOptions) => {
  return $queryClient.queryOptions(...queryKeys.walletTypes, undefined, options);
};
