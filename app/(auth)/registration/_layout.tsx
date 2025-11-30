import { Stack } from 'expo-router';

import { RegistrationFormProvider } from '@/components/features/auth/screens/registration/form-provider/registration-form-provider';
import { useAppTheme } from '@/components/shared/providers/theme-provider/hooks';

export default function Layout() {
  const theme = useAppTheme();

  return (
    // Registration Form Context -- for steps

    <RegistrationFormProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          presentation: 'modal',
          contentStyle: {
            backgroundColor: theme.colors.Neutral[900],
          },
        }}
      />
    </RegistrationFormProvider>
  );
}
