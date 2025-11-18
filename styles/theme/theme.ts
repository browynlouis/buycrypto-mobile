import { ColorSchemeName } from 'react-native';

import { colors } from '../colors';

export const getTheme = (colorSheme: ColorSchemeName) => {
  return {
    colors: colors[colorSheme ?? 'light'],
    shadows: {
      xs: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
      sm: '0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)',
      md: '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -2px rgba(0, 0, 0, 0.06)',
      lg: '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -4px rgba(0, 0, 0, 0.06)',
      xl: '0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
      inner: 'inset 0px 2px 4px 0px rgba(0, 0, 0, 0.06)',
      outline: '0 0 0 1px #2e2e35ff',
      none: 'none',
    },
    fontSizes: {
      'display-2xl': 48,
      'display-xl': 42,
      'display-lg': 36,
      'display-md': 30,
      'display-sm': 24,
      'display-xs': 20,
      'text-xl': 20,
      'text-lg': 18,
      'text-md': 16,
      'text-sm': 14,
      'text-xs': 12,
    },
  };
};

export type AppTheme = ReturnType<typeof getTheme>;
