import { Link } from 'expo-router';
import React from 'react';

import { CredentialsFormScreen } from '@/features/auth/screens';
import { Header } from '@/shared/components/header';
import { Page } from '@/shared/components/layouts/page';
import { Text } from '@/shared/components/ui/text';

export default function RegistrationCredentialsPage() {
  return (
    <>
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
      <Page>
        <CredentialsFormScreen />
      </Page>
    </>
  );
}
