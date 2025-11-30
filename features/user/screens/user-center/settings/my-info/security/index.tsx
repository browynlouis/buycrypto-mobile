import { Suspense } from '@suspensive/react';
import React from 'react';

import { getAuth } from '@/api/auth';
import { $api } from '@/libs/api';
import { Loader } from '@/shared/components/loader';
import { Col } from '@/shared/components/ui/flex';
import { Icon } from '@/shared/components/ui/icon';
import { MenuListItem } from '@/shared/components/ui/menu-list-item';
import { Text } from '@/shared/components/ui/text';

import { ToggleAuthenticatorApp } from './authenticator-app/toggle-authenticator-app';

const SecurityScreen = Suspense.with({ fallback: <Loader isLoading /> }, () => {
  const {
    data: { data: auth },
  } = $api.useSuspenseQuery(...getAuth);

  return (
    <Col gap={32}>
      <MenuListItem
        title="Email"
        data={{
          showArrow: false,
          rightEl: <Text>{auth.email}</Text>,
          leftEl: <Icon name="alternate-email" family="MaterialIcons" />,
        }}
      />

      <MenuListItem
        title="Change Password"
        data={{
          leftEl: <Icon name="Lock" />,
        }}
      />

      <MenuListItem
        title="Authenticator App"
        data={{
          showArrow: false,
          leftEl: <Icon name="Shield" />,
          rightEl: <ToggleAuthenticatorApp />,
        }}
      />
    </Col>
  );
});

export { SecurityScreen };
