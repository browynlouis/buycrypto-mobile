import React from 'react';

import { useAuthStore } from '@/features/auth/store';
import { SettingsScreen } from '@/features/user/screens/user-center/settings/settings.screen';
import { useAppStore } from '@/libs/store';
import { Header } from '@/shared/components/header';
import { Page } from '@/shared/components/layouts/page';
import { Button } from '@/shared/components/ui/button';
import { Icon } from '@/shared/components/ui/icon';

export default function Settings() {
  const { clearTokens } = useAuthStore();
  const { setThemeAppearance, resolvedTheme, toggleThemeAppearance } = useAppStore();

  return (
    <>
      {/* Page Header */}
      <Header
        title="User Center"
        showBackButton
        rightElement={
          // Theme switch button
          <Button
            variant="text"
            onPress={() => {
              toggleThemeAppearance();
              setThemeAppearance(resolvedTheme === 'dark' ? 'light' : 'dark');
            }}
          >
            <Icon name={resolvedTheme === 'light' ? 'Moon' : 'Sun1'} size="lg" />
          </Button>
        }
      />

      {/* Page Body */}
      <Page>
        {/* Main Content */}
        <SettingsScreen />

        {/* Logout Button -- Just clears token client side for now */}
        <Button variant="plain" size="md" style={{ marginTop: 'auto' }} onPress={clearTokens}>
          Logout
        </Button>
      </Page>
    </>
  );
}
