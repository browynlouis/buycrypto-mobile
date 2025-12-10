import createFetchClient from 'openapi-fetch';

import { appConfig } from '@/libs/config';

import { paths } from '../generated/schema';
import { AuthMiddleWare } from './middlewares/auth.middleware';

/**
 * $fetchClient
 *
 * API client created using `openapi-fetch`.
 *
 * - Configured with the application's base URL and default JSON headers.
 *
 * Example usage:
 * ```ts
 * const response = await $fetchClient.get('/auth/me');
 * ```
 */
const $fetchClient = createFetchClient<paths>({
  baseUrl: appConfig.APP_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

$fetchClient.use(AuthMiddleWare);

export { $fetchClient };
