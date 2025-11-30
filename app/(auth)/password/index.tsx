import { Link } from 'expo-router';
import React from 'react';

import { ForgotPasswordScreen } from '@/components/features/auth/screens';
import { Header } from '@/components/shared/header';
import { Page } from '@/components/shared/layouts/page';
import { Text } from '@/components/shared/ui/text';

export default function ForgotPassword() {
  return (
    <>
      {/* Page Header */}
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

      {/* Page Body */}
      <Page>
        {/* Main Content */}
        <ForgotPasswordScreen />
      </Page>
    </>
  );
}
