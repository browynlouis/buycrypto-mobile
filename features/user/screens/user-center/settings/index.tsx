import { Suspense } from '@suspensive/react';
import { router } from 'expo-router';
import { snakeCase } from 'lodash';
import { useMemo } from 'react';
import { ScrollView, View } from 'react-native';

import { getMe } from '@/features/user/api';
import { ProfileHeader } from '@/features/user/components/profile-header';
import { $api } from '@/libs/api';
import { Loader } from '@/shared/components/loader';
import { Badge } from '@/shared/components/ui/bagde';
import { Icon } from '@/shared/components/ui/icon';
import { MenuList, MenuListItem } from '@/shared/components/ui/menu-list-item';
import { TabbedView } from '@/shared/components/ui/tabbed-view';
import { Text } from '@/shared/components/ui/text';

const SettingsScreen = Suspense.with({ fallback: <Loader isLoading /> }, () => {
  const {
    data: { data: user },
  } = $api.useSuspenseQuery(...getMe);

  const menuList: MenuList[] = useMemo(
    () => [
      {
        title: 'My Info',
        data: [
          {
            title: 'Username',
            data: {
              leftEl: <Icon name="UserEdit" />,
              rightEl: <Text size="text-sm">{user.username ?? '--'}</Text>,
              action: () => router.push('/(protected)/(user-center)/settings/my-info/username'),
            },
          },
          {
            title: 'Identity Verification',
            data: {
              action() {},
              leftEl: <Icon name="Personalcard" />,
              rightEl: <Badge status={user.kycLevel !== 'Not Verified'}>{user.kycLevel}</Badge>,
            },
          },
          {
            title: 'Security',
            data: {
              leftEl: <Icon name="Key" />,
              action: () => router.push('/(protected)/(user-center)/settings/my-info/security'),
            },
          },
        ],
      },
      {
        title: 'Preferences',
        data: [
          {
            title: 'Appearance',
            data: {
              leftEl: <Icon family="MaterialCommunityIcons" name="theme-light-dark" />,
              action: () =>
                router.push('/(protected)/(user-center)/settings/preferences/appearance'),
            },
          },
        ],
      },
    ],
    [user],
  );

  const toKey = (title: string) => snakeCase(title.toLowerCase());
  const routes = useMemo(
    () => menuList.map((section) => ({ title: section.title, key: toKey(section.title) })),
    [menuList],
  );

  const renderScene = useMemo(
    () =>
      ({ route }: { route: { key: string } }) => {
        const section = menuList.find((s) => toKey(s.title) === route.key);

        if (!section) return null;

        return (
          <ScrollView contentContainerStyle={{ paddingVertical: 16, gap: 32 }}>
            {section.data.map((item) => (
              <MenuListItem data={item.data} title={item.title} key={toKey(item.title)} />
            ))}
          </ScrollView>
        );
      },
    [menuList],
  );

  return (
    <View style={{ gap: 24, flex: 1 }}>
      <ProfileHeader user={user} />

      {/* Tabbed view of settings section */}
      <TabbedView
        lazy={false}
        stickyHeader
        showUnderline
        routes={routes}
        renderScene={renderScene}
      />
    </View>
  );
});

SettingsScreen.displayName = 'SettingsScreen';

export { SettingsScreen };
