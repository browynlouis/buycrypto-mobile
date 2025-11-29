import { Link } from 'expo-router';
import React from 'react';

import { RegistrationScreen } from '@/features/auth/screens/registration';
import { Header } from '@/shared/components/header';
import { Page } from '@/shared/components/layouts/page';
import { Text } from '@/shared/components/ui/text';

export default function RegistrationCredentialsPage() {
  return (
    <>
      {/* Page Header */}
      <Header
        showBackButton
        rightElement={
          <Link href={'/(auth)/login'}>
            <Text align="center" color="link">
              Login
            </Text>
          </Link>
        }
      />

      {/* Page Body */}
      <Page>
        {/* Main Content */}
        <RegistrationScreen />
      </Page>
    </>
  );
}
