import React from 'react';

import { useAuthStore } from '@/features/auth/store';
import { SettingsScreen } from '@/features/user/screens/user-center/settings';
import { useAppStore } from '@/libs/store';
import { Header } from '@/shared/components/header';
import { Page } from '@/shared/components/layouts/page';
import { Button } from '@/shared/components/ui/button';
import { Icon } from '@/shared/components/ui/icon';

export default function Settings() {
  const { clearTokens } = useAuthStore();
  const { toggleThemeAppearance, resolvedTheme } = useAppStore();

  return (
    <>
      <Header
        title="User Center"
        showBackButton
        rightElement={
          <Button variant="text" onPress={toggleThemeAppearance}>
            <Icon name={resolvedTheme === 'light' ? 'Moon' : 'Sun1'} size="lg" />
          </Button>
        }
      />

      <Page>
        <SettingsScreen />

        <Button variant="plain" style={{ marginTop: 'auto' }} onPress={clearTokens}>
          Logout <Icon name="Logout" />
        </Button>
      </Page>
    </>
  );
}
