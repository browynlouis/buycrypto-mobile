import { useTheme } from 'styled-components/native';

import { AppTheme } from '@/styles';

export function useAppTheme(): AppTheme {
  const theme = useTheme();

  return theme;
}
