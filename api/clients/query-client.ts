import createClient from 'openapi-react-query';

import { paths } from '../generated/schema';
import { $fetchClient } from './fetch-client';

/**
 * $queryClient
 *
 * API client built on top of `$fetchClient` using `openapi-react-query`.
 *
 * - Provides React Query hooks for each endpoint defined in the OpenAPI schema.
 * - Handles caching, suspense queries, mutations, and automatic refetching.
 *
 * Example usage:
 * ```ts
 * const { data, isLoading } = $queryClient.useQuery('get', '/users/me');
 * ```
 */
const $queryClient = createClient<paths>($fetchClient);

export { $queryClient };
