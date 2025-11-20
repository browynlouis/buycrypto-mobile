import createFetchClient from 'openapi-fetch';
import createClient from 'openapi-react-query';

import { AuthMiddleWare } from './middlewares/auth.middleware';
import { StoreMiddleWare } from './middlewares/store.middleware';
import type { paths } from './schema';

const $fetchApi = createFetchClient<paths>({
  baseUrl: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

$fetchApi.use(AuthMiddleWare);

$fetchApi.use(StoreMiddleWare); // this ought to be the last middleware in the middleware stack

const $api = createClient<paths>($fetchApi);

export { $api, $fetchApi };
