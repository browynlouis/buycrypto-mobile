import createFetchClient from 'openapi-fetch';
import createClient from 'openapi-react-query';

import { appConfig } from '../config';
import { AuthMiddleWare } from './middlewares';
import type { paths } from './schema';

/**
 * $fetchApi
 *
 * API client created using `openapi-fetch`.
 *
 * - Configured with the application's base URL and default JSON headers.
 *
 * Example usage:
 * ```ts
 * const response = await $fetchApi.get('/auth/me');
 * ```
 */
const $fetchApi = createFetchClient<paths>({
  baseUrl: appConfig.APP_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Apply authentication middleware
$fetchApi.use(AuthMiddleWare);

/**
 * $api
 *
 * API client built on top of `$fetchApi` using `openapi-react-query`.
 *
 * - Provides React Query hooks for each endpoint defined in the OpenAPI schema.
 * - Handles caching, suspense queries, mutations, and automatic refetching.
 *
 * Example usage:
 * ```ts
 * const { data, isLoading } = $api.useQuery('get', '/users/me');
 * ```
 */
const $api = createClient<paths>($fetchApi);

export { $api, $fetchApi };
