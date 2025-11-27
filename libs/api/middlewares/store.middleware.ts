import { Middleware, MiddlewareCallbackParams } from 'openapi-fetch';

import { useApiStore } from '../store/use-api.store';

/**
 * Stores the context an api requet-response
 */
export const StoreMiddleWare: Middleware = {
  onRequest(options: MiddlewareCallbackParams) {
    const { request, params } = options;

    useApiStore.getState().setContext({ request, params });
  },

  onError(options: MiddlewareCallbackParams & { error: unknown }) {
    const { request, params } = options;

    useApiStore.getState().setContext({ request, params });
  },

  async onResponse(options: MiddlewareCallbackParams & { response: Response }) {
    const { request, response, params } = options;

    useApiStore.getState().setContext({ request, params, response });

    if (!options.response.ok && options.response.status !== 401) {
      return await Promise.reject(await options.response.json());
    }
  },
};
