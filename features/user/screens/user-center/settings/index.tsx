import { View } from 'react-native';

import { ProfileHeader } from '@/features/user/components/profile-header';

export function SettingsScreen() {
  return (
    <View style={{ gap: 24 }}>
      <ProfileHeader />
    </View>
  );
}
