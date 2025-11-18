import { ActivityIndicator } from 'react-native';

import { useTheme } from '@/libs/hooks';

export function Spinner() {
  const theme = useTheme();

  return <ActivityIndicator color={theme.colors.Neutral[900]} />;
}
