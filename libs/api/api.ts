import createFetchClient from 'openapi-fetch';
import createClient from 'openapi-react-query';

import { AuthMiddleWare } from './middlewares/auth.middleware';
import { StoreMiddleWare } from './middlewares/store.middleware';
import type { paths } from './schema';

export const requestInit = {
  baseUrl: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const $fetchApi = createFetchClient<paths>(requestInit);

$fetchApi.use(AuthMiddleWare);
$fetchApi.use(StoreMiddleWare);

export const $api = createClient<paths>($fetchApi);
