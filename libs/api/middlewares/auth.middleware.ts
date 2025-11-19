import { Middleware, MiddlewareCallbackParams } from 'openapi-fetch';

import { useAuthStore } from '@/features/auth/store';
import { ACCESS_TOKEN } from '@/shared/constants/common';

import { useApiStore } from '../store/use-api.store';

export const AuthMiddleWare: Middleware = {
  onRequest(options: MiddlewareCallbackParams): Request {
    const { request, params } = options;
    const accessToken = useAuthStore.getState().tokens[ACCESS_TOKEN];

    if (accessToken) {
      request.headers.set('Authorization', `Bearer ${accessToken}`);
    }

    // Add a retry counter per request
    if (!request.headers.has('x-retry-count')) {
      request.headers.set('x-retry-count', '0');
    }

    useApiStore.getState().setContext({ request, params });

    return request;
  },

  onError(options: MiddlewareCallbackParams & { error: unknown }): Response {
    const { error, request, params } = options;

    console.log(error);

    useApiStore.getState().setContext({ request, params });

    return new Response(
      JSON.stringify({
        error: 'INTERNAL_ERROR',
        message: 'An unexpected error occurred',
      }),
      { status: 500, statusText: 'Internal Error' },
    );
  },

  async onResponse(options: MiddlewareCallbackParams & { response: Response }) {
    const {
      request,
      response,
      params,
      options: { fetch },
    } = options;

    let retry: Response;
    const { status, ok } = response;
    const { refreshAccessToken, clearTokens } = useAuthStore.getState();

    if (!ok) {
      if (status === 401) {
        const accessToken = await refreshAccessToken()
          .then((data) => data)
          .catch((err) => false);

        if (!accessToken) {
          clearTokens();

          return response;
        }

        retry = await fetch(new Request(request));

        if (retry.ok) {
          console.log('omo');
          return retry;
        }

        if (retry.status === 401) {
          clearTokens();

          return retry;
        }

        Promise.reject(retry);
      }
    }

    useApiStore.getState().setContext({ request, params, response });

    return response;
  },
};
