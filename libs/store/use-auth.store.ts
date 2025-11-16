import asyncStore from '@react-native-async-storage/async-storage';
import * as secureStore from 'expo-secure-store';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/common';

interface AuthState {
  tokens: {
    [ACCESS_TOKEN]: string | null;
    [REFRESH_TOKEN]: string | null;
  };
  clearTokens: () => void;
  refreshAccessToken: () => Promise<string | null>;
  setTokens: (access: string | null, refresh: string | null) => void;
}

const initialState = {
  tokens: {
    [ACCESS_TOKEN]: null,
    [REFRESH_TOKEN]: null,
  },
};

const SECURE_KEYS = [ACCESS_TOKEN, REFRESH_TOKEN];
let _refreshPromise: Promise<string | null> | null = null;

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setTokens: (access, refresh) =>
        set({
          tokens: { [ACCESS_TOKEN]: access, [REFRESH_TOKEN]: refresh },
        }),

      clearTokens: () => {
        _refreshPromise = null;

        set(initialState);
      },

      refreshAccessToken: async () => {
        const { tokens, setTokens, clearTokens } = get();

        if (!tokens[REFRESH_TOKEN]) return null;

        if (_refreshPromise) return _refreshPromise;

        _refreshPromise = (async () => {
          const baseUrl = process.env.EXPO_PUBLIC_API_URL;

          try {
            const res = await fetch(`${baseUrl}/auth/refresh`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ refreshToken: tokens[REFRESH_TOKEN] }),
            });

            if (!res.ok) throw new Error('Refresh failed');

            const data = await res.json();
            setTokens(data.accessToken, data.refreshToken);

            return data.accessToken;
          } catch (err) {
            clearTokens();

            return null;
          } finally {
            _refreshPromise = null;
          }
        })();

        return _refreshPromise;
      },
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => ({
        async getItem(key: string) {
          if (SECURE_KEYS.includes(key)) return await secureStore.getItemAsync(key);

          return await asyncStore.getItem(key);
        },
        async setItem(key: string, value: string) {
          if (SECURE_KEYS.includes(key)) return await secureStore.setItemAsync(key, value);

          return await asyncStore.setItem(key, value);
        },
        async removeItem(key: string) {
          if (SECURE_KEYS.includes(key)) return await secureStore.deleteItemAsync(key);

          return await asyncStore.removeItem(key);
        },
      })),
    },
  ),
);
