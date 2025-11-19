import { Middleware, MiddlewareCallbackParams } from 'openapi-fetch';

import { useApiStore } from '../store/use-api.store';

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
  },
};
