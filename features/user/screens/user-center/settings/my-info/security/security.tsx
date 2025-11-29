import { Suspense } from '@suspensive/react';
import React from 'react';

import { getAuth } from '@/features/auth/api';
import { $api } from '@/libs/api';
import { Loader } from '@/shared/components/loader';
import { Col } from '@/shared/components/ui/flex';
import { Icon } from '@/shared/components/ui/icon';
import { MenuListItem } from '@/shared/components/ui/menu-list-item';
import { Text } from '@/shared/components/ui/text';

const SecurityScreen = Suspense.with({ fallback: <Loader isLoading /> }, () => {
  const {
    data: { data: auth },
  } = $api.useSuspenseQuery(...getAuth);

  return (
    <Col gap={32}>
      <MenuListItem
        title="Email"
        data={{
          leftEl: <Icon name="alternate-email" family="MaterialIcons" />,
          rightEl: <Text>{auth.email}</Text>,
        }}
      />

      <MenuListItem
        title="Mobile"
        data={{
          leftEl: <Icon name="Mobile" />,
          rightEl: <Text>{}</Text>,
        }}
      />

      <MenuListItem
        title="Change Password"
        data={{
          leftEl: <Icon name="Lock" />,
        }}
      />

      <MenuListItem
        title="2-Factor Authentication"
        data={{
          leftEl: <Icon name="Shield" />,
        }}
      />
    </Col>
  );
});

export { SecurityScreen };
