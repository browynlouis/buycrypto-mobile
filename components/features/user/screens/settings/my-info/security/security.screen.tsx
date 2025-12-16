import { useRouter } from 'expo-router';
import React from 'react';

import { Col } from '@/components/shared/ui/flex';
import { Icon } from '@/components/shared/ui/icon';
import { MenuListItem } from '@/components/shared/ui/menu-list-item';
import { Text } from '@/components/shared/ui/text';
import { useAuth } from '@/hooks';

import { ToggleAuthenticatorApp } from './_partials/authenticator-app/toggle-auth-app';

const SecurityScreen = () => {
  const auth = useAuth();

  const router = useRouter();

  return (
    <Col gap={32}>
      <MenuListItem
        title="Email"
        data={{
          showArrow: false,
          rightEl: (
            <Text size="text-sm" style={{ opacity: 0.5 }}>
              {auth.email}
            </Text>
          ),
          leftEl: <Icon size={'sm'} name="alternate-email" family="MaterialIcons" />,
        }}
      />

      <MenuListItem
        title="Change Password"
        data={{
          leftEl: <Icon size={'sm'} name="Lock" />,
          action(e) {
            router.push('/(protected)/(user-center)/settings/my-info/security/password');
          },
        }}
      />

      <MenuListItem
        title="Authenticator App"
        data={{
          showArrow: false,
          leftEl: <Icon size={'sm'} name="Shield" />,
          rightEl: <ToggleAuthenticatorApp />,
        }}
      />
    </Col>
  );
};

export { SecurityScreen };
