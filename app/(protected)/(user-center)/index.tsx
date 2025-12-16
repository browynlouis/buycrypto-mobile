import { Link } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { UserCenterScreen } from '@/components/features/user/screens';
import { Page } from '@/components/shared/layouts/page';
import { Button } from '@/components/shared/ui/button';
import { Header } from '@/components/shared/ui/header';
import { Icon } from '@/components/shared/ui/icon';

export default function UserCenterPage() {
  return (
    <>
      {/* Page Header */}
      <Header
        title="User Center"
        showBackButton
        rightElement={
          <Link href="/(protected)/(user-center)/settings" asChild>
            <Button variant="text">
              <Icon name="Setting" size="lg" />
            </Button>
          </Link>
        }
      />

      {/* Page Body */}
      <Page>
        {/* Main Content */}
        <UserCenterScreen />

        {/* Quick & Helper Links */}
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
