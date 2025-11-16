import React from 'react';
import { View } from 'react-native';

import { Header } from '@/components/header';
import { Page } from '@/components/layouts/page';
import { AuthHeader } from '@/components/partials/auth/auth-title';
import { Button } from '@/components/ui/button/button';
import { Icon } from '@/components/ui/icon';
import { Input, InputGroup } from '@/components/ui/input/input';

export default function Login() {
  return (
    <>
      <Header showBackButton />
      <Page>
        <View style={{ gap: 32 }}>
          <AuthHeader title="Hi, Welcome!" subText="Please login to your account" />

          <View style={{ gap: 24 }}>
            <InputGroup>
              <Input placeholder="Email" startAdornment={<Icon name="User" />} />
            </InputGroup>

            <InputGroup>
              <Input hiddenField placeholder="Password" startAdornment={<Icon name="Lock" />} />
            </InputGroup>
          </View>

          <Button size="md">Proceed</Button>
        </View>
      </Page>
    </>
  );
}
