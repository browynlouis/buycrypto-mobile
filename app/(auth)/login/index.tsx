import { Link } from 'expo-router';
import React from 'react';

import { LoginScreen } from '@/components/features/auth/screens';
import { Page } from '@/components/shared/layouts/page';
import { Header } from '@/components/shared/ui/header';
import { Text } from '@/components/shared/ui/text';

export default function LoginPage() {
  return (
    <>
      {/* Page Header */}
      <Header
        showBackButton
        rightElement={
          <Link href={'/(auth)/registration'}>
            <Text align="center" color="link">
              Register
            </Text>
          </Link>
        }
      />

      {/* Page Body */}
      <Page>
        {/* Main Content */}
        <LoginScreen />
      </Page>
    </>
  );
}
