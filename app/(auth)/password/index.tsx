import { Link } from 'expo-router';
import React from 'react';

import { ForgotPasswordScreen } from '@/features/auth/screens/forgot-password';
import { Header } from '@/shared/components/header';
import { Page } from '@/shared/components/layouts/page';
import { Text } from '@/shared/components/ui/text';

export default function ForgotPassword() {
  return (
    <>
      <Header
        showBackButton
        rightElement={
          <Link href={'/(auth)/login'} replace>
            <Text align="center" color="link">
              Login
            </Text>
          </Link>
        }
      />
      <Page>
        <ForgotPasswordScreen />
      </Page>
    </>
  );
}
