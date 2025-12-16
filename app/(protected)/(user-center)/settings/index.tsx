import React from 'react';

import { SettingsScreen } from '@/components/features/user/screens';
import { Page } from '@/components/shared/layouts/page';
import { BottomScreenWrapper } from '@/components/shared/ui/bottom-screen-wrapper';
import { Button } from '@/components/shared/ui/button';
import { Header } from '@/components/shared/ui/header';
import { Icon } from '@/components/shared/ui/icon';
import { useAppStore, useAuthStore } from '@/store';

export default function SettingsPage() {
  const { clear } = useAuthStore();
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

        <BottomScreenWrapper>
          {/* Logout Button -- Just clears token client side for now */}
          <Button
            variant="plain"
            size="md"
            onPress={clear}
            endAdornment={<Icon name="LogoutCurve" />}
          >
            Logout
          </Button>
        </BottomScreenWrapper>
      </Page>
    </>
  );
}
