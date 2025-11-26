import asyncStore from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type ThemeAppearance = 'light' | 'dark' | 'system';

interface AppStore {
  themeAppearance: ThemeAppearance;
  resolvedTheme: 'light' | 'dark';

  setThemeAppearance: (mode: ThemeAppearance) => void;
  toggleThemeAppearance: () => void;
}

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
      name: 'app-store',
      storage: createJSONStorage(() => asyncStore),
    },
  ),
);
