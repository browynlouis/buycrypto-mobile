import { Link } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { UserCenterScreen } from '@/features/user/screens/user-center';
import { Header } from '@/shared/components/header';
import { Page } from '@/shared/components/layouts/page';
import { Button } from '@/shared/components/ui/button';
import { Icon } from '@/shared/components/ui/icon';

export default function UserCenter() {
  return (
    <>
      <Header
        title="User Center"
        showBackButton
        rightElement={
          <Link href="/(protected)/(user-center)/settings">
            <Icon name="Setting" size="lg" />
          </Link>
        }
      />

      <Page>
        <UserCenterScreen />

        <View style={{ marginTop: 'auto', gap: 12 }}>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <Button
              size="sm"
              variant="plain"
              style={{ flex: 1 }}
              endAdornment={<Icon name="MessageQuestion" />}
            >
              FAQs
            </Button>
            <Button
              size="sm"
              variant="plain"
              style={{ flex: 1 }}
              endAdornment={<Icon name="Global" />}
            >
              About Us
            </Button>
          </View>
          <Button size="sm" variant="plain" endAdornment={<Icon name="Headphone" />}>
            Help
          </Button>
        </View>
      </Page>
    </>
  );
}
