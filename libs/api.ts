// api.ts
import { useAuthStore } from './store/use-auth.store';

const baseUrl = '';

export async function api(url: string, options: RequestInit = {}) {
  const { accessToken, refreshToken } = useAuthStore.getState().tokens;

  const fetchRequest: { url: string } & { options: RequestInit } = {
    url: url.startsWith('http') ? url : baseUrl.concat(url),
    options: {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
      ...options,
    },
  };

  const response = await fetch(fetchRequest.url, fetchRequest.options);

  // If unauthorized, try refresh
  if (response.status === 401) {
    const newAccessToken = '';

    if (!newAccessToken) {
      throw new Error('Unable to refresh token');
    }

    // Retry original request with new token
    const retryHeaders = {
      ...(options.headers || {}),
      Authorization: `Bearer ${newAccessToken}`,
    };

    return fetch(url, { ...options, headers: retryHeaders });
  }

  return response;
}
