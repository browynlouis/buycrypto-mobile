import { Middleware, MiddlewareCallbackParams } from 'openapi-fetch';

import { useAuthStore } from '@/features/auth/store';
import { ACCESS_TOKEN } from '@/shared/constants/common';

/**
 * AuthMiddleWare
 *
 * A middleware for handling authentication and automatic token refresh
 * when using `openapi-fetch`. It automatically attaches the access token
 * to requests, handles 401 Unauthorized errors by attempting to refresh
 * the token, and provides a fallback error response for unexpected errors.
 */
export const AuthMiddleWare: Middleware = {
  /**
   * onRequest
   *
   * Attaches the access token from the auth store to the Authorization header.
   *
   */
  onRequest(options: MiddlewareCallbackParams): Request {
    const { request } = options;

    const accessToken = useAuthStore.getState().tokens[ACCESS_TOKEN];

    if (accessToken) {
      request.headers.set('Authorization', `Bearer ${accessToken}`);
    }

    return request;
  },

  /**
   * onError
   *
   * Handles unexpected errors during the request lifecycle.
   * Returns a standardized 500 Internal Error response.
   *
   * @param options - Middleware callback parameters containing the error object
   * @returns A Response object with JSON error details
   */
  onError(options: MiddlewareCallbackParams & { error: unknown }): Response {
    return new Response(
      JSON.stringify({
        error: 'INTERNAL_ERROR',
        message: 'An unexpected error occurred',
      }),
      { status: 500, statusText: 'Internal Error' },
    );
  },

  /**
   * onResponse
   *
   * Handles responses from the server, including token refresh logic.
   * If a 401 Unauthorized response is received, attempts to refresh the access token
   * and retry the request. If refresh fails or retry still returns 401, clears the tokens.
   *
   * @param options - Middleware callback parameters containing the request, response, and fetch function
   * @returns The original response, or a retried response if refresh succeeds
   */
  async onResponse(options: MiddlewareCallbackParams & { response: Response }) {
    const {
      request,
      response,
      options: { fetch },
    } = options;

    const { status, ok } = response;
    const { refreshAccessToken, clearTokens } = useAuthStore.getState();

    // Only handle failed responses
    if (!ok && status === 401) {
      // Attempt to refresh access token
      const accessToken = await refreshAccessToken().catch(() => false);

      if (!accessToken) {
        // If refresh fails, clear tokens and return original 401
        clearTokens();
        return response;
      }

      // Retry the original request with new token
      const retry = await fetch(new Request(request));

      if (retry.ok) {
        return retry;
      }

      if (retry.status === 401) {
        clearTokens();
        return retry;
      }

      return Promise.reject(retry);
    }

    return response;
  },
};
