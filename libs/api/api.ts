import createFetchClient from 'openapi-fetch';
import createClient from 'openapi-react-query';

import { AuthMiddleWare } from './middlewares/auth-middleware';
import type { paths } from './schema';

export const $fetchApi = createFetchClient<paths>({
  baseUrl: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

$fetchApi.use(AuthMiddleWare);

export const $api = createClient($fetchApi);
