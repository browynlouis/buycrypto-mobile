import asyncStore from '@react-native-async-storage/async-storage';
import * as secureStore from 'expo-secure-store';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/shared/constants/common';

import { AuthResource } from '../types';

interface AuthState {
  tokens: {
    [ACCESS_TOKEN]: string | null;
    [REFRESH_TOKEN]: string | null;
  };
  auth: AuthResource | null;
  isAuth: boolean;
  clearTokens: () => void;
  setAuth: (auth: AuthResource | null) => void;
  refreshAccessToken: () => Promise<string | null>;
  setTokens: (access: string | null, refresh: string | null) => void;
}

const initialState = {
  auth: null,
  isAuth: false,
  tokens: {
    [ACCESS_TOKEN]: null,
    [REFRESH_TOKEN]: null,
  },
};

const SECURE_KEYS = [ACCESS_TOKEN, REFRESH_TOKEN]; // Keys that are expected to be persisted securely

let _refreshPromise: Promise<string | null> | null = null;

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setTokens: (access, refresh) =>
        set((state) => ({
          ...state,
          tokens: { [ACCESS_TOKEN]: access, [REFRESH_TOKEN]: refresh },
        })),

      clearTokens: () => {
        _refreshPromise = null;

        set(initialState);
      },

      setAuth: (auth) =>
        set((state) => ({
          ...state,
          isAuth: !!auth,
          auth,
        })),

      /**
       * Refreshes access token if refresh token is present
       *
       */
      refreshAccessToken: async () => {
        const { tokens, setTokens, clearTokens } = get();

        // If o refresh token, return null
        if (!tokens[REFRESH_TOKEN]) return null;
        const baseUrl = process.env.EXPO_PUBLIC_API_URL;

        try {
          const res = await fetch(`${baseUrl}/auth/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken: tokens[REFRESH_TOKEN] }),
          });

          // If request fails, return null
          if (!res.ok) return null;

          const data = await res.json();

          //  Set tokens with newly returned acessToken and old refreshToken
          setTokens(data.accessToken, tokens[REFRESH_TOKEN]);

          return data.accessToken;
        } catch (err) {
          clearTokens();

          return null;
        } finally {
          _refreshPromise = null;
        }

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
