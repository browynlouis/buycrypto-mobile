import React from 'react';
import { View } from 'react-native';

import { Header } from '@/shared/components/header';
import { Page } from '@/shared/components/layouts/page';
import { Button } from '@/shared/components/ui/button';
import { Icon } from '@/shared/components/ui/icon';

export default function UserCenter() {
  return (
    <>
      <Header
        showBackButton
        rightElement={
          <View style={{ flexDirection: 'row', gap: 24 }}>
            <Button variant="text">
              <Icon size={24} name="Setting" />
            </Button>
            <Button variant="text">
              <Icon size={24} name="Headphone" />
            </Button>
          </View>
        }
      />

      <Page></Page>
    </>
  );
}
