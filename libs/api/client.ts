import createFetchClient from 'openapi-fetch';
import createClient from 'openapi-react-query';

import { AuthMiddleWare, StoreMiddleWare } from './middlewares';
import type { paths } from './schema';

const $fetchApi = createFetchClient<paths>({
  baseUrl: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

$fetchApi.use(AuthMiddleWare);

$fetchApi.use(StoreMiddleWare); // this ought to be the last middleware in the middleware stack

/** Throws error which fecth wouldn't throw -- neccessary for our react query-client */
$fetchApi.use({
  async onResponse(options) {
    if (!options.response.ok) {
      return await Promise.reject(await options.response.json());
    }
  },
});

const $api = createClient<paths>($fetchApi);

export { $api, $fetchApi };
