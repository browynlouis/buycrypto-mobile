import React from 'react';
import { View } from 'react-native';

import { useAuthStore } from '@/features/auth/store';
import { UserCenterScreen } from '@/features/user/screens';
import { Header } from '@/shared/components/header';
import { Page } from '@/shared/components/layouts/page';
import { Button } from '@/shared/components/ui/button';
import { Icon } from '@/shared/components/ui/icon';

export default function UserCenter() {
  const { clearTokens } = useAuthStore();

  return (
    <>
      <Header
        title="User Center"
        showBackButton
        rightElement={
          <Button variant="text">
            <Icon name="Setting" size="lg" />
          </Button>
        }
      />

      <Page>
        <UserCenterScreen />

        <View style={{ marginTop: 'auto', gap: 12 }}>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <Button
              size="md"
              variant="plain"
              style={{ flex: 1 }}
              endAdornment={<Icon name="MessageQuestion" />}
            >
              FAQs
            </Button>
            <Button
              size="md"
              variant="plain"
              style={{ flex: 1 }}
              endAdornment={<Icon name="Global" />}
            >
              About Us
            </Button>
          </View>
          <Button size="md" variant="plain" endAdornment={<Icon name="Headphone" />}>
            Help
          </Button>
        </View>
      </Page>
    </>
  );
}
