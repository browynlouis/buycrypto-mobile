import asyncStore from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

/**
 * ThemeAppearance
 *
 * Represents the possible theme modes in the app.
 * - 'light' : Light theme
 * - 'dark'  : Dark theme
 * - 'system': Follow device system preference
 */
export type ThemeAppearance = 'light' | 'dark' | 'system';

/**
 * AppStore
 *
 * Defines the shape of the Zustand store for app-wide state.
 */
interface AppStore {
  /** Current theme preference (user-selected) */
  themeAppearance: ThemeAppearance;

  /** Actual resolved theme taking system preference into account */
  resolvedTheme: 'light' | 'dark';

  /** Set theme preference */
  setThemeAppearance: (mode: ThemeAppearance) => void;

  /** Toggle between light and dark themes */
  toggleThemeAppearance: () => void;
}

/**
 * useAppStore
 *
 * Zustand store managing app theme.
 *
 * Features:
 * - Persists user preference in AsyncStorage (`app-store` key)
 * - Computes resolved theme based on system preference if 'system' mode is selected
 * - Provides setter and toggle methods for theme changes
 *
 * Example usage:
 * ```ts
 * const { resolvedTheme, toggleThemeAppearance } = useAppStore();
 * console.log(resolvedTheme); // 'light' or 'dark'
 * toggleThemeAppearance();    // switch between light/dark
 * ```
 */
export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      themeAppearance: 'system',
      resolvedTheme: Appearance.getColorScheme() === 'dark' ? 'dark' : 'light',

      setThemeAppearance: (mode) =>
        set({
          themeAppearance: mode,
          resolvedTheme:
            mode === 'system' ? (Appearance.getColorScheme() === 'dark' ? 'dark' : 'light') : mode,
        }),

      toggleThemeAppearance: () => {
        const current = get().themeAppearance;
        const next = current === 'light' ? 'dark' : 'light';

        set({
          themeAppearance: next,
          resolvedTheme: next,
        });
      },
    }),
    {
      name: 'app-store', // key in AsyncStorage
      storage: createJSONStorage(() => asyncStore), // use async storage
    },
  ),
);
