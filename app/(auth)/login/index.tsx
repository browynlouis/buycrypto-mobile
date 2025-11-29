import { Link } from 'expo-router';
import React from 'react';

import { LoginScreen } from '@/features/auth/screens/login';
import { Header } from '@/shared/components/header';
import { Page } from '@/shared/components/layouts/page';
import { Text } from '@/shared/components/ui/text';

export default function Login() {
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
