import { Link } from 'expo-router';
import React from 'react';

import { LoginScreen } from '@/features/auth/screens/login-screen';
import { Header } from '@/shared/components/header';
import { Page } from '@/shared/components/layouts/page';
import { Text } from '@/shared/components/ui/text';

export default function Login() {
  return (
    <>
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
      <Page>
        <LoginScreen />
      </Page>
    </>
  );
}
